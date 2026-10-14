$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$pdfPath = 'C:\Users\34717\.gemini\antigravity\brain\7c28b24b-d3c7-4e2d-855b-3cac02b0da10\scratch\informe_startup_test.pdf'
$uri = 'file:///C:/Users/34717/.gemini/antigravity/scratch/elevia-startups/pages/startup-report.html#demo'

Remove-Item $pdfPath -ErrorAction SilentlyContinue
$arg = "--print-to-pdf=$pdfPath"
$p = Start-Process $edge -ArgumentList "--headless=new","--disable-gpu","--virtual-time-budget=6000",$arg,$uri -PassThru
$p.WaitForExit(30000)
Test-Path $pdfPath
