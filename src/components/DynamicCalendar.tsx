"use client"

import { usePathname } from "next/navigation"
import { format } from "date-fns"
import { SmartDatePicker } from "@/components/smart-date-picker" // Ajuste o caminho se necessário
import { useDateStore } from "@/store/use-date-store" // Importe a store

export function DynamicCalendar() {
  const pathname = usePathname()

  // 1. Determina a configuração baseada na rota atual
  const getConfig = () => {
    // Caso FLUXO (Range + Memória Própria)
    if (pathname.includes('/fluxo')) {
      return { 
        mode: "range" as const, 
        storageKey: "filter-range" 
      }
    }

    // Caso EMPRÉSTIMO (Range + Memória Própria)
    if (pathname.includes('/emprestimo')) {
      return { 
        mode: "range" as const, 
        storageKey: "filter-range"
      }
    }

    // Caso PADRÃO (Single + Memória Compartilhada no sistema)
    // Use a mesma chave que você usou no componente 'Resumo'
    return { 
      mode: "single" as const, 
      storageKey: "filter-single" 
    }
  }

  const { mode, storageKey } = getConfig()

const dataAtualize = useDateStore((state) => state.lastUpdated?.['date-atualize']);

  // 3. Caso Inadimplência: NÃO MOSTRAR NADA
  if (pathname.includes('/inadimplencia')) {
    return null
  }

  // 4. Prepara o Placeholder (Texto cinza quando não há seleção)
  const today = new Date()
  const todayStr = format(today, "dd/MM/yyyy")
  
  // Se for range, mostra "Hoje - Hoje". Se for single, mostra "Hoje".
  const placeholderText = mode === "range" 
    ? `${todayStr} - ${todayStr}` 
    : todayStr

  return (
    <SmartDatePicker
      storageKey={storageKey}
      mode={mode}
      placeholder={placeholderText}
      lastUpdated={dataAtualize} // <--- Passa a data do banco para o componente visual
    />
  )
}