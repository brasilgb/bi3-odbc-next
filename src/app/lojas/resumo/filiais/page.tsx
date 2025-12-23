import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatMoney, formatPercent } from "@/utils/formatters"
import { cn } from "@/lib/utils"

// Definição das Interfaces (caso não estejam importadas)
interface FiliaisProps {
  totais: any[] // Substitua pelo seu tipo ITotais[]
  filiais: any[] // Substitua pelo seu tipo IFilial[]
}

export default function Filiais({ totais, filiais }: FiliaisProps) {
  // Garantia de segurança para o total (pega o primeiro ou um objeto vazio)
  const totalGeral = totais && totais.length > 0 ? totais[0] : null;

  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="md:w-36 font-bold text-slate-700">Filial</TableHead>
            <TableHead className="md:w-36 text-right font-semibold text-slate-700">Faturamento</TableHead>
            <TableHead className="text-right font-semibold text-slate-700">Rep.Fat</TableHead>
            <TableHead className="text-right font-semibold text-slate-700">Projeção</TableHead>
            <TableHead className="text-right font-semibold text-slate-700">Margem</TableHead>
            <TableHead className="text-right font-semibold text-slate-700">Meta</TableHead>
            <TableHead className="text-right font-semibold text-slate-700">Juros</TableHead>
          </TableRow>
          {totalGeral && (
         <TableRow>
              <TableCell className="font-bold text-slate-800 uppercase text-xs tracking-wider">
                Total
              </TableCell>
              
              <TableCell className="text-right font-bold text-slate-800 text-base">
                {formatMoney(totalGeral.faturamento)}
              </TableCell>
              
              <TableCell className="text-right font-bold text-slate-600">
                100%
              </TableCell>
              
              <TableCell className="text-right font-bold text-slate-600">
                {formatPercent(totalGeral.projecao * 100)}
              </TableCell>
              
              <TableCell className="text-right font-bold text-blue-700">
                {formatPercent(totalGeral.margem * 100)}
              </TableCell>
              
              <TableCell className={cn(
                  "text-right font-bold",
                  totalGeral.metaAlcancada >= 1 ? "text-emerald-700" : "text-red-700"
              )}>
                {formatPercent(totalGeral.metaAlcancada * 100)}
              </TableCell>
              
              <TableCell className="text-right font-bold text-slate-600">
                {formatPercent(totalGeral.juros * 100)}
              </TableCell>
            </TableRow>
        )}
        </TableHeader>
        
        <TableBody>
          {filiais.map((filial, idx) => {
            const metaValue = filial.metaAlcancada;
            const metaColor = metaValue >= 1 
              ? "text-emerald-600 font-medium" 
              : metaValue < 0.9 
                ? "text-red-600 font-medium" 
                : "text-amber-600 font-medium";

            return (
              <TableRow key={idx} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium text-slate-700">{filial.filial}</TableCell>
                
                <TableCell className="text-right font-medium text-slate-600">
                  {formatMoney(filial.faturamento)}
                </TableCell>
                
                <TableCell className="text-right text-slate-500">
                  {formatPercent(filial.repFaturamento * 100)}
                </TableCell>
                
                <TableCell className="text-right text-slate-500">
                  {formatPercent(filial.projecao * 100)}
                </TableCell>
                
                <TableCell className="text-right text-blue-600 font-medium">
                  {formatPercent(filial.margem * 100)}
                </TableCell>
                
                <TableCell className={cn("text-right", metaColor)}>
                  {formatPercent(filial.metaAlcancada * 100)}
                </TableCell>
                
                <TableCell className="text-right text-slate-500">
                  {formatPercent(filial.juros * 100)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>

      </Table>
    </div>
  )
}