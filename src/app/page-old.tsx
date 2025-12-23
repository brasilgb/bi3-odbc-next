'use client'

import { buscarAssociacoes, buscarFiliais, buscarTotais } from '@/actions/resumo';
import { useState } from 'react';


export default function Dashboard() {
  const [dataBusca, setDataBusca] = useState('20221111');
  
  const [associacoes, setAssociacoes] = useState<any[]>([]);
  const [filiais, setFiliais] = useState<any[]>([]);
  const [totais, setTotais] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(false);

  async function handleBuscar() {
    setLoading(true);

    const [resAssoc, resFilial, resTotal] = await Promise.all([
      buscarAssociacoes(dataBusca),
      buscarFiliais(dataBusca),
      buscarTotais(dataBusca)
    ]);

    if (resAssoc.success) setAssociacoes(resAssoc.data);
    if (resFilial.success) setFiliais(resFilial.data);
    if (resTotal.success) setTotais(resTotal.data);

    setLoading(false);
  }

  return (
    <div>
      <input value={dataBusca} onChange={e => setDataBusca(e.target.value)} />
      <button onClick={handleBuscar} disabled={loading}>
        {loading ? 'Carregando Dashboard...' : 'Atualizar Tudo'}
      </button>

      {/* Renderize suas tabelas aqui usando as variáveis de estado */}
      {/* <pre>{JSON.stringify(filiais, null, 2)}</pre> */}
    </div>
  );
}