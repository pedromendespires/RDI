import React, { useState } from 'react';
import { ECONOMIC_SEASONS } from '../data/dalioModelData';
import { PortfolioAllocation, EconomicSeason } from '../types';
import { Compass, Flame, TrendingDown, Sun, Rocket, AlertTriangle, ShieldCheck, CheckCircle, XCircle } from 'lucide-react';

interface SeasonStressTesterProps {
  allocation: PortfolioAllocation;
}

export const SeasonStressTester: React.FC<SeasonStressTesterProps> = ({ allocation }) => {
  const [selectedSeasonId, setSelectedSeasonId] = useState<EconomicSeason>('stagflation');

  const selectedSeason = ECONOMIC_SEASONS.find((s) => s.id === selectedSeasonId) || ECONOMIC_SEASONS[0];

  // Calculate estimated return impact based on custom allocation weights in selected season
  const calculateSeasonImpact = () => {
    let score = 0;
    // Score weights for each season
    if (selectedSeasonId === 'stagflation') {
      score = (allocation.gold * 1.5) + (allocation.longBonds * -0.2) + (allocation.stocks * -0.4) + (allocation.cash * 0.2) + (allocation.bitcoin * 1.2);
    } else if (selectedSeasonId === 'boom') {
      score = (allocation.stocks * 1.8) + (allocation.bitcoin * 2.0) + (allocation.gold * 0.1) + (allocation.longBonds * 0.5) + (allocation.cash * 0.1);
    } else if (selectedSeasonId === 'recession') {
      score = (allocation.longBonds * 1.6) + (allocation.cash * 0.8) + (allocation.stocks * -1.2) + (allocation.gold * 0.3) + (allocation.bitcoin * -1.5);
    } else {
      // reflation
      score = (allocation.stocks * 1.4) + (allocation.gold * 1.2) + (allocation.bitcoin * 1.5) + (allocation.longBonds * -0.6) + (allocation.cash * 0.1);
    }

    const estAnnualReturn = (score / 10).toFixed(1);
    return Number(estAnnualReturn);
  };

  const estReturn = calculateSeasonImpact();

  return (
    <div id="season-stress-tester-section" className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-sm">
      <div className="mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white font-serif">Radar das 4 Estações Económicas de Dalio</h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Segundo Ray Dalio, o mercado é impulsionado por duas variáveis fundamentais: <strong>Inflação</strong> e <strong>Crescimento Real</strong>. Teste como a sua carteira reage a cada estação.
        </p>
      </div>

      {/* 2x2 Quadrant Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {ECONOMIC_SEASONS.map((season) => {
          const isSelected = season.id === selectedSeasonId;
          const getIcon = () => {
            switch (season.id) {
              case 'stagflation':
                return <Flame className="w-5 h-5 text-amber-400" />;
              case 'boom':
                return <Rocket className="w-5 h-5 text-blue-400" />;
              case 'recession':
                return <TrendingDown className="w-5 h-5 text-rose-400" />;
              case 'reflation':
                return <Sun className="w-5 h-5 text-emerald-400" />;
            }
          };

          return (
            <button
              key={season.id}
              onClick={() => setSelectedSeasonId(season.id)}
              className={`p-4 rounded-xl border text-left transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500 shadow-lg text-white'
                  : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-100">
                  {getIcon()}
                  <span>{season.title}</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {season.id === 'stagflation' ? 'Risco Atual (18M)' : season.growth === 'high' ? 'Expansão' : 'Contração'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">{season.description}</p>
              <div className="text-[10px] text-slate-500 font-mono">
                Exemplo Histórico: <strong className="text-slate-300">{season.historicalExample}</strong>
              </div>
            </button>
          );
        })}
      </div>

      {/* Stress Test Diagnostics Panel */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Estimated Return Gauge */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-center flex flex-col items-center justify-center">
          <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">
            Projeção de Performance Estimada
          </span>
          <span className="text-[11px] text-slate-500 mb-2">Para o cenário: {selectedSeason.title}</span>

          <div
            className={`text-3xl font-extrabold font-mono mb-2 ${
              estReturn >= 8 ? 'text-emerald-400' : estReturn >= 2 ? 'text-amber-400' : 'text-rose-400'
            }`}
          >
            {estReturn >= 0 ? `+${estReturn}%` : `${estReturn}%`} <span className="text-xs font-normal">/ano est.</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {estReturn >= 5 ? 'Resiliência Alta' : estReturn >= 0 ? 'Proteção Moderada' : 'Ajuste de Hedging Recomendado'}
            </span>
          </div>
        </div>

        {/* Assets Reaction Detail */}
        <div className="lg:col-span-8 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span>Ativos que Impulsionam a Carteira neste Cenário</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedSeason.winnerAssets.map((asset) => (
                <span
                  key={asset}
                  className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-lg text-xs font-semibold"
                >
                  {asset}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-2">
              <XCircle className="w-4 h-4" />
              <span>Ativos Sob Pressão ou Desfavoráveis</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedSeason.loserAssets.map((asset) => (
                <span
                  key={asset}
                  className="bg-rose-500/10 border border-rose-500/30 text-rose-300 px-3 py-1 rounded-lg text-xs font-semibold"
                >
                  {asset}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200/90 leading-relaxed">
            <strong className="text-amber-300">Sabedoria All-Weather:</strong> Ninguém consegue prever com certeza qual estação virá em seguida. Por isso, a carteira Dalio mantém a diversificação equilibrada de 25/30/25/20 para que os ativos de ganho em uma estação compensem automaticamente as perdas na outra.
          </div>
        </div>
      </div>
    </div>
  );
};
