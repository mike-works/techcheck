@echo off
rmdir /S /Q tmp
mkdir tmp
SETLOCAL

set ERRORS=false
:: Test 1
call bootstrap\bootstrap.bat > tmp\test_output_normal.txt
call :assert_in_output tmp\test_output_normal.txt "node_on_system_normal" "main"
call :assert_in_output tmp\test_output_normal.txt "node_on_system_normal" "complete."


::SETLOCAL
::call bootstrap\bootstrap.bat > tmp\test_output_debug.txt
::call :assert_in_output tmp\test_output_debug.txt "node_on_system_debug" "Node path found"
::call :assert_in_output tmp\test_output_debug.txt "node_on_system_debug" "found at"
::call :assert_in_output tmp\test_output_debug.txt "node_on_system_debug" "Downloading main techcheck scripts"
::call :assert_in_output tmp\test_output_debug.txt "node_on_system_debug" "Download complete."
::ENDLOCAL


::findstr /C:"found at" tmp\test_output.txt
::IF ERRORLEVEL 1 (
::    set MESSAGE=Could not find string in command output
::    goto :fail
::)
::findstr /C:"Downloading main techcheck scripts" tmp\test_output.txt
::IF ERRORLEVEL 1 (
::    set MESSAGE=Could not find string in command output
::    goto :fail
::)
::findstr /C:"Download complete." tmp\test_output.txt
::IF ERRORLEVEL 1 (
::    set MESSAGE=Could not find string in command output
::    goto :fail
::)
ENDLOCAL
IF ERRORS==false (EXIT /B 0)
EXIT /B 1


:assert_in_output
findstr /C:%3 %1
IF ERRORLEVEL 1 (
    set MESSAGE="[%2] Could not find string %3 in command output %1"
    goto :fail
)
exit /B 0

:fail
echo ERROR: %MESSAGE%
set ERRORS=true
exit /B 0
