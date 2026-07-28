import { PresetStrategy, HistoricalDataPoint, SeasonInfo } from '../types';

export const PRESET_STRATEGIES: PresetStrategy[] = [
  {
    id: 'all_weather_classic',
    name: 'Os 4 Ativos de Sobrevivência (Estratégia Recomendada)',
    description: 'Alocação equilibrada (70% a 90% do portfólio) nos 4 pilares essenciais: Metais Preciosos, Empresas Pricing Power, Tesouro Curto Prazo e Ativos Reais Produtivos.',
    riskProfile: 'Estratégico Macro',
    allocation: {
      gold: 15,
      stocks: 35,
      cash: 35,
      longBonds: 15,
      bitcoin: 0,
    },
  },
  {
    id: 'dalio_18m_warning',
    name: 'Máxima Proteção em Metais & Terras',
    description: 'Foco reforçado em Metais Preciosos Físicos (15%) e Ativos Reais Produtivos / Terras (20%) com elevada liquidez de curto prazo.',
    riskProfile: 'Conservador',
    allocation: {
      gold: 20,
      stocks: 30,
      cash: 30,
      longBonds: 20,
      bitcoin: 0,
    },
  },
  {
    id: 'defensive_preservation',
    name: 'Alta Liquidez & Opcionalidade de Compra',
    description: 'Enfase em Bilhetes do Tesouro de curto prazo (40%) para garantir munição quando surgir pânico e saldos no mercado.',
    riskProfile: 'Moderado',
    allocation: {
      gold: 15,
      stocks: 25,
      cash: 45,
      longBonds: 15,
      bitcoin: 0,
    },
  },
  {
    id: 'growth_macro',
    name: 'Crescimento com Pricing Power & Cripto',
    description: 'Alocação em Dividend Aristocrats com poder de fixação de preços (40%) combinados com metais físicos e ativos tangíveis.',
    riskProfile: 'Agressivo',
    allocation: {
      gold: 15,
      stocks: 40,
      cash: 20,
      longBonds: 15,
      bitcoin: 10,
    },
  },
];

export const ECONOMIC_SEASONS: SeasonInfo[] = [
  {
    id: 'stagflation',
    title: 'Estagflação (Inflação Elevada + Crescimento Baixo)',
    inflation: 'high',
    growth: 'low',
    description: 'O cenário mais adverso para ativos tradicionais. Emissão monetária sem aumento de produtividade real.',
    winnerAssets: ['Ouro & Commodities', 'Obrigações Indexadas à Inflação (TIPS)', 'Bitcoin'],
    loserAssets: ['Ações de Crescimento', 'Obrigações Nominais de Taxa Fixa'],
    historicalExample: 'Anos 1970 (Crise do Petróleo) e Período 2021-2022',
  },
  {
    id: 'boom',
    title: 'Aceleração Económica (Inflação Baixa + Crescimento Elevado)',
    inflation: 'low',
    growth: 'high',
    description: 'Ambiente propício para ativos de risco e empresas de forte produtividade.',
    winnerAssets: ['Ações Globais / S&P 500', 'Obrigações Empresariais', 'Criptoativos'],
    loserAssets: ['Ouro Físico (custo de oportunidade)', 'Depósitos a Rendimento Reduzido'],
    historicalExample: 'Década de 1990 e Pós-Crise 2012-2019',
  },
  {
    id: 'recession',
    title: 'Recessão Deflacionária (Inflação Baixa + Crescimento Baixo)',
    inflation: 'low',
    growth: 'low',
    description: 'Contração do crédito, abrandamento do consumo e desalavancagem.',
    winnerAssets: ['Obrigações do Tesouro de Longo Prazo', 'Caixa & T-Bills', 'Moedas Fortes'],
    loserAssets: ['Ações de Empresas Endividadas', 'Commodities Industriais'],
    historicalExample: 'Crise Financeira Global de 2008 e Março de 2020',
  },
  {
    id: 'reflation',
    title: 'Expansão Inflacionária (Inflação Elevada + Crescimento Elevado)',
    inflation: 'high',
    growth: 'high',
    description: 'Fase de expansão impulsionada por crédito abundante e forte procura de consumo.',
    winnerAssets: ['Ações de Commodities/Energia', 'Imobiliário & Ativos Reais', 'Ouro'],
    loserAssets: ['Obrigações de Longa Duração a Taxa Fixa'],
    historicalExample: 'Período 2003-2007 e Retoma de 2021',
  },
];

export const GENERATE_HISTORICAL_PERFORMANCE = (): HistoricalDataPoint[] => {
  const points: HistoricalDataPoint[] = [];
  const startDate = new Date(2021, 0, 1);
  let goldVal = 100;
  let stocksVal = 100;
  let bondsVal = 100;
  let cashVal = 100;
  let btcVal = 100;

  for (let i = 0; i <= 48; i++) {
    const d = new Date(startDate);
    d.setMonth(d.getMonth() + i);
    const dateStr = d.toLocaleDateString('pt-PT', { month: 'short', year: '2-digit' });

    // Simulate realistic economic cycle returns
    if (i < 12) {
      // 2021: Post-covid stimulus
      goldVal *= 1.008;
      stocksVal *= 1.018;
      bondsVal *= 0.995;
      cashVal *= 1.003;
      btcVal *= 1.035;
    } else if (i < 24) {
      // 2022: Global Inflation & Rate hikes (Stock/bond crash, gold resilient)
      goldVal *= 1.006;
      stocksVal *= 0.982;
      bondsVal *= 0.975;
      cashVal *= 1.004;
      btcVal *= 0.94;
    } else if (i < 36) {
      // 2023: Recovery & Rate Pause
      goldVal *= 1.012;
      stocksVal *= 1.021;
      bondsVal *= 1.002;
      cashVal *= 1.004;
      btcVal *= 1.06;
    } else {
      // 2024-2026: Debt Cycle tension, Gold rally, Rate cuts
      goldVal *= 1.018;
      stocksVal *= 1.012;
      bondsVal *= 1.001;
      cashVal *= 1.003;
      btcVal *= 1.025;
    }

    // Dalio All Weather: 25% Gold, 30% Stocks, 25% Long Bonds, 20% Cash
    const dalioVal = (goldVal * 0.25) + (stocksVal * 0.30) + (bondsVal * 0.25) + (cashVal * 0.20);
    const sp500Val = stocksVal;
    const cdiInflationVal = 100 * Math.pow(1.006, i); // steady Euribor / European inflation benchmark

    points.push({
      date: dateStr,
      gold: Number(goldVal.toFixed(1)),
      stocks: Number(stocksVal.toFixed(1)),
      longBonds: Number(bondsVal.toFixed(1)),
      cash: Number(cashVal.toFixed(1)),
      bitcoin: Number(btcVal.toFixed(1)),
      dalioPortfolio: Number(dalioVal.toFixed(1)),
      sp500: Number(sp500Val.toFixed(1)),
      cdiInflation: Number(cdiInflationVal.toFixed(1)),
    });
  }

  return points;
};

export const DALIO_KEY_PRINCIPLES = [
  {
    title: 'A. Metais Preciosos Físicos (Ouro e Prata) — 10% a 15%',
    description: 'Não é um investimento para lucro imediato, mas sim um seguro vitalício. Quando as moedas colapsam ou perdem valor pela emissão excessiva, o ouro físico (moedas 1 oz / barras) mantém o poder de compra intacto.',
    icon: 'ShieldCheck',
  },
  {
    title: 'B. Empresas com "Pricing Power" — 30% a 35%',
    description: 'Empresas de bens essenciais (consumo básico, utilidades, saúde) com marcas fortes que repassam a inflação aos consumidores. Destaque para os "Dividend Aristocrats" com 25+ anos de dividendos crescentes.',
    icon: 'TrendingUp',
  },
  {
    title: 'C. Títulos do Tesouro de Curto Prazo & Cash — 20% a 25%',
    description: 'Protege o capital com juros decentes e serve como munição com "opcionalidade". Quando a crise estourar e houver venda em pânico, terá liquidez para adquirir ativos de topo a preços de saldo.',
    icon: 'Landmark',
  },
  {
    title: 'D. Ativos Reais Produtivos — 10% a 15%',
    description: 'Coisas tangíveis e indispensáveis à sobrevivência humana (comida, abrigo e energia): terras agrícolas e imobiliário residencial para arrendamento (acessíveis via REITs como LAND, O ou VNQ).',
    icon: 'Home',
  },
];

