# NutriGlow Java Backend

This is the Java backend for the NutriGlow login system. It uses `HttpServer` to provide REST APIs (`/api/login` and `/api/register`) and connects to a MySQL database.

## Prerequisites
1. **Java JDK 11+** installed and added to your systemic PATH.
2. **MySQL Server** installed and running on `localhost:3306` with the `root` user and no password (or adjust `Database.java` to match your credentials).

## Setup
1. Open your MySQL client (like phpMyAdmin or MySQL Workbench) and run the `schema.sql` script to create the database and `users` table.
2. Run `download_jars.bat`. This will create a `lib` folder and download:
   - `gson-2.10.1.jar`
   - `mysql-connector-j-8.0.33.jar`
   - `sqlite-jdbc-3.41.2.1.jar`

## Running the Server
1. Double-click `run.bat` (or run it from the command line).
2. It will compile the `.java` files into an `out` directory and start the server on `http://localhost:8080`.

## Important Notes
- The frontend `app.js` has already been updated to point its `fetch` requests (`doLogin()` and `doRegister()`) to `http://localhost:8080`.
- If you prefer to use **SQLite** instead of MySQL, open `src/backend/Database.java` and change `private static final boolean USE_SQLITE = false;` to `true`.
