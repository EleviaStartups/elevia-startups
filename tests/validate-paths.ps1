$baseDir = "C:\Users\34717\.gemini\antigravity\scratch\elevia-startups"
$errors = @()

# 1. Check all JS files for relative imports
Get-ChildItem -Path "$baseDir\src\js" -Filter "*.js" -Recurse | ForEach-Object {
    $file = $_
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $pattern = 'from\s+[\x22\x27]([^\x22\x27]+)[\x22\x27]'
    $matches = [regex]::Matches($content, $pattern)
    foreach ($m in $matches) {
        $importPath = $m.Groups[1].Value
        if ($importPath.StartsWith(".")) {
            $resolved = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($file.DirectoryName, $importPath))
            if (-not (Test-Path $resolved)) {
                $errors += "JS Import Missing in $($file.FullName): $importPath -> $resolved"
            }
        }
    }
}

# 2. Check all HTML files for script and link paths
Get-ChildItem -Path $baseDir -Filter "*.html" -Recurse | ForEach-Object {
    $file = $_
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # CSS links
    $cssPattern = 'href=[\x22\x27]([^\x22\x27]+\.css)[\x22\x27]'
    $cssMatches = [regex]::Matches($content, $cssPattern)
    foreach ($m in $cssMatches) {
        $href = $m.Groups[1].Value
        if (-not $href.StartsWith("http")) {
            $resolved = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($file.DirectoryName, $href))
            if (-not (Test-Path $resolved)) {
                $errors += "CSS Link Missing in $($file.FullName): $href -> $resolved"
            }
        }
    }

    # Inline script module imports
    $importPattern = 'from\s+[\x22\x27]([^\x22\x27]+)[\x22\x27]'
    $importMatches = [regex]::Matches($content, $importPattern)
    foreach ($m in $importMatches) {
        $imp = $m.Groups[1].Value
        if ($imp.StartsWith(".")) {
            $resolved = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($file.DirectoryName, $imp))
            if (-not (Test-Path $resolved)) {
                $errors += "Inline Import Missing in $($file.FullName): $imp -> $resolved"
            }
        }
    }
}

if ($errors.Count -eq 0) {
    Write-Host "ALL ASSET AND MODULE PATHS ARE 100% VALID! No missing references." -ForegroundColor Green
} else {
    Write-Host "Found $($errors.Count) path issues:" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host " - $_" -ForegroundColor Yellow }
}
