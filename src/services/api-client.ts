// src/services/api-client.ts

// 1. Definição do formato de resposta padrão da sua API
export type ApiResponse<T> = 
  | { success: true; count?: number; data: T }
  | { success: false; error: string };

// 2. Interface para opções de cache do Next.js (opcional)
interface FetchOptions {
  revalidate?: number; // Tempo em segundos para cache
  cache?: RequestCache; // 'no-store', 'force-cache', etc.
}

/**
 * Função Genérica para buscar dados no Sidecar (Porta 3008)
 * @param endpoint Ex: '/resumo/totais'
 * @param params Objeto com parametros da query string { data: '20221111' }
 * @param options Opções de cache do Next.js
 */
export async function fetchFromSidecar<T>(
  endpoint: string, 
  params: Record<string, string | number> = {},
  options: FetchOptions = { cache: 'no-store' }
): Promise<ApiResponse<T>> {
  try {
    // Pega a URL do .env ou usa o fallback
    const API_BASE_URL = process.env.SOLAR_API_URL || 'http://localhost:3008';

    // Monta a URL de forma segura usando URLSearchParams
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    
    // Adiciona os parâmetros (ex: ?data=20221111&loja=1)
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, String(params[key]));
      }
    });

    console.log(`📡 [Sidecar Fetch] ${url.toString()}`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Configurações de Cache do Next.js
      cache: options.cache, 
      next: options.revalidate ? { revalidate: options.revalidate } : undefined
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }

    // A mágica do TypeScript: retorna o JSON tipado como T
    const json = await response.json();
    return json as ApiResponse<T>;

  } catch (error: any) {
    console.error(`❌ Erro ao conectar com Sidecar (${endpoint}):`, error.message);
    // Retorna um erro amigável para o front não quebrar
    return { success: false, error: 'Serviço de dados indisponível no momento.' };
  }
}