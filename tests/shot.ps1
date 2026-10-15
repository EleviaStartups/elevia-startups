param([string]$Page = "index.html", [string]$Out = "shot.png", [int]$W = 1280, [int]$H = 2400)
$root = "C:\Users\34717\.gemini\antigravity\scratch\elevia-startups"
$outPath = "C:\Users\34717\.gemini\antigravity\brain\7c28b24b-d3c7-4e2d-855b-3cac02b0da10\scratch\$Out"
Remove-Item $outPath -ErrorAction SilentlyContinue
$uri = "file:///" + ((Join-Path $root $Page) -replace '\\','/')
$p = Start-Process "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -ArgumentList "--headless=new","--disable-gpu","--hide-scrollbars","--window-size=$W,$H","--virtual-time-budget=5000","--screenshot=$outPath",$uri -PassThru
if (-not $p.WaitForExit(40000)) { $p.Kill(); "killed" }
Test-Path $outPath
