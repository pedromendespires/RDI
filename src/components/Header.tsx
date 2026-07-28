import React from 'react';
import { Currency } from '../types';
import { Shield, BookOpen, RefreshCw, DollarSign, Coins } from 'lucide-react';

interface HeaderProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenPrinciples: () => void;
  onRefreshData: () => void;
  isRefreshing: boolean;
  totalCapital: number;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  setCurrency,
  onOpenPrinciples,
  onRefreshData,
  isRefreshing,
  totalCapital,
}) => {
  const formatMoney = (val: number) => {
    return currency === 'EUR'
      ? `${val.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
      : `$ ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <header id="main-header" className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md shadow-amber-500/20 text-slate-950 font-bold">
            <Shield className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100 font-serif">
                Carteira Ray Dalio
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Modelo All-Weather
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Aplicação Prática, Análise em Tempo Real & Proteção Patrimonial
            </p>
          </div>
        </div>

        {/* Capital Summary & Controls */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          {/* Currency Switcher */}
          <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700/80">
            <button
              id="currency-btn-eur"
              onClick={() => setCurrency('EUR')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition flex items-center gap-1 ${
                currency === 'EUR'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              EUR (€)
            </button>
            <button
              id="currency-btn-usd"
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition flex items-center gap-1 ${
                currency === 'USD'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              USD ($)
            </button>
          </div>

          {/* Capital Badge */}
          <div className="bg-slate-800/80 border border-slate-700/70 px-3 py-1.5 rounded-lg text-right hidden lg:block">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Património Gerido</div>
            <div className="text-sm font-bold text-emerald-400">{formatMoney(totalCapital)}</div>
          </div>

          {/* Action Buttons */}
          <button
            id="btn-refresh-data"
            onClick={onRefreshData}
            title="Atualizar cotações em tempo real"
            className="p-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition flex items-center justify-center"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          <button
            id="btn-open-principles-header"
            onClick={onOpenPrinciples}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-amber-300 text-xs font-medium rounded-lg transition flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Princípios de Dalio</span>
          </button>
        </div>
      </div>
    </header>
  );
};
