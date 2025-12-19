'use server'

import { getDBMakerPool } from '@/lib/dbmaker';

export async function buscarDadosBI001() {
  try {
    const pool = await getDBMakerPool();

    // Executar a consulta do seu exemplo
    const query = 'SELECT * FROM SYSADM.A_BI001 LIMIT 10';
    
    // O pool gerencia a conexão e desconexão automaticamente
    const result = await pool.query(query);

    // DICA: O Next.js não aceita retornar objetos complexos do ODBC diretamente.
    // É boa prática converter para um objeto simples JSON.
    const dados = JSON.parse(JSON.stringify(result));

    return { 
      success: true, 
      data: dados 
    };

  } catch (err) {
    console.error('Erro na Action do DBMaker:', err);
    return { 
      success: false, 
      error: 'Erro ao consultar dados.' 
    };
  }
}