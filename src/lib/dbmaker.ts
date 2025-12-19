import odbc from 'odbc';

// Define a connection string baseada no seu exemplo
const connectionString = 'DSN=GRUPOSOLARDB;UID=SYSADM;PWD=;';

// Variável global para cache em desenvolvimento (evita recriar pool no Hot Reload)
const globalForOdbc = global as unknown as { odbcPool: odbc.Pool };

let pool: odbc.Pool;

export async function getDBMakerPool() {
  // Se já existe um pool ativo, retorna ele
  if (pool) return pool;
  
  if (globalForOdbc.odbcPool) {
    pool = globalForOdbc.odbcPool;
    return pool;
  }

  try {
    // Usamos .pool() em vez de .connect() para gerenciar múltiplas requisições
    pool = await odbc.pool(connectionString);
    
    // Salva no global apenas em dev
    if (process.env.NODE_ENV !== 'production') {
      globalForOdbc.odbcPool = pool;
    }
    
    console.log('Pool ODBC DBMaker iniciado.');
    return pool;
  } catch (error) {
    console.error('Erro fatal ao conectar no DBMaker:', error);
    throw new Error('Falha na conexão ODBC');
  }
}