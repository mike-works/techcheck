:: ######################
:: # Node.js version checking
:: # (c) 2018 Mike Works, Inc.
 
@ECHO OFF
SET DEBUG_SHELL=true
setlocal enabledelayedexpansion
IF NOT DEFINED TECHCHECK_NODE_CMD (
   SET TECHCHECK_NODE_CMD="node"
)
IF NOT DEFINED TECHCHECK_NODE_VERSION_ARG (
   SET TECHCHECK_NODE_VERSION_ARG=--version
)
IF NOT DEFINED TECHCHECK_TMP_FOLDER (
   SET TECHCHECK_TMP_FOLDER=tmp
)

CALL :assert_node_version
Goto :EOF

:log
IF DEFINED DEBUG_SHELL ( ECHO %* )
EXIT /B 0

:node_path_notfound
ECHO [techcheck]  ERROR: No node.js found on this system!
ECHO                Go to https://nodejs.org and follow installation instructions
EXIT /B 1 :: error  

:node_version_notfound
ECHO [techcheck]  ERROR: Node.js version could not be detected
ECHO                Node.js Path --> %1
ECHO                Ensure you can run '%1 --version' and get a reasonable result (i.e., 'v1.2.3')
ECHO                If this problem persists, please uninstall and reinstall node.js
ECHO                Go to https://nodejs.org and follow installation instructions
EXIT /B 1 :: error  


:assert_node_version
:: Get the node path
FOR /F "tokens=* USEBACKQ" %%F IN (`where "%TECHCHECK_NODE_CMD%"`) DO (
    SET NODE_PATH=%%F
)

IF NOT DEFINED NODE_PATH GOTO :node_path_notfound
IF "%NODE_PATH%"=="" GOTO :node_path_notfound

call :log [techcheck] Node path found: %NODE_PATH%
FOR /F "tokens=* USEBACKQ" %%F IN (`"%NODE_PATH%" %TECHCHECK_NODE_VERSION_ARG%`) DO (
    SET NODE_VERSION=%%F
)

IF NOT DEFINED NODE_VERSION ( CALL :node_version_notfound "%NODE_PATH%" )
IF "%NODE_VERSION%"=="" ( CALL :node_version_notfound "%NODE_PATH%" )

call :log [techcheck] Node %NODE_VERSION% found at %NODE_PATH%
ECHO [techcheck] Downloading main techcheck scripts
powershell -Command "(New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/mike-works/workshops/master/packages/techcheck/dist/index.js?v=%RANDOM%%RANDOM%', '%TECHCHECK_TMP_FOLDER%/index.js')"
ECHO [techcheck] Download complete. Running main techcheck scripts...
"%NODE_PATH%" %TECHCHECK_TMP_FOLDER%/index.js
EXIT /B 0