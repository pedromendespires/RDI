export type Currency = 'EUR' | 'USD';

export interface AssetInfo {
  symbol: string;
  name: string;
  pillar: string;
  priceUSD: number;
  change24h: number;
  weightRecommended: number;
  ytdReturn: number;
  drawdownMax: number;
  volatility: number;
  trend: 'up' | 'down' | 'stable' | 'flat' | 'neutral';
}

export interface MacroIndicators {
  usInflationRate: number;
  fedInterestRate: number;
  usDebtToGDP: number;
  dollarIndexDXY: number;
  cycleWindowMonthsLeft: number;
  debtCycleRiskLevel: string;
}

export interface MarketDataResponse {
  timestamp: string;
  assets: {
    gold: AssetInfo;
    stocks: AssetInfo;
    longBonds: AssetInfo;
    cash: AssetInfo;
    bitcoin: AssetInfo;
  };
  macroIndicators: MacroIndicators;
}

export interface PortfolioAllocation {
  gold: number;      // %
  stocks: number;    // %
  longBonds: number; // %
  cash: number;      // %
  bitcoin: number;   // %
}

export interface UserAssetItem {
  id: string;
  pillarKey: 'gold' | 'stocks' | 'longBonds' | 'cash' | 'bitcoin';
  ticker: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  notes?: string;
}

export interface PresetStrategy {
  id: string;
  name: string;
  description: string;
  allocation: PortfolioAllocation;
  riskProfile: 'Conservador' | 'Moderado' | 'Estratégico Macro' | 'Agressivo';
}

export interface HistoricalDataPoint {
  date: string;
  gold: number;
  stocks: number;
  longBonds: number;
  cash: number;
  bitcoin: number;
  dalioPortfolio: number;
  sp500: number;
  cdiInflation: number;
}

export type EconomicSeason = 'stagflation' | 'boom' | 'recession' | 'reflation';

export interface SeasonInfo {
  id: EconomicSeason;
  title: string;
  inflation: 'high' | 'low';
  growth: 'high' | 'low';
  description: string;
  winnerAssets: string[];
  loserAssets: string[];
  historicalExample: string;
}
