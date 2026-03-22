@echo off
set USE_SQLITE=true
echo Compiling Java Backend...
mkdir out 2>nul
javac -cp "lib/*" -d out src/backend/*.java
if %ERRORLEVEL% NEQ 0 (
    echo Compilation failed!
    pause
    exit /b %ERRORLEVEL%
)

echo Starting Server...
java -cp "out;lib/*" backend.Server
pause
