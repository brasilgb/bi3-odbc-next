import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IAssociacao, ITotais } from '@/actions/resumo';
import { formatMoney, formatPercent } from '@/utils/formatters';
import { cn } from '@/lib/utils';

interface AssociacaoProps {
  associacoes: IAssociacao[];
  totais: ITotais[];
}

export default function Associacao({ associacoes, totais }: AssociacaoProps) {
  const totalGeral = totais && totais.length > 0 ? totais[0] : null;
  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="md:w-36 font-bold text-slate-700">associacao</TableHead>
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
                Total Geral
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
          {associacoes.map((associacao, idx) => {
            const metaValue = associacao.metaAlcancada;
            const metaColor = metaValue >= 1
              ? "text-emerald-600 font-medium"
              : metaValue < 0.9
                ? "text-red-600 font-medium"
                : "text-amber-600 font-medium";

            return (
              <TableRow key={idx} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium text-slate-700">{associacao.associacao}</TableCell>

                <TableCell className="text-right font-medium text-slate-600">
                  {formatMoney(associacao.faturamento)}
                </TableCell>

                <TableCell className="text-right text-slate-500">
                  {formatPercent(associacao.repFaturamento * 100)}
                </TableCell>

                <TableCell className="text-right text-slate-500">
                  {formatPercent(associacao.projecao * 100)}
                </TableCell>

                <TableCell className="text-right text-blue-600 font-medium">
                  {formatPercent(associacao.margem * 100)}
                </TableCell>

                <TableCell className={cn("text-right", metaColor)}>
                  {formatPercent(associacao.metaAlcancada * 100)}
                </TableCell>

                <TableCell className="text-right text-slate-500">
                  {formatPercent(associacao.juros * 100)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>

      </Table>
    </div>
  )
}
