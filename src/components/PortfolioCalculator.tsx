import React, { useState, useEffect } from 'react';
import { PortfolioAllocation, Currency, PresetStrategy } from '../types';
import { PRESET_STRATEGIES } from '../data/dalioModelData';
import { Calculator, ArrowRightLeft, Sliders, CheckCircle2, AlertCircle, PieChart, Sparkles } from 'lucide-react';

interface PortfolioCalculatorProps {
  allocation: PortfolioAllocation;
  setAllocation: (alloc: PortfolioAllocation) => void;
  totalCapital: number;
  setTotalCapital: (val: number) => void;
  currency: Currency;
  onRunAiAnalysis?: () => void;
}

export const PortfolioCalculator: React.FC<PortfolioCalculatorProps> = ({
  allocation,
  setAllocation,
  totalCapital,
  setTotalCapital,
  currency,
  onRunAiAnalysis,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('all_weather_classic');
  const [lockedPillars, setLockedPillars] = useState<{ [key: string]: boolean }>({});

  const formatMoney = (val: number) => {
    return currency === 'EUR'
      ? `${val.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
      : `$ ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const totalPercentage = allocation.gold + allocation.stocks + allocation.longBonds + allocation.cash + allocation.bitcoin;
  const is100Percent = Math.abs(totalPercentage - 100) < 0.1;

  // Pillars detail mapping based on the 4 Survival Assets
  const pillarsMeta = [
    {
      key: 'gold' as keyof PortfolioAllocation,
      label: 'A. Metais Preciosos Físicos (Ouro & Prata)',
      badge: 'Seguro Contra Colapso Monetário (10% - 15%)',
      recommended: 15,
      color: 'from-amber-500 to-yellow-600',
      bgColor: 'bg-amber-500',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
      description: 'Preserva o poder de compra quando moedas colapsam. Exige metal físico (moedas/barras 1 oz) guardado em cofre seguro.',
      examples: 'Moedas de 1 oz (American Eagles), Barras de Ouro Físico, Prata',
    },
    {
      key: 'stocks' as keyof PortfolioAllocation,
      label: 'B. Empresas com "Pricing Power"',
      badge: 'Repasse de Inflação (30% - 35%)',
      recommended: 35,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-500',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      description: 'Bens essenciais e marcas fortes (consumo básico, utilidades, saúde) que sobem preços sem perder clientes.',
      examples: 'Dividend Aristocrats (25+ anos de dividendos), Coca-Cola, P&G, JNJ',
    },
    {
      key: 'cash' as keyof PortfolioAllocation,
      label: 'C. Tesouro de Curto Prazo & Cash',
      badge: 'Munição & Opcionalidade de Compra (20% - 25%)',
      recommended: 35,
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-500',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      description: 'Protege o capital com rendimento e dá "opcionalidade" para comprar ativos de alta qualidade a preço de saldo no pânico.',
      examples: 'ETFs de T-Bills (SGOV, BIL), Fundos do Mercado Monetário',
    },
    {
      key: 'longBonds' as keyof PortfolioAllocation,
      label: 'D. Ativos Reais Produtivos',
      badge: 'Tangíveis (Comida, Abrigo & Energia) (10% - 15%)',
      recommended: 15,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-500',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      description: 'Bens tangíveis essenciais para a vida: terras agrícolas (comida) e imobiliário residencial para arrendamento.',
      examples: 'REITs Agrícolas (LAND, FPI), REITs Residenciais/Comerciais (VNQ)',
    },
    {
      key: 'bitcoin' as keyof PortfolioAllocation,
      label: 'E. Cripto / Bitcoin (Opcional)',
      badge: 'Escassez Digital Complementar',
      recommended: 0,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-500',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-400',
      description: 'Ativo complementar com escassez matemática para diversificação moderna.',
      examples: 'BTC, ETFs de Cripto, MSTR, STRC, STRF',
    },
  ];

  const handleSliderChange = (key: keyof PortfolioAllocation, val: number) => {
    const newAlloc = { ...allocation, [key]: val };
    setAllocation(newAlloc);
  };

  const handleApplyPreset = (preset: PresetStrategy) => {
    setSelectedPreset(preset.id);
    setAllocation({ ...preset.allocation });
  };

  const handleNormalize100 = () => {
    if (totalPercentage === 0) return;
    const factor = 100 / totalPercentage;
    setAllocation({
      gold: Math.round(allocation.gold * factor),
      stocks: Math.round(allocation.stocks * factor),
      longBonds: Math.round(allocation.longBonds * factor),
      cash: Math.round(allocation.cash * factor),
      bitcoin: Math.round(allocation.bitcoin * factor),
    });
  };

  return (
    <div id="portfolio-calculator-section" className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white font-serif">Simulador Prático & Rebalanceamento</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Defina o montante total para calcular exatamente o valor em dinheiro a aportar em cada pilar da carteira de Ray Dalio.
          </p>
        </div>

        {/* AI Callout button */}
        {onRunAiAnalysis && (
          <button
            id="btn-trigger-ai-analysis"
            onClick={onRunAiAnalysis}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Análise IA Ray Dalio</span>
          </button>
        )}
      </div>

      {/* Capital Input Bar & Preset Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Capital Input Card */}
        <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
            Património Total para Investimento
          </label>
          <div className="relative mb-3">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
              {currency === 'EUR' ? '€' : '$'}
            </span>
            <input
              id="input-total-capital"
              type="number"
              min="1000"
              step="1000"
              value={totalCapital}
              onChange={(e) => setTotalCapital(Math.max(0, Number(e.target.value)))}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white font-bold text-lg sm:text-xl focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* Quick Capital Selectors */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Atalhos:</span>
            {[1000, 10000, 50000, 100000, 500000, 1000000].map((val) => (
              <button
                key={val}
                onClick={() => setTotalCapital(val)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition ${
                  totalCapital === val
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {currency === 'EUR' ? `${(val / 1000)}k €` : `$ ${(val / 1000)}k`}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Strategies Selection */}
        <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
            Estratégias Pré-Definidas (Modelos Ray Dalio)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_STRATEGIES.map((preset) => {
              const isSelected = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`text-left p-3 rounded-xl border transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold text-xs text-amber-300 mb-1">
                    <span>{preset.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {preset.riskProfile}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{preset.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sliders & Weight Distribution */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-200">Ajuste de Porcentagem dos Pilares</h3>
          </div>

          <div className="flex items-center gap-3">
            {!is100Percent && (
              <button
                onClick={handleNormalize100}
                className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold rounded-lg transition"
              >
                Ajustar para 100%
              </button>
            )}
            <div
              className={`px-3 py-1 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 ${
                is100Percent
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {is100Percent ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              <span>Total: {totalPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {pillarsMeta.map((pillar) => {
            const currentWeight = allocation[pillar.key];
            const calculatedAmount = (totalCapital * currentWeight) / 100;

            return (
              <div
                key={pillar.key}
                className={`bg-slate-950/80 border ${pillar.borderColor} rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/50 transition`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${pillar.textColor}`}>{pillar.label}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Meta: {pillar.recommended}%</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mb-3">{pillar.badge}</div>

                  {/* Percentage Number Display */}
                  <div className="flex items-baseline justify-between mb-2 font-mono">
                    <span className="text-2xl font-extrabold text-white">{currentWeight}%</span>
                    <span className="text-xs font-semibold text-emerald-400">{formatMoney(calculatedAmount)}</span>
                  </div>

                  {/* Range Slider */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={currentWeight}
                    onChange={(e) => handleSliderChange(pillar.key, Number(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer mb-3"
                  />
                </div>

                <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-900">
                  <strong className="text-slate-400">Exemplos:</strong> {pillar.examples}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practical Allocation & Rebalancing Table */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Plano de Aporte e Distribuição Prática</h3>
          </div>
          <span className="text-xs text-slate-400">Visão Prática de Compras por Pilar</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Pilar de Investimento</th>
                <th className="py-3 px-4 font-mono text-center">% Atual</th>
                <th className="py-3 px-4 font-mono text-right">Valor em Dinheiro</th>
                <th className="py-3 px-4 text-left">Função no Ecossistema Ray Dalio</th>
                <th className="py-3 px-4 text-right">Ação Recomendada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {pillarsMeta.map((pillar) => {
                const weight = allocation[pillar.key];
                const amount = (totalCapital * weight) / 100;
                const recWeight = pillar.recommended;
                const diff = weight - recWeight;

                return (
                  <tr key={pillar.key} className="hover:bg-slate-900/40 transition">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${pillar.bgColor}`} />
                      <span>{pillar.label}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-center font-bold text-slate-200">
                      {weight}%
                    </td>
                    <td className="py-3 px-4 font-mono text-right font-extrabold text-emerald-400">
                      {formatMoney(amount)}
                    </td>
                    <td className="py-3 px-4 text-slate-400 max-w-xs">
                      {pillar.description}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold">
                      {diff === 0 ? (
                        <span className="text-slate-400">Em Equilíbrio</span>
                      ) : diff > 0 ? (
                        <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          Excesso (+{diff}%)
                        </span>
                      ) : (
                        <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Aportar ({diff}%)
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-900/90 font-bold border-t border-slate-800">
              <tr>
                <td className="py-3 px-4 text-white">TOTAL DA CARTEIRA</td>
                <td className="py-3 px-4 font-mono text-center text-amber-400">{totalPercentage}%</td>
                <td className="py-3 px-4 font-mono text-right text-emerald-400 text-sm">
                  {formatMoney(totalCapital)}
                </td>
                <td colSpan={2} className="py-3 px-4 text-right text-slate-400 font-normal">
                  {is100Percent
                    ? '100% do patrimônio devidamente alocado conforme sua simulação.'
                    : '⚠️ Ajuste os sliders para somar exatamente 100%.'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
