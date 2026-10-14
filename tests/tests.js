/**
 * tests.js — Elevia Startups
 * Comprehensive Unit Test Suite for All Financial and Strategic Calculation Engines.
 */

import { calcTopDown, calcBottomUp, generateScenarios, analyzeResults } from '../src/js/tools/tam-sam-som.calc.js';
import { calcDilution } from '../src/js/tools/dilution.calc.js';
import { calcCAC, calcCACByChannel, calcLTVSubscription, calcLTVSimple, calcRatios } from '../src/js/tools/cac-ltv.calc.js';
import { calcBurnRate, calcScenarios } from '../src/js/tools/burn-rate.calc.js';
import {
  calcBerkus,
  calcScorecard,
  calcVentureCapital,
  calcRevenueMultiples,
  calcDCF,
  calcRiskFactors,
  calcComparables,
  median,
  getRecommendedMethods
} from '../src/js/tools/valuation.calc.js';
import {
  createObjective,
  createKeyResult,
  createTask,
  calcKRProgress,
  calcObjectiveProgress,
  reorderArray
} from '../src/js/tools/okr.calc.js';

export function runAllTests() {
  const results = [];
  let passed = 0;
  let failed = 0;

  function assert(name, condition, details = '') {
    if (condition) {
      passed++;
      results.push({ name, status: 'PASS', details });
    } else {
      failed++;
      results.push({ name, status: 'FAIL', details: details || 'Assertion failed' });
      console.error(`[FAIL] ${name}:`, details);
    }
  }

  // ==========================================
  // 1. TAM / SAM / SOM Tests
  // ==========================================
  {
    // Test: Top-down standard
    const td = calcTopDown({ referenceMarket: 500000000, samPercent: 10, somPercent: 5 });
    assert('TAM/SAM/SOM: Top-down TAM matches reference market', td.tam === 500000000);
    assert('TAM/SAM/SOM: Top-down SAM is 10% of TAM', td.sam === 50000000);
    assert('TAM/SAM/SOM: Top-down SOM is 5% of SAM', td.som === 2500000);
    assert('TAM/SAM/SOM: Top-down has no errors', td.errors.length === 0);

    // Test: Top-down validation SOM > SAM
    const tdInvalid = calcTopDown({ referenceMarket: 1000000, samPercent: 10, somPercent: 120 });
    assert('TAM/SAM/SOM: Error if SOM > SAM or percentage > 100', tdInvalid.errors.length > 0);

    // Test: Bottom-up standard
    const bu = calcBottomUp({
      totalPotentialCustomers: 100000,
      addressablePercent: 20,
      avgAnnualRevenuePerCustomer: 1200,
      capturePercent: 5
    });
    assert('TAM/SAM/SOM: Bottom-up TAM = Total * ARPU', bu.tam === 120000000);
    assert('TAM/SAM/SOM: Bottom-up SAM = TAM * 20%', bu.sam === 24000000);
    assert('TAM/SAM/SOM: Bottom-up SOM = SAM * 5%', bu.som === 1200000);
    assert('TAM/SAM/SOM: Bottom-up has no errors', bu.errors.length === 0);

    // Test: Divide-by-zero or negative protection
    const buZero = calcBottomUp({
      totalPotentialCustomers: 0,
      addressablePercent: 20,
      avgAnnualRevenuePerCustomer: 1200,
      capturePercent: 5
    });
    assert('TAM/SAM/SOM: Rejects zero customers', buZero.errors.length > 0);

    // Test: Scenarios generation
    const scen = generateScenarios('top-down', { referenceMarket: 100000000, samPercent: 10, somPercent: 5 });
    assert('TAM/SAM/SOM: Generates 3 scenarios', !!(scen.conservative && scen.base && scen.optimistic));
    assert('TAM/SAM/SOM: Conservative SOM < Base SOM', scen.conservative.results.som < scen.base.results.som);
    assert('TAM/SAM/SOM: Optimistic SOM > Base SOM', scen.optimistic.results.som > scen.base.results.som);
  }

  // ==========================================
  // 2. Dilution Calculator Tests
  // ==========================================
  {
    const founders = [
      { name: 'Alice', percent: 60 },
      { name: 'Bob', percent: 40 }
    ];
    const dil = calcDilution({ preMoney: 1500000, investment: 300000, founders });
    
    assert('Dilución: Post-money = Pre-money + Inversión', dil.postMoney === 1800000);
    assert('Dilución: Inversor = 300k / 1.8M = 16.6667%', Math.abs(dil.investorPercent - 16.6667) < 0.01);
    
    const alicePost = dil.founders.find(f => f.name === 'Alice').postPercent;
    const bobPost = dil.founders.find(f => f.name === 'Bob').postPercent;
    assert('Dilución: Alice diluida proporcionalmente (60 * (1 - 0.166667) = 50%)', Math.abs(alicePost - 50.0) < 0.05);
    assert('Dilución: Bob diluido proporcionalmente (40 * (1 - 0.166667) = 33.33%)', Math.abs(bobPost - 33.33) < 0.05);

    // Test: Sum of post-percentages equals 100%
    const totalPost = alicePost + bobPost + dil.investorPercent;
    assert('Dilución: Suma total de participaciones post-ronda es 100%', Math.abs(totalPost - 100) < 0.05);

    // Test: Error on negative or zero preMoney
    const dilErr = calcDilution({ preMoney: 0, investment: 100000, founders });
    assert('Dilución: Pre-money cero produce error', dilErr.errors.length > 0);
  }

  // ==========================================
  // 3. CAC / LTV Tests
  // ==========================================
  {
    // CAC
    const cacRes = calcCAC({ totalSpend: 10000, customersAcquired: 50 });
    assert('CAC/LTV: CAC = 10000 / 50 = 200', cacRes.cac === 200);

    const cacZero = calcCAC({ totalSpend: 10000, customersAcquired: 0 });
    assert('CAC/LTV: CAC rechaza 0 clientes', cacZero.errors.length > 0);

    // LTV Subscription
    const ltvSub = calcLTVSubscription({ avgMonthlyRevenue: 100, grossMargin: 80, monthlyChurn: 4 });
    // (100 * 0.8) / 0.04 = 2000
    assert('CAC/LTV: LTV SaaS = (ARPU * Margen) / Churn = 2000', Math.abs(ltvSub.ltv - 2000) < 1);

    // LTV Transactional
    const ltvTx = calcLTVSimple({
      avgOrderValue: 60,
      purchaseFrequency: 3,
      grossMargin: 50,
      customerLifetimeYears: 2
    });
    // 60 * 3 * 0.5 * 2 = 180
    assert('CAC/LTV: LTV transaccional = AOV * Freq * Margen * Años = 180', ltvTx.ltv === 180);

    // Ratios
    const rat = calcRatios({ ltv: 2000, cac: 200, avgMonthlyRevenue: 100, grossMargin: 80 });
    assert('CAC/LTV: Ratio LTV/CAC = 2000 / 200 = 10x', rat.ltvCacRatio === 10);
    // Payback = CAC / (ARPU * Margen) = 200 / 80 = 2.5 meses
    assert('CAC/LTV: Payback period = 200 / 80 = 2.5 meses', Math.abs(rat.paybackMonths - 2.5) < 0.01);
  }

  // ==========================================
  // 4. Burn Rate & Runway Tests
  // ==========================================
  {
    const expenses = [
      { category: 'Salaries', amount: 15000 },
      { category: 'Servers', amount: 3000 },
      { category: 'Marketing', amount: 2000 }
    ];
    const burn = calcBurnRate({
      initialCash: 120000,
      monthlyRevenue: 10000,
      monthlyExpenses: expenses
    });

    assert('Burn Rate: Gross Burn = 15k + 3k + 2k = 20k', burn.grossBurn === 20000);
    assert('Burn Rate: Net Burn = 20k - 10k = 10k', burn.netBurn === 10000);
    assert('Burn Rate: Runway = 120k / 10k = 12 meses', burn.runway === 12);
    assert('Burn Rate: Proyección tiene 12 meses', burn.projections.length === 12);

    // Cash positive scenario
    const profitable = calcBurnRate({
      initialCash: 50000,
      monthlyRevenue: 25000,
      monthlyExpenses: expenses
    });
    assert('Burn Rate: Si ingresos > gastos, runway es null (generando caja)', profitable.runway === null);

    // One-time events impact
    const withEvents = calcBurnRate({
      initialCash: 30000,
      monthlyRevenue: 5000,
      monthlyExpenses: [{ category: 'Ops', amount: 10000 }], // Net burn = 5000
      oneTimeEvents: [{ month: 2, amount: 20000, label: 'Subvención' }]
    });
    // Month 1: 30k - 5k = 25k
    // Month 2: 25k - 5k + 20k = 40k
    assert('Burn Rate: Evento puntual positivo aumenta saldo proyectado', withEvents.projections[1].cashBalance === 40000);
  }

  // ==========================================
  // 5. Valuation Methods Tests
  // ==========================================
  {
    // Berkus
    const berkusComps = [
      { name: 'Idea', value: 300000, maxValue: 500000 },
      { name: 'Prototype', value: 400000, maxValue: 500000 },
      { name: 'Team', value: 400000, maxValue: 500000 },
      { name: 'Partners', value: 100000, maxValue: 500000 },
      { name: 'Traction', value: 200000, maxValue: 500000 },
    ];
    const bRes = calcBerkus(berkusComps);
    assert('Valoración Berkus: Suma de componentes = 1.400.000 €', bRes.total === 1400000);

    // Scorecard (Payne)
    const scFactors = [
      { name: 'Team', weight: 40, score: 1.25 }, // 0.40 * 1.25 = 0.50
      { name: 'Market', weight: 40, score: 1.00 }, // 0.40 * 1.00 = 0.40
      { name: 'Product', weight: 20, score: 1.50 }, // 0.20 * 1.50 = 0.30 -> total = 1.20
    ];
    const scRes = calcScorecard(1500000, scFactors);
    assert('Valoración Scorecard: Multiplicador ponderado es 1.20', Math.abs(scRes.multiplier - 1.20) < 0.01);
    assert('Valoración Scorecard: Valoración = 1.5M * 1.2 = 1.800.000 €', Math.abs(scRes.valuation - 1800000) < 1);

    // Venture Capital Method
    const vcRes = calcVentureCapital({
      exitValue: 10000000,
      horizon: 5,
      requiredMultiple: 10,
      investment: 300000
    });
    assert('Valoración VC: Post-money = 10M / 10 = 1.000.000 €', vcRes.postMoney === 1000000);
    assert('Valoración VC: Pre-money = 1M - 300k = 700.000 €', vcRes.preMoney === 700000);
    assert('Valoración VC: % Inversor = 300k / 1M = 30%', vcRes.investorPercent === 30);

    // Revenue Multiples
    const multRes = calcRevenueMultiples({
      revenue: 200000,
      multipleMin: 4,
      multipleMid: 6,
      multipleMax: 8
    });
    assert('Valoración Múltiplos: Mín = 800k', multRes.valuationMin === 800000);
    assert('Valoración Múltiplos: Central = 1.2M', multRes.valuationMid === 1200000);
    assert('Valoración Múltiplos: Máx = 1.6M', multRes.valuationMax === 1600000);

    // DCF validation: Gordon model requirement (g < r)
    const dcfInvalid = calcDCF({
      cashFlows: [10000, 20000, 30000],
      discountRate: 10,
      terminalGrowthRate: 15, // g > r is mathematically impossible for terminal value
    });
    assert('Valoración DCF: Rechaza tasa de crecimiento terminal superior al descuento', dcfInvalid.errors.length > 0);

    const dcfValid = calcDCF({
      cashFlows: [50000, 80000, 120000],
      discountRate: 20,
      terminalGrowthRate: 3,
    });
    assert('Valoración DCF: Calcula valor presente sin errores cuando g < r', dcfValid.errors.length === 0 && dcfValid.equityValue > 0);

    // Risk Factor Summation
    const rfRes = calcRiskFactors({
      baseValuation: 1500000,
      factors: [
        { name: 'Team', adjustment: 250000 },
        { name: 'Competition', adjustment: -100000 }
      ]
    });
    assert('Valoración Risk Factor: Ajuste total = 150k', rfRes.totalAdjustment === 150000);
    assert('Valoración Risk Factor: Final = 1.650.000 €', rfRes.finalValuation === 1650000);

    // Comparables & Median
    assert('Helpers: Cálculo de mediana impar', median([10, 20, 30]) === 20);
    assert('Helpers: Cálculo de mediana par', median([10, 20, 30, 40]) === 25);

    const compRes = calcComparables([
      { valuation: 1000000 },
      { valuation: 1500000 },
      { valuation: 2000000 }
    ]);
    assert('Valoración Comparables: Mediana = 1.5M', compRes.median === 1500000);
    assert('Valoración Comparables: Rango [1M, 2M]', compRes.min === 1000000 && compRes.max === 2000000);

    // Recommended methods for stages
    assert('Valoración: Idea recomienda Berkus', getRecommendedMethods('idea').includes('berkus'));
    assert('Valoración: Pre-seed recomienda Scorecard', getRecommendedMethods('pre-seed').includes('scorecard'));
  }

  // ==========================================
  // 6. OKR Logic Tests
  // ==========================================
  {
    const kr = {
      currentValue: 15,
      targetValue: 30,
      tasks: [{ completed: true }, { completed: true }, { completed: false }]
    };
    // KR Progress must be 15/30 = 50%, NOT 2/3 (66%) from tasks!
    const krProg = calcKRProgress(kr);
    assert('OKR: Progreso de KR es métrico puro (15/30 = 50%)', krProg === 50);

    const obj = {
      keyResults: [
        { currentValue: 10, targetValue: 10 }, // 100%
        { currentValue: 0, targetValue: 50 },  // 0%
        { currentValue: 25, targetValue: 50 }, // 50%
      ]
    };
    // Average of 100, 0, 50 = 50%
    assert('OKR: Progreso de Objetivo es el promedio de KRs (50%)', calcObjectiveProgress(obj) === 50);

    // Reorder immutable
    const arr = ['A', 'B', 'C'];
    const reordered = reorderArray(arr, 0, 2);
    assert('OKR: Reordenación de arrays no muta el original', arr[0] === 'A' && reordered[2] === 'A');
  }

  return { passed, failed, total: passed + failed, results };
}
