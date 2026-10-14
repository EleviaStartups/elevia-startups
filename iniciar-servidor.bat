@echo off
title Elevia Startups - Servidor Local
echo ========================================================
echo  Iniciando servidor local para Elevia Startups...
echo ========================================================
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0serve.ps1"
pause
