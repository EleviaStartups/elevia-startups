Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap 32, 32
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$brushBg = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#202A36'))
$g.FillEllipse($brushBg, 1, 1, 30, 30)
$penSage = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml('#B9D8C2')), 3
$g.DrawLine($penSage, 16, 7, 24, 23)
$g.DrawLine($penSage, 24, 23, 8, 23)
$g.DrawLine($penSage, 8, 23, 16, 7)
$brushPeach = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#F0C6A8'))
$g.FillEllipse($brushPeach, 13, 15, 6, 6)
$g.Dispose()

$iconHandle = $bmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($iconHandle)
$fs = New-Object System.IO.FileStream 'C:\Users\34717\.gemini\antigravity\scratch\elevia-startups\favicon.ico', ([System.IO.FileMode]::Create)
$icon.Save($fs)
$fs.Close()
$bmp.Dispose()
Write-Host "favicon.ico successfully generated!"
