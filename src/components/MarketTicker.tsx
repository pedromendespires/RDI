import React from 'react';
import { MarketDataResponse, Currency } from '../types';
import { TrendingUp, TrendingDown, Radio, AlertTriangle, ShieldAlert } from 'lucide-react';

interface MarketTickerProps {
  marketData: MarketDataResponse | null;
  currency: Currency;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ marketData, currency }) => {
  if (!marketData) {
    return (
      <div className="bg-slate-900/90 border-b border-slate-800 py-2.5 px-4 text-xs text-slate-400 flex items-center justify-center gap-2">
        <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
        <span>A carregar dados de mercado...</span>
      </div>
    );
  }

  const { assets, macroIndicators } = marketData;
  const rateUsdEur = 0.92; // Approx USD/EUR conversion rate

  const formatPrice = (usdPrice: number) => {
    if (currency === 'EUR') {
      const finalPrice = usdPrice * rateUsdEur;
      return `${finalPrice.toLocaleString('pt-PT', {
        minimumFractionDigits: usdPrice > 1000 ? 0 : 2,
        maximumFractionDigits: usdPrice > 1000 ? 0 : 2,
      })} €`;
    }
    return `$ ${usdPrice.toLocaleString('en-US', {
      minimumFractionDigits: usdPrice > 1000 ? 0 : 2,
      maximumFractionDigits: usdPrice > 1000 ? 0 : 2,
    })}`;
  };

  const tickerItems = [
    { key: 'gold', asset: assets.gold, badge: 'Metais Preciosos / Ouro' },
    { key: 'stocks', asset: assets.stocks, badge: 'Pricing Power / Ações' },
    { key: 'longBonds', asset: assets.longBonds, badge: 'Ativos Reais / REITs' },
    { key: 'cash', asset: assets.cash, badge: 'Tesouro Curto Prazo / T-Bills' },
    { key: 'bitcoin', asset: assets.bitcoin, badge: 'Cripto / BTC' },
  ];

  return (
    <div id="market-ticker-section" className="bg-slate-950/90 border-b border-slate-800/80 py-2.5 px-4 overflow-x-auto text-xs font-mono">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 min-w-max">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-slate-400 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-sans font-semibold text-slate-300">Cotações de Mercado:</span>
        </div>

        {/* Assets Price Tickers */}
        <div className="flex items-center gap-6 overflow-x-auto py-0.5">
          {tickerItems.map(({ key, asset, badge }) => {
            const isUp = asset.change24h >= 0;
            return (
              <div key={key} className="flex items-center gap-2 bg-slate-900/80 border border-slate-800/90 px-3 py-1 rounded-md shrink-0 hover:border-slate-700 transition">
                <span className="text-[10px] uppercase text-amber-400/90 font-sans font-medium px-1.5 py-0.5 bg-amber-500/10 rounded">
                  {badge}
                </span>
                <span className="text-slate-200 font-bold">{formatPrice(asset.priceUSD)}</span>
                <span
                  className={`flex items-center gap-0.5 text-[11px] font-bold ${
                    isUp ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {isUp ? '+' : ''}
                  {asset.change24h}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Macro Debt Warning Badge */}
        <div className="shrink-0 flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-300 px-3 py-1 rounded-md font-sans text-[11px]">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>Dívida/GDP EUA: <strong className="font-mono text-rose-200">{macroIndicators.usDebtToGDP}%</strong></span>
          <span className="text-slate-500">|</span>
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Inflação: <strong className="font-mono text-amber-200">{macroIndicators.usInflationRate}%</strong></span>
        </div>
      </div>
    </div>
  );
};
