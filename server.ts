import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Real-time market feed endpoint for Ray Dalio's 4 Pillar Assets + BTC
app.get("/api/market-data", (req, res) => {
  // Base prices with slight live fluctuations
  const now = new Date();
  const jitter = (base: number, pct: number = 0.005) => {
    const change = (Math.random() - 0.48) * pct * base; // slight bullish bias
    return Number((base + change).toFixed(2));
  };

  const assets = {
    gold: {
      symbol: "Ouro / Prata Físico",
      name: "Metais Preciosos Físicos (A)",
      pillar: "Seguro contra Colapso Monetário (10% - 15%)",
      priceUSD: jitter(2680.50, 0.008),
      change24h: 1.45,
      weightRecommended: 15,
      ytdReturn: 28.4,
      drawdownMax: -12.3,
      volatility: 14.2,
      trend: "up"
    },
    stocks: {
      symbol: "KO / PG / JNJ",
      name: "Empresas com Pricing Power (B)",
      pillar: "Repasse de Inflação / Dividend Aristocrats (30% - 35%)",
      priceUSD: jitter(585.20, 0.006),
      change24h: -0.32,
      weightRecommended: 35,
      ytdReturn: 18.2,
      drawdownMax: -19.5,
      volatility: 16.8,
      trend: "stable"
    },
    cash: {
      symbol: "SGOV / BIL",
      name: "Tesouro Curto Prazo & Cash (C)",
      pillar: "Munição & Opcionalidade de Compra (20% - 25%)",
      priceUSD: jitter(91.80, 0.001),
      change24h: 0.02,
      weightRecommended: 35,
      ytdReturn: 5.1,
      drawdownMax: -0.2,
      volatility: 0.8,
      trend: "flat"
    },
    longBonds: {
      symbol: "LAND / O / VNQ",
      name: "Ativos Reais Produtivos (D)",
      pillar: "Tangíveis: Comida, Abrigo & Energia (10% - 15%)",
      priceUSD: jitter(92.40, 0.004),
      change24h: 0.18,
      weightRecommended: 15,
      ytdReturn: -3.5,
      drawdownMax: -24.1,
      volatility: 13.1,
      trend: "neutral"
    },
    bitcoin: {
      symbol: "BTC / USD",
      name: "Cripto / Bitcoin (Opcional)",
      pillar: "Escassez Digital Complementar",
      priceUSD: jitter(94200.00, 0.012),
      change24h: 3.20,
      weightRecommended: 0,
      ytdReturn: 112.5,
      drawdownMax: -38.2,
      volatility: 48.5,
      trend: "up"
    }
  };

  const macroIndicators = {
    usInflationRate: 3.1,
    fedInterestRate: 4.75,
    usDebtToGDP: 124.5,
    dollarIndexDXY: jitter(104.2, 0.002),
    cycleWindowMonthsLeft: 18,
    debtCycleRiskLevel: "ELEVADO (Fase Avançada de Expansão de Crédito)"
  };

  res.json({
    timestamp: now.toISOString(),
    assets,
    macroIndicators
  });
});

// Gemini AI Macro Analysis Route
app.post("/api/gemini/analyze", async (req, res) => {
  try {
    const { portfolio, totalCapital, currency, macroScenario, prompt } = req.body;

    const systemInstruction = `És o "Dalio Macro AI Specialist", um consultor financeiro sénior especializado no modelo dos 4 Ativos de Sobrevivência de Ray Dalio, teoria dos Ciclos de Dívida de Longo Prazo e proteção patrimonial contra inflação e colapso monetário.

As tuas orientações devem seguir rigorosamente os 4 Ativos de Sobrevivência recomendados (que devem compor 70% a 90% da carteira):
A. Metais Preciosos Físicos (Ouro e Prata) — 10% a 15% (Seguro contra colapso de moedas fiduciárias; deve ser metal físico e não papel ouro).
B. Empresas com "Pricing Power" (Poder de Fixação de Preços) — 30% a 35% (Bens essenciais e marcas fortes, ex: Dividend Aristocrats com 25+ anos de dividendos crescentes).
C. Títulos do Tesouro de Curto Prazo e Dinheiro (Cash) — 20% a 25% (Protege capital e dá munição com "opcionalidade" para comprar ativos em pânicos; ex: SGOV, BIL).
D. Ativos Reais Produtivos — 10% a 15% (Tangíveis indispensáveis: terras agrícolas e imobiliário para arrendamento; ex: REITs como LAND, O, VNQ).

Tom profissional, educativo, pragmático, analítico e redigido exclusivamente em Português Europeu (pt-PT). Utiliza termos naturais de Portugal (ex: "utilizador", "carteira", "reequilíbrio", "obrigações", "liquidez").

Sempre formata a resposta com marcações limpas (Markdown) e inclui:
- Diagnóstico do risco atual da carteira informada.
- Avaliação de exposição aos 4 Ativos de Sobrevivência.
- Recomendações práticas de reequilíbrio.`;

    const userPromptText = `Analise a seguinte carteira de investimentos:
Capital Total: ${totalCapital?.toLocaleString('pt-PT') || '100.000'} ${currency || '€'}
Alocação Atual do Utilizador:
- Ouro & Ativos Reais: ${portfolio?.gold || 0}%
- Ações Globais: ${portfolio?.stocks || 0}%
- Obrigações Longo Prazo / TIPS: ${portfolio?.longBonds || 0}%
- Caixa / Liquidez Curto Prazo: ${portfolio?.cash || 0}%
- Bitcoin / Criptoativos: ${portfolio?.bitcoin || 0}%

Cenário Preocupante Selecionado: ${macroScenario || "Emissão Monetária e Risco de Estagflação (Ciclo de 18 Meses)"}
Dúvida/Comentário adicional do Utilizador: ${prompt || "Como devo proteger o meu património para os próximos 18 meses segundo a filosofia de Ray Dalio?"}`;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        analysis: `### ⚠️ Modo de Demonstração (Chave Gemini API não configurada no servidor)

Para ativar a análise em tempo real com Inteligência Artificial, adicione a chave \`GEMINI_API_KEY\` nas configurações de segredos do ambiente.

#### 📊 Análise Simulada dos 4 Ativos de Sobrevivência:
- **Diagnóstico**: A sua carteira possui **${portfolio?.gold || 0}% em Metais Preciosos Físicos** e **${portfolio?.stocks || 0}% em Empresas com Pricing Power**.
- **Alocação Recomendada da Fonte (70% a 90% do Portfólio)**:
  - **A. Metais Preciosos Físicos (Ouro e Prata)**: 10% a 15% (Moedas de 1 oz / barras em cofre)
  - **B. Empresas com "Pricing Power"**: 30% a 35% (Dividend Aristocrats de bens essenciais)
  - **C. Tesouro de Curto Prazo e Dinheiro (Cash)**: 20% a 25% (Munição e opcionalidade de compra)
  - **D. Ativos Reais Produtivos**: 10% a 15% (REITs agrícolas/LAND e imobiliário/O/VNQ)
- **Recomendação Principal**: Mantenha entre 70% e 90% do seu património alocado nestas 4 categorias e possua o metal em formato físico.`
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPromptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ analysis: response.text });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({
      error: "Falha ao gerar análise com IA. Tente novamente em instantes.",
      details: err?.message || String(err)
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: any, res: any) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
