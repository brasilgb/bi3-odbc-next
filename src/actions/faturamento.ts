'use server'

import { fetchFromSidecar } from "@/services/api-client";


// Interfaces (Modelos de Dados)
export interface ITotalPorAssociacaoDTO {
  // Identificadores e Datas
  dataChave: number;           // BI011_DATACHAVE
  atualizacao: string;     // BI011_ATUALIZACAO

  // Métricas do Mês (Geral/Meta)
  metaMes: number;             // BI011_METAMES
  mediaFaturamentoMes: number; // BI011_MEDIAFATUMES
  margemMes: number;           // BI011_MARGEMMES
  repFaturamentoMes: number;   // BI011_REPFATUMES
  metaAlcancadaMes: number;    // BI011_METAALCANCADAMES
  mediaJurosParcelasMes: number; // BI011_MEDJURSPARCMES
  repJurosMes: number;         // BI011_REPJUROSMES

  // Métricas da Associação
  faturamentoAssociacao: number;      // BI011_FATURAMENTOASS
  margemAssociacao: number;           // BI011_MARGEMASS
  repFaturamentoAssociacao: number;   // BI011_REPFATASS
  jurosFaturamentoAssociacao: number; // BI011_JURSFATASS
  repJurosAssociacao: number;         // BI011_REPJUROSASS
  estoqueAssociacao: number;          // BI011_ESTOQUEASS
  giroAssociacao: number;             // BI011_GIROASS
  repEstoqueAssociacao: number;       // BI011_REPESTOQUEASS
}

export interface ITotalFaturamentoDTO {
  // --- Identificadores e Datas ---
  dataChave: number;            // BI007_DATACHAVE
  atualizacao: string;      // BI007_ATUALIZACAO
  diaAtual: number;             // BI007_DIAATUAL
  diaAnterior: number;          // BI007_DIAANTERIOR

  // --- Métricas do Dia (Hoje vs Anterior) ---
  faturamentoDia: number;       // BI007_FATUDIA
  margemDia: number;            // BI007_MARGEMDIA
  faturamentoAnterior: number;  // BI007_FATUANTERIOR
  margemAnterior: number;       // BI007_MARGEMANTERIOR
  mediaDia: number;             // BI007_MEDIADIA

  // --- Metas e Vendas do Dia ---
  metaDia: number;              // BI007_METADIA
  vendaDia: number;             // BI007_VENDADIA
  faltaVenderDia: number;       // BI007_FLTVNDDIA
  percentualMetaDia: number;    // BI007_PERFMETADIA
  jurosParcelasDia: number;     // BI007_JURSPARCDIA
  percentualJurosDia: number;   // BI007_PERFJURDIA

  // --- Métricas da Semana ---
  faturamentoSemana: number;    // BI007_FATUSEMANA
  margemSemana: number;         // BI007_MARGEMSEMANA
  repFaturamentoSemana: number; // BI007_REPSEMFATU

  // --- Métricas do Mês ---
  faturamentoMes: number;       // BI007_FATUMES
  margemMes: number;            // BI007_MARGEMMES
  metaMes: number;              // BI007_METAMES
  vendaMes: number;             // BI007_VENDAMES
  faltaVenderMes: number;       // BI007_FLTVNDMES
  metaParcialMes: number;       // BI007_METAPARCMES
  atingidoMes: number;          // BI007_ATINGIDOMES
  percentualAtualMes: number;   // BI007_PERFATUALMES

  // --- Indicadores Gerais ---
  repFaturamento: number;       // BI007_REPFATU
  jurosSPM: number;             // BI007_JUROSSPM
}

// --- ACTIONS SIMPLIFICADAS ---

export async function buscarTotalAssociacoes(data: string) {
  // Chamada limpa: Endpoint + Parametros + Tipo de Retorno (Array de IAssociacao)
  return fetchFromSidecar<ITotalPorAssociacaoDTO[]>('/faturamento/totalporassociacoes', { data });
}

export async function buscarTotalFaturamento(data: string) {
  return fetchFromSidecar<ITotalFaturamentoDTO[]>('/faturamento/totalfaturamento', { data });
}
