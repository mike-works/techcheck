@ECHO OFF
ECHO "Testing windows bootstrap scripts"
test/windows.bat
IF "%ERRORLEVEL%"=="1" (
    ECHO "Errors detected in bootstrap scripts"
    exit \B 1
)
node_modules/.bin/mocha -o test/mocha.opts