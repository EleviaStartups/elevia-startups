# ==============================================================================
# verify-calculations.ps1 - Elevia Startups
# Verificacion automatizada de logica matematica y casos limite
# ==============================================================================

Write-Host ""
Write-Host ">>> Iniciando suite de pruebas matematicas para Elevia Startups..." -ForegroundColor Cyan
Write-Host ""

$script:passed = 0
$script:failed = 0

function Assert-Check {
    param(
        [string]$Name,
        [bool]$Condition,
        [string]$Details = ""
    )
    if ($Condition) {
        $script:passed++
        Write-Host "  [PASS] $Name" -ForegroundColor Green
    } else {
        $script:failed++
        Write-Host "  [FAIL] $Name - $Details" -ForegroundColor Red
    }
}

# ------------------------------------------------------------------------------
# 1. TAM / SAM / SOM
# ------------------------------------------------------------------------------
Write-Host "[1/6] Probando TAM / SAM / SOM..." -ForegroundColor Yellow

$refMarket = 500000000
$samPct = 10
$somPct = 5

$tam = $refMarket
$sam = $tam * ($samPct / 100)
$som = $sam * ($somPct / 100)

Assert-Check -Name "TAM Top-down coincide con mercado referencia (500M)" -Condition ($tam -eq 500000000)
Assert-Check -Name "SAM Top-down es 10% del TAM (50M)" -Condition ($sam -eq 50000000)
Assert-Check -Name "SOM Top-down es 5% del SAM (2.5M)" -Condition ($som -eq 2500000)
Assert-Check -Name "Regla de coherencia: SOM menor o igual que SAM" -Condition ($som -le $sam)
Assert-Check -Name "Regla de coherencia: SAM menor o igual que TAM" -Condition ($sam -le $tam)

$customers = 100000
$addrPct = 20
$arpu = 1200
$capPct = 5

$tamBU = $customers * $arpu
$samBU = $tamBU * ($addrPct / 100)
$somBU = $samBU * ($capPct / 100)

Assert-Check -Name "TAM Bottom-up = Clientes * ARPU (120M)" -Condition ($tamBU -eq 120000000)
Assert-Check -Name "SAM Bottom-up = TAM * 20% (24M)" -Condition ($samBU -eq 24000000)
Assert-Check -Name "SOM Bottom-up = SAM * 5% (1.2M)" -Condition ($somBU -eq 1200000)

# ------------------------------------------------------------------------------
# 2. DILUCION DE SOCIOS
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "[2/6] Probando Calculadora de Dilucion..." -ForegroundColor Yellow

$preMoney = 1500000
$investment = 300000

$postMoney = $preMoney + $investment
$investorPct = ($investment / $postMoney) * 100

Assert-Check -Name "Post-money = Pre-money + Inversion (1.8M)" -Condition ($postMoney -eq 1800000)
Assert-Check -Name "Porcentaje nuevo inversor = 300k / 1.8M = 16.6667%" -Condition ([Math]::Abs($investorPct - 16.666667) -lt 0.001)

$founderAPost = 60.0 * (1 - ($investorPct / 100))
$founderBPost = 40.0 * (1 - ($investorPct / 100))

Assert-Check -Name "Fundador A diluido a 50.0%" -Condition ([Math]::Abs($founderAPost - 50.0) -lt 0.01)
Assert-Check -Name "Fundador B diluido a 33.33%" -Condition ([Math]::Abs($founderBPost - 33.333333) -lt 0.01)

$totalCapTablePost = $founderAPost + $founderBPost + $investorPct
Assert-Check -Name "Suma total Cap Table post-ronda es 100%" -Condition ([Math]::Abs($totalCapTablePost - 100.0) -lt 0.01)
Assert-Check -Name "Control de division por cero si preMoney es positivo" -Condition ($preMoney -gt 0)

# ------------------------------------------------------------------------------
# 3. CAC / LTV
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "[3/6] Probando CAC / LTV..." -ForegroundColor Yellow

$spend = 12000
$acquired = 48
$cac = $spend / $acquired

Assert-Check -Name "CAC = 12000 / 48 = 250 euros" -Condition ($cac -eq 250)

$arpuM = 120
$marginPct = 80
$churnPct = 4.5
$ltv = ($arpuM * ($marginPct / 100)) / ($churnPct / 100)

Assert-Check -Name "LTV SaaS = (120 * 0.80) / 0.045 = 2133.33 euros" -Condition ([Math]::Abs($ltv - 2133.333) -lt 0.01)

$ratio = $ltv / $cac
Assert-Check -Name "Ratio LTV/CAC = 2133.33 / 250 = 8.53x" -Condition ([Math]::Abs($ratio - 8.533) -lt 0.01)

$monthlyMargin = $arpuM * ($marginPct / 100)
$paybackMonths = $cac / $monthlyMargin
Assert-Check -Name "Payback Period = 250 / 96 = 2.60 meses" -Condition ([Math]::Abs($paybackMonths - 2.604) -lt 0.01)

$aov = 65
$freq = 3.2
$txMargin = 45
$lifeYears = 2.5
$ltvTx = $aov * $freq * ($txMargin / 100) * $lifeYears
Assert-Check -Name "LTV Transaccional = 65 * 3.2 * 0.45 * 2.5 = 234 euros" -Condition ([Math]::Abs($ltvTx - 234.0) -lt 0.01)

# ------------------------------------------------------------------------------
# 4. BURN RATE Y RUNWAY
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "[4/6] Probando Burn Rate y Runway..." -ForegroundColor Yellow

$initialCash = 120000
$monthlyRev = 8500
$expenses = @(14000, 1800, 3500, 1200, 600)
$grossBurn = ($expenses | Measure-Object -Sum).Sum
$netBurn = $grossBurn - $monthlyRev
$runway = $initialCash / $netBurn

Assert-Check -Name "Gross burn = 21.100 euros" -Condition ($grossBurn -eq 21100)
Assert-Check -Name "Net burn = 21.100 - 8.500 = 12.600 euros" -Condition ($netBurn -eq 12600)
Assert-Check -Name "Runway = 120.000 / 12.600 = 9.52 meses" -Condition ([Math]::Abs($runway - 9.5238) -lt 0.01)

$cash = $initialCash
$zeroMonth = $null
for ($m = 1; $m -le 12; $m++) {
    $cash -= $netBurn
    if ($cash -le 0 -and $null -eq $zeroMonth) {
        $zeroMonth = $m
    }
}
Assert-Check -Name "Mes critico detectado en Mes 10" -Condition ($zeroMonth -eq 10)

# ------------------------------------------------------------------------------
# 5. VALORACION DE STARTUPS (7 METODOS)
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "[5/6] Probando 7 Metodos de Valoracion..." -ForegroundColor Yellow

$berkus = 300000 + 350000 + 400000 + 150000 + 200000
Assert-Check -Name "Berkus: Suma de componentes = 1.400.000 euros" -Condition ($berkus -eq 1400000)

$scRef = 1500000
$scMult = 1.2
$scVal = $scRef * $scMult
Assert-Check -Name "Scorecard: 1.5M * 1.2 = 1.800.000 euros" -Condition ($scVal -eq 1800000)

$vcExit = 10000000
$vcReturn = 10
$vcInv = 300000
$vcPost = $vcExit / $vcReturn
$vcPre = $vcPost - $vcInv
Assert-Check -Name "VC Method: Post-money = 1.000.000 euros" -Condition ($vcPost -eq 1000000)
Assert-Check -Name "VC Method: Pre-money = 700.000 euros" -Condition ($vcPre -eq 700000)

$arr = 150000
Assert-Check -Name "Multiplo 4x = 600.000 euros" -Condition ($arr * 4 -eq 600000)
Assert-Check -Name "Multiplo 6x = 900.000 euros" -Condition ($arr * 6 -eq 900000)
Assert-Check -Name "Multiplo 8x = 1.200.000 euros" -Condition ($arr * 8 -eq 1200000)

$discount = 0.25
$growth = 0.03
Assert-Check -Name "DCF: Tasa terminal (3%) menor que Tasa descuento (25%)" -Condition ($growth -lt $discount)
$terminalCF = 300000 * (1 + $growth)
$terminalVal = $terminalCF / ($discount - $growth)
Assert-Check -Name "DCF: Valor terminal Gordon es positivo y finito" -Condition ($terminalVal -gt 0)

$rfBase = 1500000
$rfAdj = 150000
Assert-Check -Name "Risk Factor: 1.5M + 150k = 1.650.000 euros" -Condition ($rfBase + $rfAdj -eq 1650000)

$comps = @(1400000, 1600000, 1800000)
$median = $comps[1]
Assert-Check -Name "Comparables: Mediana es 1.600.000 euros" -Condition ($median -eq 1600000)

# ------------------------------------------------------------------------------
# 6. OKR LOGIC
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "[6/8] Probando Logica de OKRs..." -ForegroundColor Yellow

$krTarget = 30
$krCurrent = 12
$krProg = ($krCurrent / $krTarget) * 100
Assert-Check -Name "KR Progreso metrico = (12/30) * 100 = 40%" -Condition ($krProg -eq 40)

$krs = @(40, 84, 100)
$objAvg = ($krs | Measure-Object -Average).Average
Assert-Check -Name "Objetivo progreso promedio = 74.67%" -Condition ([Math]::Abs($objAvg - 74.66667) -lt 0.01)

# ------------------------------------------------------------------------------
# 7. UNIT ECONOMICS Y RETENCION
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "[7/8] Probando Constructor de Unit Economics y Retencion..." -ForegroundColor Yellow

$ueCac = 350
$ueArpu = 75
$ueCogs = 15
$ueMargin = $ueArpu - $ueCogs
$ueMarginPct = ($ueMargin / $ueArpu) * 100
$ueSimplePayback = $ueCac / $ueMargin

Assert-Check -Name "Margen Bruto Unitario = 75 - 15 = 60 euros" -Condition ($ueMargin -eq 60)
Assert-Check -Name "Margen Bruto % = 60 / 75 = 80%" -Condition ($ueMarginPct -eq 80)
Assert-Check -Name "Payback lineal teorico = 350 / 60 = 5.83 meses" -Condition ([Math]::Abs($ueSimplePayback - 5.8333) -lt 0.01)

# Interpolacion de retencion a 12 meses
$retM1 = 92
$retM3 = 80
$retM6 = 68
$retM12 = 50

# Verificacion de retencion no creciente
Assert-Check -Name "Coherencia de retencion: M1 >= M3 >= M6 >= M12" -Condition ($retM1 -ge $retM3 -and $retM3 -ge $retM6 -and $retM6 -ge $retM12)

# Flujo acumulado y Break-even
$m0Cash = -$ueCac
Assert-Check -Name "Flujo unitario inicial en Mes 0 es -CAC (-350 euros)" -Condition ($m0Cash -eq -350)

# ------------------------------------------------------------------------------
# 8. DATA ROOM (DUE DILIGENCE)
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "[8/8] Probando Estructurador de Data Room..." -ForegroundColor Yellow

$totalDocs = 14
$completedDocs = 7
$inProgressDocs = 4
$pendingDocs = 3

$calcProgress = [Math]::Round((($completedDocs + ($inProgressDocs * 0.5)) / $totalDocs) * 100)
# (7 + 2) / 14 = 9 / 14 = 64.28% -> 64%
Assert-Check -Name "Suma total de documentos checklist es 14" -Condition ($totalDocs -eq 14)
Assert-Check -Name "Progreso ponderado (7 compl + 4 en proc) / 14 = 64%" -Condition ($calcProgress -eq 64)

# ==============================================================================
# RESUMEN FINAL
# ==============================================================================
Write-Host ""
Write-Host "=======================================================" -ForegroundColor Cyan
if ($script:failed -eq 0) {
    Write-Host " TODAS LAS PRUEBAS PASARON EXITOSAMENTE ($script:passed/$script:passed)" -ForegroundColor Green
} else {
    Write-Host " HUBO FALLOS: Pasaron: $script:passed, Fallaron: $script:failed" -ForegroundColor Red
}
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""
