import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { DateRange } from 'react-day-picker'

type DateValue = DateRange | Date | undefined

interface DateStoreState {
    dates: Record<string, DateValue> // Dicionário: { 'filtro-home': valor, 'filtro-relatorio': valor }
    getDate: (key: string) => DateValue
    reset: (key: string) => void
    lastUpdated: Record<string, Date | string | null>
    setDate: (key: string, date: DateValue) => void
    setLastUpdated: (key: string, date: Date | string | null) => void
}

export const useDateStore = create<DateStoreState>()(
    persist(
        (set, get) => ({
            dates: {},
            lastUpdated: {}, // Inicia vazio

            setDate: (key, date) =>
                set((state) => ({
                    dates: { ...state.dates, [key]: date }
                })),

            setLastUpdated: (key, date) =>
                set((state) => ({ lastUpdated: { ...state.lastUpdated, [key]: date } })),

            getDate: (key) => get().dates[key],

            reset: (key) =>
                set((state) => {
                    const newDates = { ...state.dates }
                    delete newDates[key]
                    return { dates: newDates }
                }),
        }),
        {
            name: 'app-date-filters', // Nome no LocalStorage
            storage: createJSONStorage(() => localStorage),

            // Hidratação Inteligente: Varre todas as chaves salvas e converte Strings em Dates
            onRehydrateStorage: () => (state) => {
                if (!state || !state.dates) return

                Object.keys(state.dates).forEach((key) => {
                    const value = state.dates[key]

                    if (!value) return

                    // Se for Range (tem 'from')
                    if (typeof value === 'object' && 'from' in value) {
                        const range = value as DateRange
                        if (typeof range.from === 'string') range.from = new Date(range.from)
                        if (typeof range.to === 'string') range.to = new Date(range.to)
                        state.dates[key] = range
                    }
                    // Se for Single Date (string isolada)
                    else if (typeof value === 'string') {
                        state.dates[key] = new Date(value)
                    }
                })
            },
        }
    )
)