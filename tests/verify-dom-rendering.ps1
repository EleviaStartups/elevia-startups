$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$baseDir = "C:\Users\34717\.gemini\antigravity\scratch\elevia-startups"

$pages = @(
    "index.html",
    "pages\tools.html",
    "pages\investor-deck.html",
    "pages\deck-review.html",
    "pages\about.html",
    "pages\privacy.html",
    "pages\legal.html",
    "pages\tools\tam-sam-som.html",
    "pages\tools\okr-builder.html",
    "pages\tools\icp-creator.html",
    "pages\tools\startup-valuation.html",
    "pages\tools\dilution-calculator.html",
    "pages\tools\cac-ltv.html",
    "pages\tools\burn-rate.html",
    "tests\index.html"
)

Write-Host "Verifying DOM render for all 15 pages via headless Edge..."
$failed = 0

foreach ($p in $pages) {
    $fullPath = Join-Path $baseDir $p
    $uri = "file:///" + ($fullPath -replace '\\', '/')
    
    $proc = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--dump-dom", "$uri" -PassThru -NoNewWindow -RedirectStandardOutput "$baseDir\tests\temp_dom.txt" -RedirectStandardError "$baseDir\tests\temp_err.txt"
    $finished = $proc.WaitForExit(7000)
    
    if (-not $finished) {
        $proc.Kill()
        Write-Host "  [TIMEOUT] $p took > 7s" -ForegroundColor Red
        $failed++
        continue
    }
    
    $len = (Get-Item "$baseDir\tests\temp_dom.txt").Length
    if ($len -gt 500) {
        Write-Host "  [PASS] $p rendered ($len bytes)" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $p rendered only $len bytes" -ForegroundColor Red
        $failed++
    }
}

Remove-Item "$baseDir\tests\temp_dom.txt" -ErrorAction SilentlyContinue
Remove-Item "$baseDir\tests\temp_err.txt" -ErrorAction SilentlyContinue

if ($failed -eq 0) {
    Write-Host "ALL 15 PAGES RENDERED SUCCESSFULLY IN EDGE HEADLESS!" -ForegroundColor Green
} else {
    Write-Host "$failed pages had render issues." -ForegroundColor Red
}
