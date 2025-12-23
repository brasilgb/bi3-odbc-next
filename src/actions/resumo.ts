'use server'

import { fetchFromSidecar } from "@/services/api-client";


// Interfaces (Modelos de Dados)
export interface IAssociacao {
  dataChave: number;
  departamento: string;
  associacao: string;
  atualizacao: string;
  faturamento: number;
  repFaturamento: number;
  projecao: number;
  margem: number;
  precoMedio: number;
  ticketMedio: number;
  metaAlcancada: number;
  juros: number;
}

export interface IFilial {
  dataChave: number;
  departamento: string;
  idFilial: number;
  filial: string; // Nome da filial
  atualizacao: string;
  faturamento: number;
  repFaturamento: number;
  projecao: number;
  margem: number;
  precoMedio: number;
  ticketMedio: number;
  metaAlcancada: number;
  juros: number;
}

export interface ITotais {
  dataChave: number;
  departamento: string;
  atualizacao: string;
  meta: number;
  faturamento: number;
  projecao: number;
  margem: number;
  precoMedio: number;
  ticketMedio: number;
  metaAlcancada: number;
  faturamentoSemBr: number;    // BI040_FATUSEMBR
  margemSemBr: number;         // BI040_MARGSEMBR
  precoMedioSemBr: number;     // BI040_PRECOMEDSEMBR
  vendaAgora: number;
  vendaDia: number;
  margemMediaAno: number;
  jurosMedioAno: number;
  juros: number;
  jurosAgora: number;          // BI040_JUROAGORA
}

// --- ACTIONS SIMPLIFICADAS ---

export async function buscarAssociacoes(data: string) {
  // Chamada limpa: Endpoint + Parametros + Tipo de Retorno (Array de IAssociacao)
  return fetchFromSidecar<IAssociacao[]>('/resumo/associacoes', { data });
}

export async function buscarFiliais(data: string) {
  return fetchFromSidecar<IFilial[]>('/resumo/filiais', { data });
}

export async function buscarTotais(data: string) {
  return fetchFromSidecar<ITotais[]>('/resumo/totais', { data });
}