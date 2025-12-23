// src/utils/formatters.ts

/**
 * Formata um valor numérico para Real Brasileiro (BRL)
 * Ex: 1250.50 -> R$ 1.250,50
 */
export const formatMoney = (value: number | string | null | undefined): string => {
  const numberValue = Number(value);
  
  if (isNaN(numberValue) || value === null || value === undefined) {
    return 'R$ 0,00';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numberValue);
};

/**
 * Formata um valor numérico para Porcentagem
 * Ex: 10.5 -> 10,50%
 */
export const formatPercent = (value: number | string | null | undefined, decimals = 2): string => {
  const numberValue = Number(value);

  if (isNaN(numberValue) || value === null || value === undefined) {
    return `0,${'0'.repeat(decimals)}%`;
  }

  // NOTA: Não usamos style: 'percent' aqui porque ele multiplica por 100.
  // Assumimos que o banco já traz o valor pronto (ex: 10.5 para 10.5%).
  const formatted = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(numberValue);

  return `${formatted}%`;
};