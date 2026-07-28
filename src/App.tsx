import React, { useState, useEffect, useCallback } from 'react';
import { PortfolioAllocation, Currency, MarketDataResponse } from './types';
import { Header } from './components/Header';
import { MarketTicker } from './components/MarketTicker';
import { PortfolioCalculator } from './components/PortfolioCalculator';
import { RealTimeCharts } from './components/RealTimeCharts';
import { SeasonStressTester } from './components/SeasonStressTester';
import { AssetManager } from './components/AssetManager';
import { GeminiAiAnalyst } from './components/GeminiAiAnalyst';
import { TransitionRoadmap } from './components/TransitionRoadmap';
import { DalioPrinciplesModal } from './components/DalioPrinciplesModal';
import { ShieldCheck, Activity, Layers, Bot, Compass, Calendar, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('BRL');
  const [totalCapital, setTotalCapital] = useState<number>(100000);
  const [isPrinciplesOpen, setIsPrinciplesOpen] = useState<boolean>(false);
  const [marketData, setMarketData] = useState<MarketDataResponse | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeMainSection, setActiveMainSection] = useState<'calculator' | 'charts' | 'seasons' | 'roadmap' | 'assets' | 'ai'>('calculator');

  // Allocation state (4 Survival Assets default recommendation)
  const [allocation, setAllocation] = useState<PortfolioAllocation>({
    gold: 15,
    stocks: 35,
    cash: 35,
    longBonds: 15,
    bitcoin: 0,
  });

  // Fetch real-time market ticker data from Express server endpoint
  const fetchMarketData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/market-data');
      if (res.ok) {
        const data = await res.json();
        setMarketData(data);
      }
    } catch (err) {
      console.error('Failed to fetch market data feed:', err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchMarketData();
    // Poll every 15 seconds for live simulation updates
    const interval = setInterval(fetchMarketData, 15000);
    return () => clearInterval(interval);
  }, [fetchMarketData]);

  // Callback when user updates holdings in AssetManager
  const handleUpdateAggregatedAllocation = useCallback((calcAlloc: PortfolioAllocation, totalVal: number) => {
    setAllocation(calcAlloc);
    if (totalVal > 0) {
      setTotalCapital(totalVal);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950 flex flex-col">
      {/* Header */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
        onOpenPrinciples={() => setIsPrinciplesOpen(true)}
        onRefreshData={fetchMarketData}
        isRefreshing={isRefreshing}
        totalCapital={totalCapital}
      />

      {/* Real-time Market Ticker Bar */}
      <MarketTicker marketData={marketData} currency={currency} />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Navigation Quick Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs no-scrollbar">
          <button
            onClick={() => { setActiveMainSection('calculator'); scrollToSection('portfolio-calculator-section'); }}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeMainSection === 'calculator'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Simulador & Rebalanceamento</span>
          </button>

          <button
            onClick={() => { setActiveMainSection('charts'); scrollToSection('realtime-charts-section'); }}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeMainSection === 'charts'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Gráficos & Performance</span>
          </button>

          <button
            onClick={() => { setActiveMainSection('seasons'); scrollToSection('season-stress-tester-section'); }}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeMainSection === 'seasons'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>4 Estações Económicas</span>
          </button>

          <button
            onClick={() => { setActiveMainSection('roadmap'); scrollToSection('transition-roadmap-section'); }}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeMainSection === 'roadmap'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Processo de Transição (3-12M)</span>
          </button>

          <button
            onClick={() => { setActiveMainSection('assets'); scrollToSection('asset-manager-section'); }}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeMainSection === 'assets'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Ativos Registados</span>
          </button>

          <button
            onClick={() => { setActiveMainSection('ai'); scrollToSection('gemini-ai-analyst-section'); }}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeMainSection === 'ai'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Analista Dalio IA</span>
          </button>
        </div>

        {/* Section 1: Portfolio Calculator & Rebalancing */}
        <PortfolioCalculator
          allocation={allocation}
          setAllocation={setAllocation}
          totalCapital={totalCapital}
          setTotalCapital={setTotalCapital}
          currency={currency}
          onRunAiAnalysis={() => {
            setActiveMainSection('ai');
            scrollToSection('gemini-ai-analyst-section');
          }}
        />

        {/* Section 2: Real-time Charts & Performance Backtest */}
        <RealTimeCharts
          allocation={allocation}
          currency={currency}
          totalCapital={totalCapital}
        />

        {/* Section 3: Ray Dalio 4 Economic Seasons Stress Tester */}
        <SeasonStressTester allocation={allocation} />

        {/* Section 4: Transition Roadmap (3-12 Months) */}
        <TransitionRoadmap />

        {/* Section 5: Individual Assets Logger */}
        <AssetManager
          currency={currency}
          onUpdateAggregatedAllocation={handleUpdateAggregatedAllocation}
        />

        {/* Section 5: Gemini AI Portfolio Analyst */}
        <GeminiAiAnalyst
          allocation={allocation}
          totalCapital={totalCapital}
          currency={currency}
        />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto space-y-3">
          <p className="text-slate-300 font-serif font-bold text-sm">
            Carteira Ray Dalio - Aplicação Prática & Gestão Macro
          </p>
          <p className="max-w-2xl mx-auto text-slate-500 text-[11px] leading-relaxed">
            Esta ferramenta tem caráter estritamente educativo e analítico baseada na filosofia de investimentos All-Weather e Ciclos de Dívida de Ray Dalio (Bridgewater Associates). Não constitui recomendação de compra ou venda de ativos financeiros.
          </p>
          <div className="text-slate-600 text-[10px]">
            Powered by Google AI Studio Build & Gemini 3.6 Flash
          </div>
        </div>
      </footer>

      {/* Principles Explanation Modal */}
      <DalioPrinciplesModal
        isOpen={isPrinciplesOpen}
        onClose={() => setIsPrinciplesOpen(false)}
      />
    </div>
  );
}
