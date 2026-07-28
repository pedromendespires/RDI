import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Trash2,
  CheckCircle2,
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Filter,
  CheckSquare,
  Square,
  VolumeX,
  Target,
  Layers,
  Award
} from 'lucide-react';

export const TransitionRoadmap: React.FC = () => {
  // Step 1: Age & Horizon State
  const [userAge, setUserAge] = useState<number>(42);
  const [yearsToRetirement, setYearsToRetirement] = useState<number>(20);

  // Calculate recommended duration in months
  const getRecommendedMonths = (age: number, years: number) => {
    if (age >= 55 || years <= 7) {
      return { months: 3, urgency: 'Urgente (3 Meses)', color: 'text-red-400', badgeBg: 'bg-red-500/20 border-red-500/30' };
    } else if (age >= 45 || years <= 15) {
      return { months: 6, urgency: 'Moderado (6 Meses)', color: 'text-amber-400', badgeBg: 'bg-amber-500/20 border-amber-500/30' };
    } else {
      return { months: 12, urgency: 'Tranquilo (12 Meses)', color: 'text-emerald-400', badgeBg: 'bg-emerald-500/20 border-emerald-500/30' };
    }
  };

  const timingRec = getRecommendedMonths(userAge, yearsToRetirement);

  // Step 2: Diagnostic Trash List State
  const [trashItems, setTrashItems] = useState([
    { id: '1', label: 'Ações especulativas / "Meme stocks" sem fundamentação', selected: true },
    { id: '2', label: 'Criptomoedas sem utilidade real ou reserva provada', selected: true },
    { id: '3', label: 'Empresas de alto crescimento que prometem muito mas só dão prejuízo', selected: true },
    { id: '4', label: 'Excesso de exposição em Fundos de Índice genéricos (Index Funds normais)', selected: false },
    { id: '5', label: 'Títulos de dívida de longo prazo sujeitos a desvalorização cambial e inflação', selected: true },
  ]);

  const toggleTrashItem = (id: string) => {
    setTrashItems(prev => prev.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  // Step 3: Month by Month Progress
  const [activeMonthTab, setActiveMonthTab] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    'm1-1': false,
    'm1-2': false,
    'm2-1': false,
    'm2-2': false,
    'm3-1': false,
    'm3-2': false,
    'm4-1': false,
    'm4-2': false,
    'm5-1': false,
    'm5-2': false,
    'm6-1': false,
  });

  const toggleStepCompleted = (key: string) => {
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalTasks = Object.keys(completedSteps).length;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  return (
    <section id="transition-roadmap-section" className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Execução Prática de Transição
            </span>
            <span className="text-xs text-slate-400">Horizonte de 3 a 12 Meses</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
            Roteiro Prático de Transição da Carteira
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Como reposicionar o teu património em <strong>4 grandes passos</strong> e num <strong>calendário mês a mês</strong> para garantir que 70% a 90% dos teus ativos fiquem protegidos contra o fim do ciclo de dívida.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-4 min-w-[200px] flex items-center gap-3">
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" className="text-slate-800" fill="transparent" />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
                className="text-amber-400 transition-all duration-500"
                fill="transparent"
                strokeDasharray={125.6}
                strokeDashoffset={125.6 - (125.6 * progressPercent) / 100}
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-amber-300">{progressPercent}%</span>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Progresso do Roteiro</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">
              {completedCount} de {totalTasks} Passos
            </div>
          </div>
        </div>
      </div>

      {/* Grid of the 4 Main Steps */}
      <div className="space-y-8">
        
        {/* PASSO 1: CALCULAR O TEU PRAZO */}
        <div id="passo-1-prazo" className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono text-sm border border-amber-500/30">
              1
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Passo 1: Calcular o Teu Prazo de Transição
                <span className="text-xs font-normal text-slate-400">(De acordo com a Idade)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Quanto mais perto estiveres de precisar do dinheiro, mais urgente é a mudança do teu património.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            {/* Interactive Inputs */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 flex justify-between">
                    <span>A tua Idade Atual:</span>
                    <strong className="text-amber-400">{userAge} anos</strong>
                  </label>
                  <input
                    type="range"
                    min={20}
                    max={75}
                    value={userAge}
                    onChange={(e) => setUserAge(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>20 anos (Jovem)</span>
                    <span>75 anos (Reforma)</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 flex justify-between">
                    <span>Anos até Precisar do Dinheiro:</span>
                    <strong className="text-amber-400">{yearsToRetirement} anos</strong>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={35}
                    value={yearsToRetirement}
                    onChange={(e) => setYearsToRetirement(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>1 ano (Urgente)</span>
                    <span>35 anos (Longo Prazo)</span>
                  </div>
                </div>
              </div>

              {/* Explanatory cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>Perfil Jovem (~35 anos)</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Faltando 20-25+ anos para a reforma, tens tempo para fazer este reposicionamento calmamente ao longo de <strong>12 meses</strong>.
                  </p>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    <span>Perfil Sénior (~58 anos)</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Mais perto de precisar do dinheiro, deves agir mais rápido e concluir a transição em <strong>3 a 6 meses</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendation Result Card */}
            <div className={`border rounded-xl p-5 flex flex-col justify-between ${timingRec.badgeBg}`}>
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Recomendação Personalizada
                </div>
                <div className={`text-xl font-bold font-serif ${timingRec.color}`}>
                  {timingRec.urgency}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Com base nos teus {userAge} anos de idade e horizonte de {yearsToRetirement} anos, o ritmo ideal para reestruturar o património é de <strong>{timingRec.months} meses</strong>.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  <span>Princípio de Ouro:</span>
                </div>
                <p>
                  "Quanto mais perto estiveres de necessitar do capital, maior é a urgência em remover o risco e proteger o poder de compra."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PASSO 2: VENDER O "LIXO" PRIMEIRA AÇÃO (SEMANA 1) */}
        <div id="passo-2-vender-lixo" className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold font-mono text-sm border border-red-500/30">
              2
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Passo 2: Vender o "Lixo" Primeiro
                <span className="text-xs font-semibold px-2 py-0.5 bg-red-500/20 text-red-300 rounded border border-red-500/30">
                  Ação para a Semana 1
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                A tua primeira ação prática é "limpar a casa" antes de adquirir novos ativos.
              </p>
            </div>
          </div>

          {/* Diagnostic Question Box */}
          <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs text-red-200 space-y-1">
              <span className="font-bold text-sm block">A Pergunta de Teste Obrigatória:</span>
              <p className="italic text-slate-300">
                "Se entrarmos numa crise de dívida acompanhada de inflação alta, este investimento vai preservar o meu poder de compra real?"
              </p>
              <p className="font-bold text-red-300 pt-1">
                👉 Se a resposta for "NÃO", marca o ativo para venda imediata sem hesitação.
              </p>
            </div>
          </div>

          {/* Checklist of Trash Items */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Diagnóstico de Eliminação de Risco (Clica para testar o teu portfólio):</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {trashItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleTrashItem(item.id)}
                  className={`p-3 rounded-lg border text-left text-xs transition flex items-start gap-2.5 ${
                    item.selected
                      ? 'bg-red-500/10 border-red-500/40 text-slate-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">
                    {item.selected ? (
                      <CheckSquare className="w-4 h-4 text-red-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                  </span>
                  <div>
                    <span className={item.selected ? 'font-semibold text-white' : ''}>{item.label}</span>
                    {item.selected && (
                      <span className="block text-[10px] text-red-400 mt-0.5 font-mono">
                        [ VENDER / ELIMINAR DA CARTEIRA ]
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-xs text-amber-300/90 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Dica de Iniciante:</strong> Não tentes adivinhar o "momento perfeito" nem esperes que os preços subam para vender. Ninguém consegue prever isso; reduz a tua exposição sistematicamente.
              </span>
            </div>
          </div>
        </div>

        {/* PASSO 3: CONSTRUIR OS QUATRO BALDES (CALENDÁRIO MÊS A MÊS) */}
        <div id="passo-3-calendario" className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm border border-emerald-500/30">
                3
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Passo 3: Construir os 4 Baldes (Calendário Mês a Mês)
                </h3>
                <p className="text-xs text-slate-400">
                  Em vez de uma mudança drástica "tudo ou nada", constrói a tua segurança gradualmente mês a mês.
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2 shrink-0">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Meta Mês 6: <strong>70% a 80% protegido</strong></span>
            </div>
          </div>

          {/* Month Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-800">
            {[1, 2, 3, 4, 5, 6].map((m) => (
              <button
                key={m}
                onClick={() => setActiveMonthTab(m)}
                className={`px-4 py-2 rounded-t-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                  activeMonthTab === m
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-t border-x border-slate-800'
                }`}
              >
                <span>Mês {m}</span>
                {m === 6 && <span className="text-[10px] bg-slate-950/40 text-slate-950 px-1.5 py-0.5 rounded font-bold">Revisão</span>}
              </button>
            ))}
          </div>

          {/* Tab Content for Selected Month */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            {activeMonthTab === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Mês 1: O Início (Metais Físicos & Conta Tesouro)
                  </h4>
                  <span className="text-[11px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded">
                    Primeiro Balde
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Compra a tua primeira posição em ouro físico. Aloca apenas cerca de <strong>5% da tua carteira</strong> para começar (pode ser uma ou duas moedas de ouro para perderes o medo) e abre a tua conta no Treasury Direct / Corretora.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={!!completedSteps['m1-1']}
                      onChange={() => toggleStepCompleted('m1-1')}
                      className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Adquirir 1 a 2 Moedas de Ouro Físico (1 oz)</span>
                      <span className="text-slate-400">Moedas reconhecidas (ex: American Eagles ou Krugerrands) guardadas em cofre seguro. (~5% do total).</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={!!completedSteps['m1-2']}
                      onChange={() => toggleStepCompleted('m1-2')}
                      className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Abertura de Conta de Custódia de Títulos do Tesouro</span>
                      <span className="text-slate-400">Registar acesso na corretora ou Treasury Direct para alocar T-Bills de curto prazo nos meses seguintes.</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {activeMonthTab === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    Mês 2: Primeiras Ações com Pricing Power & Dinheiro Seguro
                  </h4>
                  <span className="text-[11px] bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded">
                    Bens Essenciais & T-Bills
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pesquisa sobre empresas sólidas (<em>"Dividend Aristocrats"</em>) e compra as tuas duas primeiras posições em "Negócios com Poder de Fixação de Preços" (ex: Procter & Gamble ou Johnson & Johnson). Move também <strong>10% do teu dinheiro vivo</strong> para Títulos do Tesouro de curto prazo (T-Bills).
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={!!completedSteps['m2-1']}
                      onChange={() => toggleStepCompleted('m2-1')}
                      className="mt-0.5 accent-blue-500 w-4 h-4 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Adquirir 2 Posições em "Pricing Power" (ex: PG, JNJ, KO)</span>
                      <span className="text-slate-400">Empresas com 25+ anos de dividendos crescentes e capacidade de repassar custos de inflação.</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={!!completedSteps['m2-2']}
                      onChange={() => toggleStepCompleted('m2-2')}
                      className="mt-0.5 accent-blue-500 w-4 h-4 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Alocar 10% do Capital em T-Bills de Curtíssimo Prazo</span>
                      <span className="text-slate-400">ETFs de liquidez como SGOV ou BIL para render juros com risco nulo.</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {activeMonthTab === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    Mês 3: Reforço em Setores Defensivos e Liquidez
                  </h4>
                  <span className="text-[11px] bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded">
                    Utilities & Saúde
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Compra mais duas empresas com poder de preço (diversificando para os setores de serviços públicos/eletricidade e saúde) e junta ainda mais dinheiro aos teus Títulos do Tesouro de curto prazo para criar a tua reserva de oportunidade.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={!!completedSteps['m3-1']}
                      onChange={() => toggleStepCompleted('m3-1')}
                      className="mt-0.5 accent-purple-500 w-4 h-4 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Diversificar +2 Ações em Serviços Públicos e Saúde</span>
                      <span className="text-slate-400">Setores indispensáveis em qualquer conjuntura económica (eletricidade, água, produtos farmacêuticos vitais).</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={!!completedSteps['m3-2']}
                      onChange={() => toggleStepCompleted('m3-2')}
                      className="mt-0.5 accent-purple-500 w-4 h-4 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Reforçar a Balde de T-Bills de Curto Prazo</span>
                      <span className="text-slate-400">Expandir a reserva líquida para atingir a meta de 20% a 25% em munição disponível.</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {activeMonthTab === 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Mês 4: Reforçar o Seguro em Metais Preciosos
                  </h4>
                  <span className="text-[11px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded">
                    Meta: 10% a 15% Metais Físicos
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Volta a focar-te nos metais. Adiciona alguma prata física e aumenta a tua posição de ouro até atingires o objetivo total de <strong>10% a 15% de metais físicos</strong> na tua carteira.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={!!completedSteps['m4-1']}
                      onChange={() => toggleStepCompleted('m4-1')}
                      className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Adicionar Prata Física em Moedas/Barras</span>
                      <span className="text-slate-400">Excelente complemento ao ouro para preservação de poder de compra e transações.</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={!!completedSteps['m4-2']}
                      onChange={() => toggleStepCompleted('m4-2')}
                      className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Consolidar Objetivo de 10% a 15% em Metais Preciosos Físicos</span>
                      <span className="text-slate-400">Verificar que o valor total alocado em ouro/prata física atinge a meta final do seguro.</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {activeMonthTab === 5 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Mês 5: Ativos Reais Produtivos (Terras & Imobiliário)
                  </h4>
                  <span className="text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded">
                    Comida & Abrigo
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  É o momento de juntares coisas tangíveis indispensáveis à vida: comida, abrigo e energia. Compra a tua exposição ao mercado imobiliário e agrícola através de REITs como <strong>Realty Income (O)</strong>, <strong>Vanguard Real Estate (VNQ)</strong> ou <strong>Gladstone Land (LAND)</strong>.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={!!completedSteps['m5-1']}
                      onChange={() => toggleStepCompleted('m5-1')}
                      className="mt-0.5 accent-emerald-500 w-4 h-4 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Comprar REITs de Terras Agrícolas e Imobiliário Residencial</span>
                      <span className="text-slate-400">Exposição a ativos reais produtivos (LAND, O, VNQ) para garantir rendimento tangível (10% a 15%).</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={!!completedSteps['m5-2']}
                      onChange={() => toggleStepCompleted('m5-2')}
                      className="mt-0.5 accent-emerald-500 w-4 h-4 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Adicionar mais 1 Negócio de Consumo Básico</span>
                      <span className="text-slate-400">Completar o núcleo de ações com excelente poder de fixação de preços.</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {activeMonthTab === 6 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    Mês 6: A Revisão Final da Carteira Protegida
                  </h4>
                  <span className="text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                    Checkup Global
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Olha para o total da tua carteira. Nesta fase, deverás ter entre <strong>70% a 80% de todo o teu património</strong> concentrado em segurança nestes quatro "baldes" fundamentais.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={!!completedSteps['m6-1']}
                      onChange={() => toggleStepCompleted('m6-1')}
                      className="mt-0.5 accent-amber-500 w-4 h-4 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Verificar Alocação Final (70% - 90% nos 4 Baldes)</span>
                      <span className="text-slate-400">Garantir que a tua estrutura está pronta para enfrentar qualquer choque do ciclo de 75 anos de dívida.</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons for Months */}
            <div className="flex justify-between items-center pt-2 text-xs">
              <button
                disabled={activeMonthTab === 1}
                onClick={() => setActiveMonthTab(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg transition"
              >
                Mês Anterior
              </button>
              <span className="text-slate-500 text-[11px]">Passo {activeMonthTab} de 6</span>
              <button
                disabled={activeMonthTab === 6}
                onClick={() => setActiveMonthTab(prev => Math.min(6, prev + 1))}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition flex items-center gap-1"
              >
                <span>Próximo Mês</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* PASSO 4: IGNORAR O RUÍDO (A DISCIPLINA PSICOLÓGICA) */}
        <div id="passo-4-ignorar-ruido" className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold font-mono text-sm border border-purple-500/30">
              4
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Passo 4: Ignorar o Ruído & Manter a Disciplina
                <VolumeX className="w-4 h-4 text-purple-400" />
              </h3>
              <p className="text-xs text-slate-400">
                Para um iniciante, este é o passo mais difícil. O teu maior inimigo serão os teus próprios sentimentos de ganância ou medo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>O Ruído do Mercado</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Durante os próximos meses, a bolsa pode continuar a subir no curto prazo. Amigos vão gabar-se de lucros temporários em ativos especulativos e as notícias dirão que "o pior já passou".
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-400" />
                <span>Visão de Ciclo de 75 Anos</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Lembra-te: Não estás a fazer este plano em função do que vai acontecer no próximo mês. Estás a reposicionar-te em função de um <strong>ciclo monetário e de dívida de 75 a 100 anos</strong> que se aproxima do fim.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span>Sistema Estrito de Proteção</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Escreve este plano, define os teus prazos para os próximos meses e cumpre-os rigidamente. Num cenário de crise, ter um sistema estrito protege-te de ti próprio.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
