# build.ps1 - Elevia Startups
# Genera src/js/elevia.bundle.js (clasico, sin modulos ES) a partir de src/js/**/*.js
# y convierte los <script type="module"> de las paginas en scripts clasicos.
# Resultado: la web funciona abriendo index.html con doble clic (file://) y en GitHub Pages.
# Uso: powershell -ExecutionPolicy Bypass -File build.ps1
# Es idempotente: se puede ejecutar tras cada cambio en src/js.

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$utf8 = New-Object System.Text.UTF8Encoding $false
$jsDir = Join-Path $root 'src\js'

function Convert-Imports([string]$code) {
  $re = "(?s)import\s*\{([^}]*)\}\s*from\s*['""][^'""]*?([\w\.\-]+)\.js['""]\s*;?"
  return [regex]::Replace($code, $re, { param($m) "const {" + $m.Groups[1].Value.Trim() + "} = __req('" + $m.Groups[2].Value + "');" })
}

# ---------- 1. Bundle de la libreria ----------
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("/* AUTO-GENERADO por build.ps1 - no editar. Edita src/js/** y vuelve a ejecutar build.ps1 */")
[void]$sb.AppendLine("document.documentElement.classList.add('js');")
[void]$sb.AppendLine("(function(g){var defs={},cache={};g.__def=function(n,f){defs[n]=f;};g.__req=function(n){if(cache[n])return cache[n];var e={};cache[n]=e;if(!defs[n])throw new Error('Modulo no encontrado: '+n);defs[n](e);return e;};})(window);")

$files = Get-ChildItem $jsDir -Recurse -Filter *.js | Where-Object { $_.Name -ne 'elevia.bundle.js' }
foreach ($f in $files) {
  $name = [IO.Path]::GetFileNameWithoutExtension($f.Name)
  $code = [IO.File]::ReadAllText($f.FullName)
  $code = Convert-Imports $code
  $names = New-Object System.Collections.ArrayList
  foreach ($m in [regex]::Matches($code, '(?m)^export\s+(?:async\s+)?function\s+(\w+)')) { [void]$names.Add($m.Groups[1].Value) }
  foreach ($m in [regex]::Matches($code, '(?m)^export\s+(?:const|let|var)\s+(\w+)')) { [void]$names.Add($m.Groups[1].Value) }
  foreach ($m in [regex]::Matches($code, '(?ms)^export\s*\{([^}]*)\}\s*;?')) {
    foreach ($n in ($m.Groups[1].Value -split ',')) { $t = ($n.Trim() -split '\s+as\s+')[0].Trim(); if ($t) { [void]$names.Add($t) } }
  }
  $code = [regex]::Replace($code, '(?ms)^export\s*\{[^}]*\}\s*;?', '')
  $code = [regex]::Replace($code, '(?m)^export\s+(?=(async\s+)?function|const|let|var)', '')
  [void]$sb.AppendLine("__def('$name', function(__exp){")
  [void]$sb.AppendLine($code)
  foreach ($n in ($names | Select-Object -Unique)) { [void]$sb.AppendLine("__exp.$n = $n;") }
  [void]$sb.AppendLine("});")
}
[IO.File]::WriteAllText((Join-Path $jsDir 'elevia.bundle.js'), $sb.ToString(), $utf8)
Write-Host "Bundle generado con $($files.Count) modulos."

# ---------- 2. Paginas ----------
$pages = Get-ChildItem $root -Recurse -Include *.html | Where-Object { $_.FullName -notmatch '\\tests\\' }
foreach ($p in $pages) {
  $html = [IO.File]::ReadAllText($p.FullName)
  $rel = $p.DirectoryName.Substring($root.Length).Trim('\')
  $depth = if ($rel) { ($rel -split '\\').Count } else { 0 }
  $prefix = ('../' * $depth)
  $bundleTag = "<script src=`"${prefix}src/js/elevia.bundle.js`"></script>"

  $re = '(?s)<script type="module">(.*?)</script>'
  if ($html -match $re) {
    $html = [regex]::Replace($html, $re, {
      param($m)
      $code = Convert-Imports $m.Groups[1].Value
      return "$bundleTag`n<script>`n(function () {`n$code`n})();`n</script>"
    })
    [IO.File]::WriteAllText($p.FullName, $html, $utf8)
    Write-Host "Convertida: $($p.Name)"
  } elseif ($html -match 'elevia\.bundle\.js') {
    # ya convertida: actualizar el codigo no es necesario (el codigo de pagina vive en la propia pagina)
  }
}
Write-Host "Build completado."
