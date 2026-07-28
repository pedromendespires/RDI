import React, { useState } from 'react';
import { PortfolioAllocation, Currency } from '../types';
import { Sparkles, Bot, Send, ShieldCheck, AlertCircle, RefreshCw, FileText } from 'lucide-react';

interface GeminiAiAnalystProps {
  allocation: PortfolioAllocation;
  totalCapital: number;
  currency: Currency;
}

export const GeminiAiAnalyst: React.FC<GeminiAiAnalystProps> = ({ allocation, totalCapital, currency }) => {
  const [analysisText, setAnalysisText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userQuery, setUserQuery] = useState<string>('');
  const [macroScenario, setMacroScenario] = useState<string>('Emissão Monetária e Risco de Estagflação (Ciclo de 18 Meses)');

  const handleGenerateAnalysis = async (customPrompt?: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portfolio: allocation,
          totalCapital,
          currency,
          macroScenario,
          prompt: customPrompt || userQuery || 'Elabore um diagnóstico completo do meu risco macro para os próximos 18 meses.',
        }),
      });

      const data = await res.json();
      if (data.analysis) {
        setAnalysisText(data.analysis);
      } else if (data.error) {
        setAnalysisText(`⚠️ **Erro na Comunicação com a IA**: ${data.error}`);
      }
    } catch (err: any) {
      setAnalysisText('⚠️ Não foi possível estabelecer ligação ao servidor de IA neste momento. Verifique a sua ligação e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="gemini-ai-analyst-section" className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white font-serif">Dalio Macro AI Specialist</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Gemini 3.6 Flash
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Analista de Inteligência Artificial treinado nos princípios de Macroeconomia, Ciclos de Dívida e All-Weather de Ray Dalio.
            </p>
          </div>
        </div>

        <button
          id="btn-generate-ai-report"
          onClick={() => handleGenerateAnalysis()}
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analisando Cenário Global...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Gerar Diagnóstico da Carteira</span>
            </>
          )}
        </button>
      </div>

      {/* Scenario & Question Prompt Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 relative z-10">
        <div className="md:col-span-5">
          <label className="text-[11px] font-semibold text-slate-300 block mb-1">Cenário Preocupante de Teste</label>
          <select
            value={macroScenario}
            onChange={(e) => setMacroScenario(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-amber-300 font-medium focus:border-amber-500 focus:outline-none"
          >
            <option value="Impressão Monetária e Risco de Estagflação (Ciclo de 18 Meses)">
              1. Impressão Monetária & Estagflação (Ciclo 18M)
            </option>
            <option value="Aumento de Juros Globais e Contração de Crédito">
              2. Juros Globais & Contração de Crédito
            </option>
            <option value="Desvalorização do Dólar e Geopolítica Bipolar">
              3. Desvalorização do Dólar & Conflito Geopolítico
            </option>
            <option value="Crescimento Acelerado e Tech Rally">
              4. Aceleração Tech & Boom de Produtividade
            </option>
          </select>
        </div>

        <div className="md:col-span-7">
          <label className="text-[11px] font-semibold text-slate-300 block mb-1">Pergunta Específica ao Dalio AI (Opcional)</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Ex: Como é que o Ouro me protege se o governo continuar a emitir moeda?"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateAnalysis()}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
            <button
              onClick={() => handleGenerateAnalysis()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-amber-400 hover:text-amber-200 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Output Report Display */}
      {analysisText ? (
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 text-xs text-slate-300 leading-relaxed font-sans space-y-3 relative z-10 max-h-[450px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-amber-400 font-bold text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Relatório de Diagnóstico Estrutural Dalio All-Weather</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Gerado via Gemini 3.6 Flash</span>
          </div>

          <div className="prose prose-invert prose-xs max-w-none whitespace-pre-wrap font-sans">
            {analysisText}
          </div>
        </div>
      ) : (
        <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-8 text-center text-slate-400 relative z-10 flex flex-col items-center justify-center gap-2">
          <Bot className="w-8 h-8 text-slate-600 animate-bounce" />
          <p className="text-xs font-medium text-slate-300">
            Clique no botão <strong>"Gerar Diagnóstico da Carteira"</strong> acima para receber um relatório detalhado em tempo real sobre o seu património.
          </p>
          <span className="text-[11px] text-slate-500">
            O Dalio AI avaliará o seu equilíbrio dos 4 pilares face ao ciclo de dívida global dos próximos 18 meses.
          </span>
        </div>
      )}
    </div>
  );
};
