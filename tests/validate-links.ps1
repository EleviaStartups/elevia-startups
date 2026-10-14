$baseDir = "C:\Users\34717\.gemini\antigravity\scratch\elevia-startups"
$errors = @()
$checkedLinks = 0

Get-ChildItem -Path $baseDir -Filter "*.html" -Recurse | ForEach-Object {
    $file = $_
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # Check all <a href="...">
    $hrefPattern = 'href=[\x22\x27]([^\x22\x27#][^\x22\x27]*)[\x22\x27]'
    $matches = [regex]::Matches($content, $hrefPattern)
    foreach ($m in $matches) {
        $href = $m.Groups[1].Value
        # Strip query string or hash if present
        $cleanHref = $href.Split('#')[0].Split('?')[0]
        if ($cleanHref -and -not $cleanHref.StartsWith("http") -and -not $cleanHref.StartsWith("mailto:") -and -not $cleanHref.StartsWith("javascript:")) {
            $resolved = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($file.DirectoryName, $cleanHref))
            $checkedLinks++
            if (-not (Test-Path $resolved)) {
                $errors += "Broken <a> link in $($file.Name): '$href' -> resolves to '$resolved' (File not found)"
            }
        }
    }
}

Write-Host "Checked $checkedLinks internal links across all HTML files."
if ($errors.Count -eq 0) {
    Write-Host "ALL $checkedLinks INTERNAL LINKS ARE 100% VALID! Zero broken links." -ForegroundColor Green
} else {
    Write-Host "Found $($errors.Count) broken links:" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host " - $_" -ForegroundColor Yellow }
}
