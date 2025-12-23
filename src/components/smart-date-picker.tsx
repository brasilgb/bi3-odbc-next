"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon, X, RefreshCcw } from "lucide-react"
import { DateRange, SelectRangeEventHandler, SelectSingleEventHandler } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDateStore } from "@/store/use-date-store"
import { useMediaQuery } from "@/hook/use-media-query"

interface SmartDatePickerProps {
  storageKey: string // <--- OBRIGATÓRIO: Identificador único (ex: "dashboard-main", "users-list")
  mode?: "single" | "range"
  placeholder?: string
  align?: "center" | "start" | "end"
  className?: string
  lastUpdated?: Date | string | null
}

export function SmartDatePicker({
  storageKey,
  mode = "range",
  placeholder = "Selecione a data",
  align = "end",
  className,
  lastUpdated,
}: SmartDatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const hasSelectedFirst = React.useRef(false)

  const globalDate = useDateStore((state) => state.dates[storageKey])
  const setGlobalDate = useDateStore((state) => state.setDate)

  // Estado local para evitar Hydration Mismatch
  const [date, setDate] = React.useState<DateRange | Date | undefined>()
  const [isMounted, setIsMounted] = React.useState(false)

  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  React.useEffect(() => {
    setIsMounted(true)
    setDate(globalDate)
  }, [globalDate])

  const handleUpdate = (newDate: DateRange | Date | undefined) => {
    setDate(newDate)
    setGlobalDate(storageKey, newDate) // <--- Salva usando a chave
  }

  // --- Lógica Smart Range ---
  const handleRangeSelect: SelectRangeEventHandler = (range) => {
    if (mode !== "range") return

    if (!range) {
      handleUpdate(undefined)
      hasSelectedFirst.current = false
      return
    }

    const currentRange = date as DateRange | undefined

    if (
      (currentRange?.from && currentRange?.to) ||
      (range.from && range.to && range.from.getTime() === range.to.getTime())
    ) {
      handleUpdate({ from: range.from, to: undefined })
      hasSelectedFirst.current = true
      return
    }

    handleUpdate(range)

    if (!hasSelectedFirst.current) {
      hasSelectedFirst.current = true
    } else if (range.from && range.to) {
      hasSelectedFirst.current = false
      setOpen(false)
    }
  }

  const handleSingleSelect: SelectSingleEventHandler = (selectedDay) => {
    handleUpdate(selectedDay)
    setOpen(false)
  }

  const clearSelection = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    handleUpdate(undefined)
    hasSelectedFirst.current = false
    setOpen(false)
  }

  // --- Visual ---
  const formatDateDisplay = () => {
    if (!isMounted) return <span>{placeholder}</span>
    if (!date) return <span>{placeholder}</span>

    if (mode === "single" && date instanceof Date) {
      return format(date, "dd/MM/yyyy")
    }

    if (mode === "range") {
      const range = date as DateRange
      if (range?.from) {
        if (range.to) {
          return `${format(range.from, "dd/MM/yyyy")} - ${format(range.to, "dd/MM/yyyy")}`
        }
        return format(range.from, "dd/MM/yyyy")
      }
    }
    return <span>{placeholder}</span>
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-10 p-0 justify-center md:justify-start md:w-[260px] md:px-3 text-left font-normal relative",
              !date && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="h-4 w-4 md:mr-2 shrink-0" />
            <span className="hidden md:inline truncate">
              {formatDateDisplay()}
            </span>
            {date && isMounted && (
              <div
                role="button"
                onClick={clearSelection}
                className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={isDesktop ? align : "center"} sideOffset={8} >
          <Calendar
            initialFocus
            mode={mode as any}
            defaultMonth={
              mode === "range"
                ? (date as DateRange)?.from
                : (date instanceof Date ? date : undefined)
            }
            selected={date as any}
            onSelect={mode === "range" ? handleRangeSelect : handleSingleSelect}
            numberOfMonths={1}
            locale={ptBR}
          />
          <div className="border-t p-3 flex items-center justify-between bg-slate-50/50">
            <div className="flex flex-col">
              {lastUpdated && (
                <span className="text-[10px] text-muted-foreground md:hidden flex items-center gap-1">
                  <RefreshCcw className="h-3 w-3" />
                  Atualizado: {String(lastUpdated)}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs px-2 hover:bg-red-50 hover:text-red-600"
              onClick={() => clearSelection()}
              disabled={!date}
            >
              Limpar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}