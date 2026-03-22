package backend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Database {
    // Control local SQLite via USE_SQLITE environment variable (default: false for Railway production)
    private static final boolean USE_SQLITE = "true".equals(getEnvOrDefault("USE_SQLITE", "false"));

    private static String getEnvOrDefault(String key, String def) {
        String val = System.getenv(key);
        return (val != null && !val.trim().isEmpty()) ? val : def;
    }

    // Dynamic MySQL connection settings mapped to Railway Native Variables
    private static final String MYSQL_HOST = getEnvOrDefault("MYSQLHOST", "localhost");
    private static final String MYSQL_PORT = getEnvOrDefault("MYSQLPORT", "3306");
    private static final String MYSQL_DB   = getEnvOrDefault("MYSQLDATABASE", "nutriglow");
    private static final String MYSQL_USER = getEnvOrDefault("MYSQLUSER", "root");
    private static final String MYSQL_PASS = getEnvOrDefault("MYSQLPASSWORD", "");

    // SQLite connection setting
    private static final String SQLITE_URL = "jdbc:sqlite:nutriglow.db";

    public static Connection getConnection() throws SQLException {
        if (USE_SQLITE) {
            return DriverManager.getConnection(SQLITE_URL);
        } else {
            String url = "jdbc:mysql://" + MYSQL_HOST + ":" + MYSQL_PORT + "/" + MYSQL_DB;
            return DriverManager.getConnection(url, MYSQL_USER, MYSQL_PASS);
        }
    }

    public static void initDatabase() {
        try (Connection conn = getConnection()) {
            String sql;
            if (USE_SQLITE) {
                sql = "CREATE TABLE IF NOT EXISTS users ("
                        + "id INTEGER PRIMARY KEY AUTOINCREMENT,"
                        + "name TEXT NOT NULL,"
                        + "email TEXT NOT NULL UNIQUE,"
                        + "password TEXT NOT NULL,"
                        + "joined TEXT NOT NULL);";
            } else {
                sql = "CREATE TABLE IF NOT EXISTS users ("
                        + "id INT AUTO_INCREMENT PRIMARY KEY,"
                        + "name VARCHAR(255) NOT NULL,"
                        + "email VARCHAR(255) NOT NULL UNIQUE,"
                        + "password VARCHAR(255) NOT NULL,"
                        + "joined DATE NOT NULL);";
            }
            conn.createStatement().execute(sql);
            System.out.println(USE_SQLITE ? "SQLite database initialized." : "MySQL database initialized successfully.");
        } catch (SQLException e) {
            System.out.println("Error initializing DB: " + e.getMessage());
        }
    }

    public static User register(String name, String email, String pass) {
        String insertSql = "INSERT INTO users (name, email, password, joined) VALUES (?, ?, ?, ?)";
        String joined = new SimpleDateFormat("MM/dd/yyyy").format(new Date());

        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(insertSql, PreparedStatement.RETURN_GENERATED_KEYS)) {
            
            pstmt.setString(1, name);
            pstmt.setString(2, email);
            pstmt.setString(3, pass);
            pstmt.setString(4, joined);
            pstmt.executeUpdate();

            try (ResultSet rs = pstmt.getGeneratedKeys()) {
                if (rs.next()) {
                    long id = rs.getLong(1);
                    return new User(id, name, email, pass, joined);
                }
            }
        } catch (SQLException e) {
            System.err.println("Registration error: " + e.getMessage());
        }
        return null; // returning null if failed (e.g. duplicate email)
    }

    public static User login(String email, String pass) {
        String sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, email);
            pstmt.setString(2, pass);

            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return new User(
                        rs.getLong("id"),
                        rs.getString("name"),
                        rs.getString("email"),
                        rs.getString("password"),
                        rs.getString("joined")
                    );
                }
            }
        } catch (SQLException e) {
            System.err.println("Login error: " + e.getMessage());
        }
        return null;
    }

    public static java.util.List<User> getAllUsers() {
        java.util.List<User> list = new java.util.ArrayList<>();
        String sql = "SELECT * FROM users ORDER BY id DESC";
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                list.add(new User(
                    rs.getLong("id"),
                    rs.getString("name"),
                    rs.getString("email"),
                    rs.getString("password"),
                    rs.getString("joined")
                ));
            }
        } catch (SQLException e) {
            System.err.println("getAllUsers error: " + e.getMessage());
        }
        return list;
    }
}
