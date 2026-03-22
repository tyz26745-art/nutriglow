@echo off
echo Downloading required JAR files...
mkdir lib 2>nul
curl -L -o lib\gson-2.10.1.jar "https://repo1.maven.org/maven2/com/google/code/gson/gson/2.10.1/gson-2.10.1.jar"
curl -L -o lib\mysql-connector-j-8.0.33.jar "https://repo1.maven.org/maven2/com/mysql/mysql-connector-j/8.0.33/mysql-connector-j-8.0.33.jar"
curl -L -o lib\sqlite-jdbc-3.41.2.1.jar "https://repo1.maven.org/maven2/org/xerial/sqlite-jdbc/3.41.2.1/sqlite-jdbc-3.41.2.1.jar"
echo Done downloading JARs.
