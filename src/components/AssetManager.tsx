import React, { useState, useEffect, useRef } from 'react';
import { UserAssetItem, Currency, PortfolioAllocation } from '../types';
import { Layers, Plus, Trash2, Edit2, Check, DollarSign, Wallet, ArrowUpRight, Save } from 'lucide-react';

interface AssetManagerProps {
  currency: Currency;
  onUpdateAggregatedAllocation: (alloc: PortfolioAllocation, totalVal: number) => void;
}

const DEFAULT_SAMPLE_ASSETS: UserAssetItem[] = [
  {
    id: 'asset-1',
    pillarKey: 'gold',
    ticker: 'American Eagles / Moedas Ouro 1 oz',
    name: 'Ouro Físico (Moedas de 1 oz em Cofre)',
    quantity: 10,
    avgPrice: 2100.00,
    currentPrice: 2450.00,
    notes: 'Seguro físico contra o colapso de moedas fiduciárias',
  },
  {
    id: 'asset-2',
    pillarKey: 'stocks',
    ticker: 'Coca-Cola (KO) / P&G (PG)',
    name: 'Dividend Aristocrats (Pricing Power)',
    quantity: 150,
    avgPrice: 55.00,
    currentPrice: 68.00,
    notes: 'Empresas com marcas fortes que repassam a inflação',
  },
  {
    id: 'asset-3',
    pillarKey: 'cash',
    ticker: 'SGOV / BIL (T-Bills)',
    name: 'iShares 0-3 Month Treasury Bond ETF',
    quantity: 250,
    avgPrice: 100.00,
    currentPrice: 100.50,
    notes: 'Munição em caixa para opcionalidade de compra no pânico',
  },
  {
    id: 'asset-4',
    pillarKey: 'longBonds',
    ticker: 'LAND / Realty Income (O)',
    name: 'Gladstone Land / REITs Agrícolas e Residenciais',
    quantity: 300,
    avgPrice: 14.00,
    currentPrice: 16.50,
    notes: 'Ativos reais produtivos: terras agrícolas (comida) e abrigo',
  },
];

export const AssetManager: React.FC<AssetManagerProps> = ({ currency, onUpdateAggregatedAllocation }) => {
  const [assets, setAssets] = useState<UserAssetItem[]>(() => {
    const saved = localStorage.getItem('ray_dalio_user_assets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_SAMPLE_ASSETS;
      }
    }
    return DEFAULT_SAMPLE_ASSETS;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newAsset, setNewAsset] = useState<Omit<UserAssetItem, 'id'>>({
    pillarKey: 'gold',
    ticker: '',
    name: '',
    quantity: 0,
    avgPrice: 0,
    currentPrice: 0,
    notes: '',
  });

  const isInitialMount = useRef(true);

  // Save assets to localStorage and recalculate portfolio pillar allocation
  useEffect(() => {
    localStorage.setItem('ray_dalio_user_assets', JSON.stringify(assets));

    // Não sobrescrever a alocação nem o capital inicial da calculadora no arranque da aplicação
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Calculate aggregated value per pillar
    let goldTotal = 0;
    let stocksTotal = 0;
    let longBondsTotal = 0;
    let cashTotal = 0;
    let bitcoinTotal = 0;

    assets.forEach((a) => {
      const value = a.quantity * a.currentPrice;
      if (a.pillarKey === 'gold') goldTotal += value;
      else if (a.pillarKey === 'stocks') stocksTotal += value;
      else if (a.pillarKey === 'longBonds') longBondsTotal += value;
      else if (a.pillarKey === 'cash') cashTotal += value;
      else if (a.pillarKey === 'bitcoin') bitcoinTotal += value;
    });

    const grandTotal = goldTotal + stocksTotal + longBondsTotal + cashTotal + bitcoinTotal;

    if (grandTotal > 0) {
      const calcAlloc: PortfolioAllocation = {
        gold: Math.round((goldTotal / grandTotal) * 100),
        stocks: Math.round((stocksTotal / grandTotal) * 100),
        longBonds: Math.round((longBondsTotal / grandTotal) * 100),
        cash: Math.round((cashTotal / grandTotal) * 100),
        bitcoin: Math.round((bitcoinTotal / grandTotal) * 100),
      };

      onUpdateAggregatedAllocation(calcAlloc, Math.round(grandTotal));
    }
  }, [assets, onUpdateAggregatedAllocation]);

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.ticker || newAsset.quantity <= 0 || newAsset.currentPrice <= 0) return;

    const item: UserAssetItem = {
      ...newAsset,
      id: `asset-${Date.now()}`,
    };

    setAssets([...assets, item]);
    setIsAdding(false);
    setNewAsset({
      pillarKey: 'gold',
      ticker: '',
      name: '',
      quantity: 0,
      avgPrice: 0,
      currentPrice: 0,
      notes: '',
    });
  };

  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter((a) => a.id !== id));
  };

  const formatMoney = (val: number) => {
    return currency === 'EUR'
      ? `${val.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
      : `$ ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getPillarLabel = (key: string) => {
    switch (key) {
      case 'gold':
        return 'A. Metais Preciosos Físicos (Ouro/Prata)';
      case 'stocks':
        return 'B. Empresas com Pricing Power';
      case 'cash':
        return 'C. Tesouro Curto Prazo & Cash';
      case 'longBonds':
        return 'D. Ativos Reais Produtivos (REITs/Terras)';
      case 'bitcoin':
        return 'E. Cripto / Bitcoin (Opcional)';
      default:
        return key;
    }
  };

  const totalPortfolioVal = assets.reduce((acc, a) => acc + a.quantity * a.currentPrice, 0);

  return (
    <div id="asset-manager-section" className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white font-serif">Registo de Ativos Individuais</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Registe os seus títulos reais da carteira (Ações, ETFs, Obrigações do Tesouro, Cripto). A aplicação consolida tudo automaticamente nos 4 pilares de Dalio.
          </p>
        </div>

        <button
          id="btn-add-asset-toggle"
          onClick={() => setIsAdding(!isAdding)}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Registar Novo Ativo</span>
        </button>
      </div>

      {/* New Asset Form */}
      {isAdding && (
        <form onSubmit={handleAddAsset} className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 mb-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold uppercase text-amber-300">Novo Ativo na Carteira</h3>
            <span className="text-[10px] text-slate-400">Preencha os dados do papel</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-[11px] text-slate-300 font-semibold block mb-1">Pilar Ray Dalio</label>
              <select
                value={newAsset.pillarKey}
                onChange={(e) => setNewAsset({ ...newAsset, pillarKey: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              >
                <option value="gold">A. Metais Preciosos Físicos (Ouro e Prata)</option>
                <option value="stocks">B. Empresas com Pricing Power (Dividend Aristocrats)</option>
                <option value="cash">C. Tesouro de Curto Prazo & Cash (SGOV, BIL)</option>
                <option value="longBonds">D. Ativos Reais Produtivos (REITs, Terras)</option>
                <option value="bitcoin">E. Cripto / Bitcoin (Opcional)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-300 font-semibold block mb-1">Ticker / Código (ex: GLD, GOLD11)</label>
              <input
                type="text"
                required
                placeholder="Ex: IVVB11"
                value={newAsset.ticker}
                onChange={(e) => setNewAsset({ ...newAsset, ticker: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-300 font-semibold block mb-1">Quantidade Posicionada</label>
              <input
                type="number"
                step="any"
                required
                placeholder="Ex: 50"
                value={newAsset.quantity || ''}
                onChange={(e) => setNewAsset({ ...newAsset, quantity: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-300 font-semibold block mb-1">Preço Atual Mercado</label>
              <input
                type="number"
                step="any"
                required
                placeholder="Ex: 320.50"
                value={newAsset.currentPrice || ''}
                onChange={(e) => setNewAsset({ ...newAsset, currentPrice: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs"
            >
              Salvar Ativo
            </button>
          </div>
        </form>
      )}

      {/* Registered Assets Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Ticker & Nome</th>
                <th className="py-3 px-4">Pilar Corresponte</th>
                <th className="py-3 px-4 font-mono text-center">Quantidade</th>
                <th className="py-3 px-4 font-mono text-right">Preço Un.</th>
                <th className="py-3 px-4 font-mono text-right">Valor Total</th>
                <th className="py-3 px-4 font-mono text-center">% da Carteira</th>
                <th className="py-3 px-4 text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {assets.map((asset) => {
                const itemTotal = asset.quantity * asset.currentPrice;
                const weightPct = totalPortfolioVal > 0 ? ((itemTotal / totalPortfolioVal) * 100).toFixed(1) : '0';

                return (
                  <tr key={asset.id} className="hover:bg-slate-900/40 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-xs">{asset.ticker}</div>
                      <div className="text-[10px] text-slate-400">{asset.name}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-amber-300">
                      {getPillarLabel(asset.pillarKey)}
                    </td>
                    <td className="py-3 px-4 font-mono text-center text-slate-200">
                      {asset.quantity}
                    </td>
                    <td className="py-3 px-4 font-mono text-right text-slate-200">
                      {formatMoney(asset.currentPrice)}
                    </td>
                    <td className="py-3 px-4 font-mono text-right font-extrabold text-emerald-400">
                      {formatMoney(itemTotal)}
                    </td>
                    <td className="py-3 px-4 font-mono text-center font-bold text-amber-400">
                      {weightPct}%
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDeleteAsset(asset.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 transition"
                        title="Remover ativo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-900 font-bold border-t border-slate-800">
              <tr>
                <td colSpan={4} className="py-3 px-4 text-white">PATRIMÓNIO REAL REGISTADO</td>
                <td className="py-3 px-4 font-mono text-right text-emerald-400 text-sm">
                  {formatMoney(totalPortfolioVal)}
                </td>
                <td className="py-3 px-4 font-mono text-center text-amber-400">100%</td>
                <td className="py-3 px-4" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
