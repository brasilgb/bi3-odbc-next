"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Filiais from './filiais/page'
import Associacao from './associacao/page'
import { buscarAssociacoes, buscarFiliais, buscarTotais, IAssociacao, IFilial, ITotais } from '@/actions/resumo'
import moment from 'moment'
import { cn } from '@/lib/utils'
import { useBrandTheme } from '@/hook/useBrandThemes'
import { useDateStore } from '@/store/use-date-store'
import { DateRange } from 'react-day-picker'

export default function Resumo() {
  // 1. Recupera o valor sem forçar tipagem "as Date" imediatamente para evitar crash se vier um Range
  
  const rawDate = useDateStore((state) => state.dates['filter-single']);
  const setLastUpdated = useDateStore((state) => state.setLastUpdated);

  const brand = useBrandTheme();

  // Estados da Tela
  const [associacoes, setAssociacoes] = useState<IAssociacao[]>([]);
  const [filiais, setFiliais] = useState<IFilial[]>([]);
  const [totais, setTotais] = useState<ITotais[]>([]);
  const [loading, setLoading] = useState(false);

  // 2. Função de busca isolada
  const fetchResumoData = useCallback(async (dateString: string) => {
    setLoading(true);
    try {
      // OBS: Verifique se suas Server Actions esperam apenas a STRING ou um OBJETO { data: dateString }
      const [resAssoc, resFilial, resTotal] = await Promise.all([
        buscarAssociacoes(dateString),
        buscarFiliais(dateString),
        buscarTotais(dateString)
      ]);

      if (resAssoc.success) setAssociacoes(resAssoc.data);
      if (resFilial.success) setFiliais(resFilial.data);
      if (resTotal.success) {
        setTotais(resTotal.data)
        const dataDoBanco = resTotal.data[0]?.atualizacao;
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

  // Estilos dinâmicos para as Tabs (Sintaxe Tailwind v3 correta)
  const activeTabClass = "data-[state=active]:bg-[var(--brand-color)] data-[state=active]:text-white data-[state=active]:border-[var(--brand-color)] data-[state=active]:shadow-md";

  return (
    <div>
      <Tabs defaultValue="filiais" className="w-full">
        <TabsList
          className={cn(
            "justify-start bg-neutral-200 rounded-lg gap-2 p-0",
            "flex md:w-fit w-full overflow-x-auto",
            "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          )}
          style={{ '--brand-color': brand.hex } as React.CSSProperties}
        >
          <TabsTrigger
            value="filiais"
            className={cn(
              "px-6 py-2.5 rounded-t-lg border-b-2 border-transparent text-slate-500 transition-all",
              "whitespace-nowrap shrink-0",
              "md:w-64",
              activeTabClass
            )}
            >
            Resumo de Filiais
          </TabsTrigger>
          <TabsTrigger
            value="associacoes"
            className={cn(
              "px-6 py-2.5 rounded-t-lg border-b-2 border-transparent text-slate-500 transition-all",
              "whitespace-nowrap shrink-0",
              "md:w-64",
              activeTabClass
            )}
          >
            Resumo por Associação
          </TabsTrigger>
        </TabsList>

        <div className={cn("mt-4 transition-opacity duration-200", loading ? "opacity-50 pointer-events-none" : "opacity-100")}>
          <TabsContent value="filiais" className='w-full'>
            <Filiais totais={totais} filiais={filiais} />
          </TabsContent>
          <TabsContent value="associacoes">
            <Associacao totais={totais} associacoes={associacoes} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}