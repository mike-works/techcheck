:: ######################
:: # Node.js version checking
:: # (c) 2018 Mike Works, Inc.
 
@ECHO OFF

ECHO ------------------------------------------------------------
ECHO Starting setup checks. This may take a moment...
CALL :assert_node_version

:log
IF DEFINED DEBUG_SHELL ( ECHO %* )
EXIT /B 0

:node_path_notfound
ECHO [techcheck]  ERROR: No node.js found on this system!
ECHO                Go to https://nodejs.org and follow installation instructions
EXIT /B 1 :: error  

:node_version_notfound
ECHO [techcheck]  ERROR: Node.js version could not be determined!
ECHO                Ensure you can run "node --version" and get a reasonable result (like "v4.5.6")
EXIT /B 1 :: error  


:assert_node_version
:: Get the node path
FOR /F "tokens=* USEBACKQ" %%F IN (`where node`) DO (
    SET NODE_PATH=%%F
)
:: If the node path is not defined
IF NOT DEFINED NODE_PATH GOTO :node_path_notfound
:: OR if the node path, when stringified, evaluates to an empty string
IF "%NODE_PATH%"=="" GOTO :node_path_notfound :: invoke the node_path_notfound function

call :log "[node_version] ℹ️ Node path found: %NODE_PATH%"
FOR /F "tokens=* USEBACKQ" %%F IN (`"%NODE_PATH%" --version`) DO (
    SET NODE_VERSION=%%F
)
:: If the node version is not defined
IF NOT DEFINED NODE_VERSION GOTO :node_version_notfound
:: OR if the node path, when stringified, evaluates to an empty string
IF "%NODE_VERSION%"=="" GOTO :node_version_notfound :: invoke the node_path_notfound function


call :log "[node_version] ℹ️ Node %NODE_VERSION% found at %NODE_PATH"
powershell -Command "(New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/mike-works/workshops/master/packages/techcheck/dist/index.js?v=%RANDOM%%RANDOM%', 'techcheck.js')"
"%NODE_PATH%" techcheck.js
EXIT /B 0