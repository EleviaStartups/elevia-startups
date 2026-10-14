@echo off
chcp 65001 >nul
title Subir Elevia Startups a GitHub
echo ========================================================
echo   Subiendo Elevia Startups a GitHub...
echo ========================================================
echo.
echo Conectando con https://github.com/EleviaStartups/elevia-startups ...
echo (Si se abre una ventana en tu navegador o pantalla, pulsa en autorizar tu cuenta de GitHub)
echo.
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ========================================================
    echo   ¡Subida completada con éxito!
    echo   Repositorio: https://github.com/EleviaStartups/elevia-startups
    echo ========================================================
) else (
    echo ========================================================
    echo   [AVISO] Si te ha pedido iniciar sesión, completa el acceso
    echo   en el navegador y vuelve a hacer doble clic en este archivo.
    echo ========================================================
)
echo.
pause
