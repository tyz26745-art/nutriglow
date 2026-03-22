FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copy source code
COPY src/ src/

# Download libraries
RUN mkdir lib && \
    wget -q -O lib/gson.jar https://repo1.maven.org/maven2/com/google/code/gson/gson/2.10.1/gson-2.10.1.jar && \
    wget -q -O lib/mysql-connector.jar https://repo1.maven.org/maven2/com/mysql/mysql-connector-j/8.0.33/mysql-connector-j-8.0.33.jar && \
    wget -q -O lib/sqlite-jdbc.jar https://repo1.maven.org/maven2/org/xerial/sqlite-jdbc/3.41.2.1/sqlite-jdbc-3.41.2.1.jar

# Compile code
RUN mkdir out && javac -cp "lib/*" -d out src/backend/*.java

# Lightweight JRE image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy compiled classes and libraries
COPY --from=build /app/lib/ lib/
COPY --from=build /app/out/ out/

# Expose dynamic PORT for Railway
EXPOSE $PORT

# Start the server (uses ':' for linux classpath vs ';' for Windows)
CMD ["java", "-cp", "out:lib/*", "backend.Server"]
