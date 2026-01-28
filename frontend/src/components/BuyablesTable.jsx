import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { formatGP, formatNumber } from '../utils/formatters';
import { Tooltip } from './Tooltip';

export function BuyablesTable({ data }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Item',
        cell: (info) => (
          <div className="font-medium text-gray-900 dark:text-dark-text">
            {info.getValue()}
          </div>
        ),
      },
      {
        accessorKey: 'level',
        header: 'Level',
        cell: (info) => (
          <div className="text-gray-600 dark:text-dark-muted">
            {info.getValue()}
          </div>
        ),
      },
      {
        accessorKey: 'xpGained',
        header: 'XP',
        cell: (info) => (
          <div className="text-gray-600 dark:text-dark-muted">
            {formatNumber(info.getValue(), 1)}
          </div>
        ),
      },
      {
        accessorKey: 'sellPrice',
        header: 'Sell Price',
        cell: (info) => (
          <div className="text-gray-900 dark:text-dark-text">
            {formatGP(info.getValue())} GP
          </div>
        ),
      },
      {
        accessorKey: 'materialCost',
        header: 'Material Cost',
        cell: (info) => {
          const row = info.row.original;
          const materials = row.materials || [];

          // Build tooltip content with material breakdown
          const tooltipContent = materials.length > 0 ? (
            <div className="text-left">
              <div className="font-semibold mb-1.5 text-gray-100">Materials:</div>
              {materials.map((mat, idx) => (
                <div key={idx} className="flex justify-between gap-4 py-0.5">
                  <span className="text-gray-300">
                    {mat.quantity}x {mat.name}
                  </span>
                  <span className="text-gray-100 font-medium">
                    {formatGP(mat.totalCost)} GP
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-600 mt-1.5 pt-1.5 flex justify-between gap-4">
                <span className="font-semibold text-gray-100">Total:</span>
                <span className="font-bold text-gray-100">
                  {formatGP(info.getValue())} GP
                </span>
              </div>
            </div>
          ) : null;

          return (
            <Tooltip content={tooltipContent}>
              <div className="text-gray-900 dark:text-dark-text cursor-help underline decoration-dotted decoration-gray-400 dark:decoration-gray-600">
                {formatGP(info.getValue())} GP
              </div>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: 'netProfit',
        header: 'Net Profit',
        cell: (info) => {
          const value = info.getValue();
          const isProfit = value > 0;
          return (
            <div
              className={`font-medium ${
                isProfit
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {isProfit ? '+' : ''}{formatGP(value)} GP
            </div>
          );
        },
      },
      {
        accessorKey: 'pricePerXp',
        header: 'GP/XP',
        cell: (info) => {
          const value = info.getValue();
          const isProfit = value < 0; // Negative price per XP = profit
          return (
            <div
              className={`font-bold ${
                isProfit
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {formatNumber(value, 2)}
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: 'pricePerXp',
          desc: false, // Ascending = best value first
        },
      ],
    },
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-dark-border">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-bg select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() && (
                      <span>
                        {header.column.getIsSorted() === 'desc' ? (
                          <ArrowDown className="w-4 h-4" />
                        ) : (
                          <ArrowUp className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white dark:bg-dark-bg divide-y divide-gray-200 dark:divide-dark-border">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
