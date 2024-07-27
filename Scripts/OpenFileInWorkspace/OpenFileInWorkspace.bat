@echo off
chcp 65001 >nul

set dir=%~dp1

cd /d %dir%
for /f "delims=" %%i in ('git rev-parse --show-toplevel 2^>nul') do (
    set dir=%%i
)

"%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe" -n "%dir%" -g %1
