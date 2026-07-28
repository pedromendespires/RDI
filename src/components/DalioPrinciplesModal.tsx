import React from 'react';
import { DALIO_KEY_PRINCIPLES } from '../data/dalioModelData';
import { X, ShieldCheck, Hourglass, Landmark, TrendingDown, BookOpen, ExternalLink, AlertOctagon } from 'lucide-react';

interface DalioPrinciplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DalioPrinciplesModal: React.FC<DalioPrinciplesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Hourglass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 bg-amber-500/10 rounded">
              Tese dos 4 Ativos de Sobrevivência
            </span>
            <h2 className="text-xl font-bold font-serif text-white mt-1">
              Os 4 Ativos que Preservam Valor nas Crises
            </h2>
          </div>
        </div>

        {/* Video Context Alert Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 space-y-2 text-xs text-amber-200/90 leading-relaxed">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <span>Regra de Ouro da Alocação</span>
          </div>
          <p>
            Segundo a fonte, apenas quatro tipos específicos de investimentos preservam valor durante estas crises. A recomendação é alocar entre <strong>70% a 90% do teu portfólio</strong> nestas quatro categorias principais.
          </p>
        </div>

        {/* The 4 Essential Survival Assets */}
        <div className="space-y-4 mb-6">
          <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between font-bold text-sm text-amber-400 mb-2">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">A</span>
                A. Metais Preciosos Físicos (Ouro e Prata)
              </span>
              <span className="text-xs font-mono bg-amber-500/10 px-2 py-0.5 rounded text-amber-300">10% a 15%</span>
            </div>
            <p className="text-xs text-slate-300 mb-2 leading-relaxed">
              <strong>A lógica:</strong> O ouro não é um investimento para lucro imediato, é um seguro. Quando as moedas colapsam ou perdem valor, o ouro mantém o seu poder de compra.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <strong>Como fazer:</strong> Deves possuir o metal físico (moedas de 1 oz como American Eagles ou barras) e não "papel ouro" (ETFs ou ações de minas). Compra em revendedores respeitáveis e guarda num cofre seguro.
            </p>
          </div>

          <div className="bg-slate-950 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between font-bold text-sm text-blue-400 mb-2">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">B</span>
                B. Empresas com "Pricing Power" (Poder de Fixação de Preços)
              </span>
              <span className="text-xs font-mono bg-blue-500/10 px-2 py-0.5 rounded text-blue-300">30% a 35%</span>
            </div>
            <p className="text-xs text-slate-300 mb-2 leading-relaxed">
              <strong>A lógica:</strong> Em períodos de inflação alta, empresas que vendem bens essenciais e têm marcas fortes conseguem aumentar os preços sem perder clientes, repassando a inflação para o consumidor.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <strong>Exemplos & Como encontrar:</strong> Bens de consumo básico (Coca-Cola, higiene), serviços públicos (eletricidade) e saúde. Procura os <em>"Dividend Aristocrats"</em> — empresas que aumentaram os dividendos consecutivamente durante 25+ anos.
            </p>
          </div>

          <div className="bg-slate-950 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between font-bold text-sm text-purple-400 mb-2">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">C</span>
                C. Títulos do Tesouro de Curto Prazo e Dinheiro (Cash)
              </span>
              <span className="text-xs font-mono bg-purple-500/10 px-2 py-0.5 rounded text-purple-300">20% a 25%</span>
            </div>
            <p className="text-xs text-slate-300 mb-2 leading-relaxed">
              <strong>A lógica & utilidade:</strong> Protege o teu capital, paga juros e é a tua munição. Dá-te "opcionalidade": quando a crise bater e todos venderem em pânico, terás liquidez para comprar ativos de alta qualidade a preço de saldo.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <strong>Como fazer:</strong> Através de ETFs que detêm dívida de curtíssimo prazo (como o símbolo <strong>SGOV</strong> ou <strong>BIL</strong>) ou fundos do mercado monetário.
            </p>
          </div>

          <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between font-bold text-sm text-emerald-400 mb-2">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">D</span>
                D. Ativos Reais Produtivos
              </span>
              <span className="text-xs font-mono bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-300">10% a 15%</span>
            </div>
            <p className="text-xs text-slate-300 mb-2 leading-relaxed">
              <strong>A lógica:</strong> Coisas tangíveis que as pessoas precisam para viver, independentemente do valor do dinheiro: comida, abrigo e energia (terras agrícolas e imobiliário residencial para arrendamento).
            </p>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <strong>Como fazer:</strong> Através de REITs (Fundos de Investimento Imobiliário) focados em terras agrícolas (ex: símbolo <strong>LAND</strong>) ou imobiliário residencial (ex: símbolo <strong>O</strong> ou <strong>VNQ</strong>).
            </p>
          </div>
        </div>

        {/* Close button bottom */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <a
            href="https://www.youtube.com/watch?v=10tguSGL6QU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition underline font-medium"
          >
            <span>Assistir ao Vídeo Original de Ray Dalio (YouTube)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition"
          >
            Entendido, Ir Para a Minha Carteira
          </button>
        </div>
      </div>
    </div>
  );
};
