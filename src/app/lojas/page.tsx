"use client"
import { buscarTotalAssociacoes, buscarTotalFaturamento, ITotalFaturamentoDTO, ITotalPorAssociacaoDTO } from '@/actions/faturamento';
import { useDateStore } from '@/store/use-date-store'
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function Lojas() {
  const rawDate = useDateStore((state) => state.dates['filter-single']);
  const setLastUpdated = useDateStore((state) => state.setLastUpdated);
  const [totaisAssociacao, setTotaisAssociacao] = useState<ITotalPorAssociacaoDTO[]>([]);
  const [totaisFaturamento, setTotaisFaturamento] = useState<ITotalFaturamentoDTO[]>([]);
  const [loading, setLoading] = useState(false);



  const fetchResumoData = useCallback(async (dateString: string) => {
    setLoading(true);
    try {
      // OBS: Verifique se suas Server Actions esperam apenas a STRING ou um OBJETO { data: dateString }
      const [resTotAssoc, resTotFat] = await Promise.all([
        buscarTotalAssociacoes(dateString),
        buscarTotalFaturamento(dateString),
      ]);

      if (resTotAssoc.success) setTotaisAssociacao(resTotAssoc.data);
      if (resTotFat.success) {
        setTotaisFaturamento(resTotFat.data)
        const dataDoBanco = resTotFat.data[0]?.atualizacao;
        if (dataDoBanco) {
          setLastUpdated('date-atualize', dataDoBanco);
        }
      };
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  }, [setLastUpdated]);

  // 3. Effect que monitora a mudança de data na Store
  useEffect(() => {
    // Lógica de segurança: Se rawDate for um Range (erro de config) ou undefined, usa Hoje.
    let dateToUse: Date;

    if (rawDate instanceof Date) {
      dateToUse = rawDate;
    } else if (rawDate && 'from' in (rawDate as DateRange)) {
      // Fallback se vier um Range por engano: pega a data de início
      dateToUse = (rawDate as DateRange).from || new Date();
    } else {
      dateToUse = new Date();
    }

    const formattedDate = moment(dateToUse).format("YYYYMMDD");
    fetchResumoData(formattedDate);

  }, [rawDate, fetchResumoData]);

  return (
    <div>
      {JSON.stringify(totaisAssociacao)}
    </div>
  )
}

