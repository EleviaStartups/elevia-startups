Add-Type -AssemblyName System.Drawing
$imgPath = Resolve-Path "imagenes\logogps.jfif"
$src = [System.Drawing.Image]::FromFile($imgPath)
$pngPath = Join-Path (Resolve-Path "imagenes") "logogps.png"
$jpgPath = Join-Path (Resolve-Path "imagenes") "logogps.jpg"
$src.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)
$src.Save($jpgPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$src.Dispose()
Write-Host "Converted successfully:"
Get-ChildItem imagenes
