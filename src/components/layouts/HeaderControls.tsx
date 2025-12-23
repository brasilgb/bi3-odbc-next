'use client'

import { RefreshCw } from "lucide-react"
import { DynamicCalendar } from "../DynamicCalendar";
import { useDateStore } from "@/store/use-date-store";

export function HeaderControls() {
const dataAtualize = useDateStore((state) => state.lastUpdated?.['date-atualize']);

    return (
        <div className="flex items-center gap-2">
            <DynamicCalendar />
            <div className="hidden md:flex h-9 items-center gap-2 px-3 border rounded-md bg-slate-50 text-slate-600 select-none">
                <RefreshCw size={14} className="text-slate-400" />
                <span className="text-xs font-medium tabular-nums">
                    {String(dataAtualize)}
                </span>
            </div>

        </div>
    )
}