import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';
import { PortfolioAllocation, HistoricalDataPoint, Currency } from '../types';
import { GENERATE_HISTORICAL_PERFORMANCE } from '../data/dalioModelData';
import { LineChart as ChartIcon, PieChart as PieIcon, ShieldAlert, Activity, RefreshCw } from 'lucide-react';

interface RealTimeChartsProps {
  allocation: PortfolioAllocation;
  currency: Currency;
  totalCapital: number;
}

export const RealTimeCharts: React.FC<RealTimeChartsProps> = ({ allocation, currency, totalCapital }) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'assets' | 'allocation' | 'risk'>('comparison');
  const [timeRange, setTimeRange] = useState<'1Y' | '3Y' | 'ALL'>('ALL');

  const historicalData = GENERATE_HISTORICAL_PERFORMANCE();

  // Filter historical data according to timeRange
  const filteredData = React.useMemo(() => {
    if (timeRange === '1Y') return historicalData.slice(-12);
    if (timeRange === '3Y') return historicalData.slice(-36);
    return historicalData;
  }, [historicalData, timeRange]);

  // Dynamic user portfolio trajectory calculation based on custom weights
  const customTrajectoryData = React.useMemo(() => {
    return filteredData.map((point) => {
      // Calculate weighted portfolio index starting from 100
      const userVal =
        (point.gold * allocation.gold) / 100 +
        (point.stocks * allocation.stocks) / 100 +
        (point.longBonds * allocation.longBonds) / 100 +
        (point.cash * allocation.cash) / 100 +
        (point.bitcoin * allocation.bitcoin) / 100;

      return {
        ...point,
        suaCarteira: Number(userVal.toFixed(1)),
        suaCarteiraValor: Math.round((totalCapital * userVal) / 100),
      };
    });
  }, [filteredData, allocation, totalCapital]);

  // Data for Pie chart
  const pieData = [
    { name: 'Metais Preciosos (Ouro/Prata)', value: allocation.gold, color: '#f59e0b' },
    { name: 'Empresas Pricing Power', value: allocation.stocks, color: '#3b82f6' },
    { name: 'Ativos Reais Produtivos (REITs/Terras)', value: allocation.longBonds, color: '#10b981' },
    { name: 'Tesouro Curto Prazo & Cash', value: allocation.cash, color: '#a855f7' },
    { name: 'Bitcoin', value: allocation.bitcoin, color: '#f97316' },
  ].filter((item) => item.value > 0);

  // Risk / Drawdown comparison data
  const riskMetricsData = [
    { name: 'Carteira Dalio (Sua Alocação)', drawdown: -9.8, Sharpe: 1.45, Volatilidade: 8.2 },
    { name: 'Ações 100% S&P 500', drawdown: -24.5, Sharpe: 0.85, Volatilidade: 17.5 },
    { name: 'Depósito a Prazo / Liquidez', drawdown: -0.1, Sharpe: 0.20, Volatilidade: 0.8 },
    { name: 'Carteira 60/40 Tradicional', drawdown: -18.2, Sharpe: 0.92, Volatilidade: 12.1 },
  ];

  const formatCurrency = (val: number) => {
    return currency === 'EUR' ? `${val.toLocaleString('pt-PT')} €` : `$ ${val.toLocaleString('en-US')}`;
  };

  return (
    <div id="realtime-charts-section" className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-sm">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white font-serif">Análise Gráfica & Performance Histórica</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Acompanhe o comportamento da sua carteira em tempo real e em simulações do ecossistema econômico global.
          </p>
        </div>

        {/* Time range selector */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 border border-slate-800 rounded-xl">
          <span className="text-[10px] text-slate-400 font-medium px-2">Período:</span>
          {(['1Y', '3Y', 'ALL'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                timeRange === range ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {range === 'ALL' ? 'Completo' : range}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-800/80 pb-2">
        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-3 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
            activeTab === 'comparison'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <ChartIcon className="w-4 h-4" />
          <span>Sua Carteira vs. Mercado</span>
        </button>

        <button
          onClick={() => setActiveTab('assets')}
          className={`px-3 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
            activeTab === 'assets'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Trajetória dos 4 Ativos</span>
        </button>

        <button
          onClick={() => setActiveTab('allocation')}
          className={`px-3 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
            activeTab === 'allocation'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <PieIcon className="w-4 h-4" />
          <span>Divisão Percentual</span>
        </button>

        <button
          onClick={() => setActiveTab('risk')}
          className={`px-3 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
            activeTab === 'risk'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Proteção em Crises & Volatilidade</span>
        </button>
      </div>

      {/* CHART CONTENT VIEWS */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-6 min-h-[380px]">
        {/* Tab 1: Comparison */}
        {activeTab === 'comparison' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Retorno Acumulado (Base 100)</h3>
                <p className="text-xs text-slate-400">Comparativo entre a Sua Carteira Dalio, 100% S&P 500 e Euribor/Inflação</p>
              </div>
              <div className="text-right font-mono text-xs hidden sm:block">
                <span className="text-slate-400">Património Simulado Final: </span>
                <strong className="text-emerald-400 font-extrabold text-sm">
                  {formatCurrency(customTrajectoryData[customTrajectoryData.length - 1]?.suaCarteiraValor || totalCapital)}
                </strong>
              </div>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={customTrajectoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCarteira" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                    labelStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Area
                    type="monotone"
                    dataKey="suaCarteira"
                    name="A Sua Carteira Personalizada"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorCarteira)"
                  />
                  <Line
                    type="monotone"
                    dataKey="sp500"
                    name="Ações 100% S&P 500"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="cdiInflation"
                    name="Benchmark Euribor / Inflação"
                    stroke="#a855f7"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 2: Individual Assets */}
        {activeTab === 'assets' && (
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white">Trajetória dos 4 Pilares + Bitcoin</h3>
              <p className="text-xs text-slate-400">Observe como Ouro, Títulos e Ações se compensam mutuamente durante ciclos do mercado</p>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customTrajectoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="gold" name="Metais Preciosos Físicos" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="stocks" name="Empresas Pricing Power" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="longBonds" name="Ativos Reais Produtivos" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="cash" name="Tesouro Curto Prazo & Cash" stroke="#a855f7" strokeWidth={1.5} dot={false} />
                  {allocation.bitcoin > 0 && (
                    <Line type="monotone" dataKey="bitcoin" name="Bitcoin" stroke="#f97316" strokeWidth={2} dot={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 3: Allocation Pie */}
        {activeTab === 'allocation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="h-[280px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white mb-2">Composição Atual da sua Carteira</h3>
              {pieData.map((item) => {
                const amount = (totalCapital * item.value) / 100;
                return (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-semibold text-slate-200">{item.name}</span>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="font-bold text-amber-400 mr-2">{item.value}%</span>
                      <span className="text-emerald-400 font-bold">{formatCurrency(amount)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Risk & Drawdown */}
        {activeTab === 'risk' && (
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white">Resistência em Quedas e Volatilidade</h3>
              <p className="text-xs text-slate-400">
                O modelo de Ray Dalio foi desenhado para mitigar até 70% da queda máxima durante crises severas no mercado financeiro.
              </p>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskMetricsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="drawdown" name="Drawdown Máximo (%)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Volatilidade" name="Volatilidade Anual (%)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
