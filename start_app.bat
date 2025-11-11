@echo off
:: Backend starten in een apart venster
start cmd /k "cd /d C:\Users\ramon\Documents\Applicatie Ontwikkeling\Mijn Projecten\Console collection app\backend && node server.js"

:: Frontend starten in een apart venster
start cmd /k "cd /d C:\Users\ramon\Documents\Applicatie Ontwikkeling\Mijn Projecten\Console collection app\frontend && npm run dev"

:: Wacht 5 seconden zodat frontend kan opstarten
timeout /t 1 >nul
start http://localhost:5173/

exit
