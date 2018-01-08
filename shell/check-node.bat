:: ######################
:: # Node.js version checking
:: # (c) 2018 Mike Works, Inc.
 
@ECHO OFF
SETLOCAL
SET TECHCHECK_MIN_NODE_VERSION="4.5.0"

CALL :assert_node_version

:log
IF DEFINED DEBUG_SHELL ( ECHO %* )
EXIT /B 0

:notfound
ECHO [techcheck]  ERROR: No node.js found on this system!
ECHO                Go to https://nodejs.org and follow installation instructions
EXIT /B 1 :: error  


:assert_node_version
:: Get the node path
FOR /F "tokens=* USEBACKQ" %%F IN (`where node`) DO (
    SET NODE_PATH=%%F
)

IF NOT DEFINED NODE_PATH GOTO :notfound
IF "%NODE_PATH%"=="" GOTO :notfound


call :log "[node_version] ℹ️ Node path found: %NODE_PATH%"
FOR /F "tokens=* USEBACKQ" %%F IN (`"%NODE_PATH%" --version`) DO (
    SET NODE_VERSION=%%F
)

call :log "[node_version] ℹ️ Node path found: %NODE_VERSION%"
powershell -Command "(New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/mike-works/workshops/master/packages/techcheck/dist/index.js?v=%RANDOM%%RANDOM%', 'techcheck.js')"
"%NODE_PATH%" techcheck.js
EXIT /B 0