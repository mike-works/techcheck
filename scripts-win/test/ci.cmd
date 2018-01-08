@ECHO OFF
ECHO "Testing windows bootstrap scripts"
call test/windows.bat
IF "%ERRORLEVEL%"=="1" (
    ECHO "Errors detected in bootstrap scripts"
    exit \B 1
)
npm run lint:ts
IF "%ERRORLEVEL%"=="1" (
    ECHO "Errors detected in TSLint"
    exit \B 1
)
node_modules/.bin/mocha -o test/mocha.opts