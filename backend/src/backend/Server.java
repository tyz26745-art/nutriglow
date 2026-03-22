package backend;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class Server {
    private static final Gson gson = new Gson();

    public static void main(String[] args) throws IOException {
        // Initialize SQLite if selected, otherwise assumes MySQL is already running with the schema
        Database.initDatabase();

        String portEnv = System.getenv("PORT");
        int port = (portEnv != null && !portEnv.trim().isEmpty()) ? Integer.parseInt(portEnv) : 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        
        server.createContext("/api/register", new RegisterHandler());
        server.createContext("/api/login", new LoginHandler());
        server.createContext("/api/users", new UsersHandler());
        server.createContext("/api/", new CorsHandler());
        
        // Serve static files from the parent directory (nutriglow root)
        server.createContext("/", new StaticFileHandler());

        server.setExecutor(null);
        server.start();
        System.out.println("Java Backend Server is listening on port " + port);
        System.out.println("Open your web browser and go to: http://localhost:" + port + "/");
    }

    private static void sendResponse(HttpExchange exchange, int statusCode, Object responseObj) throws IOException {
        addCorsHeaders(exchange);
        String response = gson.toJson(responseObj);
        byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    private static void sendError(HttpExchange exchange, int statusCode, String message) throws IOException {
        Map<String, String> err = new HashMap<>();
        err.put("error", message);
        sendResponse(exchange, statusCode, err);
    }

    private static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
    }

    static class CorsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        }
    }

    static class RegisterHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                new CorsHandler().handle(exchange);
                return;
            }

            if (!"POST".equals(exchange.getRequestMethod())) {
                sendError(exchange, 405, "Method Not Allowed");
                return;
            }

            try (InputStream is = exchange.getRequestBody()) {
                String body = new String(is.readAllBytes(), StandardCharsets.UTF_8);
                Map<String, String> req = gson.fromJson(body, Map.class);
                
                String name = req.get("name");
                String email = req.get("email");
                String pass = req.get("pass");

                if (name == null || email == null || pass == null) {
                    sendError(exchange, 400, "Missing fields");
                    return;
                }

                User user = Database.register(name, email, pass);
                if (user != null) {
                    sendResponse(exchange, 200, user);
                } else {
                    sendError(exchange, 400, "Email already registered or database error");
                }
            } catch(Exception e) {
                e.printStackTrace();
                sendError(exchange, 500, "Internal Server Error");
            }
        }
    }

    static class LoginHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                new CorsHandler().handle(exchange);
                return;
            }

            if (!"POST".equals(exchange.getRequestMethod())) {
                sendError(exchange, 405, "Method Not Allowed");
                return;
            }

            try (InputStream is = exchange.getRequestBody()) {
                String body = new String(is.readAllBytes(), StandardCharsets.UTF_8);
                Map<String, String> req = gson.fromJson(body, Map.class);
                
                String email = req.get("email");
                String pass = req.get("pass");

                if (email == null || pass == null) {
                    sendError(exchange, 400, "Missing credentials");
                    return;
                }

                User user = Database.login(email, pass);
                if (user != null) {
                    sendResponse(exchange, 200, user);
                } else {
                    sendError(exchange, 401, "Incorrect email or password");
                }
            } catch(Exception e) {
                e.printStackTrace();
                sendError(exchange, 500, "Internal Server Error");
            }
        }
    }

    static class UsersHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                new CorsHandler().handle(exchange);
                return;
            }
            if (!"GET".equals(exchange.getRequestMethod())) {
                sendError(exchange, 405, "Method Not Allowed");
                return;
            }
            try {
                java.util.List<User> users = Database.getAllUsers();
                sendResponse(exchange, 200, users);
            } catch(Exception e) {
                e.printStackTrace();
                sendError(exchange, 500, "Internal Server Error");
            }
        }
    }

    static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            if ("/".equals(path)) {
                path = "index.html"; // default page
            } else if (path.startsWith("/")) {
                path = path.substring(1);
            }
            
            // Resolve file in the parent directory of backend (which is the nutriglow root)
            java.io.File root = new java.io.File(".."); 
            java.io.File file = new java.io.File(root, path).getCanonicalFile();
            
            if (!file.getPath().startsWith(root.getCanonicalPath())) {
                // Path traversal attack prevention
                exchange.sendResponseHeaders(403, -1);
                return;
            }

            if (!file.isFile()) {
                exchange.sendResponseHeaders(404, -1);
                return;
            }

            String contentType = "text/plain";
            if (path.endsWith(".html")) contentType = "text/html";
            else if (path.endsWith(".css")) contentType = "text/css";
            else if (path.endsWith(".js")) contentType = "application/javascript";
            else if (path.endsWith(".png")) contentType = "image/png";
            else if (path.endsWith(".jpg") || path.endsWith(".jpeg")) contentType = "image/jpeg";

            exchange.getResponseHeaders().set("Content-Type", contentType);
            exchange.sendResponseHeaders(200, file.length());
            
            try (OutputStream os = exchange.getResponseBody();
                 InputStream fs = new java.io.FileInputStream(file)) {
                final byte[] buffer = new byte[0x10000];
                int count;
                while ((count = fs.read(buffer)) >= 0) {
                    os.write(buffer, 0, count);
                }
            }
        }
    }
}
