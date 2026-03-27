@echo off
setlocal

:: Get the directory of the batch script
set "APP_DIR=%~dp0"
set "INDEX_FILE=%APP_DIR%index.html"

:: Replace backslashes with forward slashes for the URL
set "URL_FILE=file:///%INDEX_FILE:\=/%"

:: Check if Chrome exists (common paths)
set "CHROME_PATH="
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe"
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
) else if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=%LocalAppData%\Google\Chrome\Application\chrome.exe"
)

:: Launch Chrome in App mode if found, otherwise open in default browser
if defined CHROME_PATH (
    start "" "%CHROME_PATH%" --app="%URL_FILE%" --window-size=1200,900
) else (
    start "" "%URL_FILE%"
)

endlocal
exit
