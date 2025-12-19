'use client'

import { useState } from 'react';
import { buscarDadosBI001 } from '@/actions/resumo';

export default function Page() {
  const [registros, setRegistros] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleBuscar() {
    setLoading(true);
    const resposta = await buscarDadosBI001();
    
    if (resposta.success) {
      setRegistros(resposta.data);
    } else {
      alert('Erro: ' + resposta.error);
    }
    setLoading(false);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Consulta DBMaker</h1>
      
      <button 
        onClick={handleBuscar} 
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Consultando...' : 'Carregar Dados'}
      </button>

      <div className="mt-6 space-y-2">
        {registros.map((item, index) => (
          <div key={index} className="border p-2 rounded bg-gray-50">
            {/* Ajuste os campos conforme sua tabela SYSADM.A_BI001 */}
            <pre className="text-sm">{JSON.stringify(item, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}