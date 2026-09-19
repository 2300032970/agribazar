import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { 
  ReceiptText, 
  ArrowDownLeft, 
  ArrowUpRight, 
  CreditCard, 
  CheckCircle2, 
  TrendingUp,
  Download
} from 'lucide-react';

export const TransactionsHistory: React.FC = () => {
  const { transactions } = useStore();
  const { t } = useLanguage();

  const totalCredits = transactions
    .filter(t => t.type === 'Credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebits = transactions
    .filter(t => t.type === 'Debit')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <ReceiptText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                {t('nav_transactions', 'Farm Payments & Financial Ledger')}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Transparent escrow payment records for crop sales, input purchases, and logistics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 border-l-4 border-l-emerald-600 space-y-1">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Crop Sales Inflow (Credits)</p>
          <p className="text-2xl font-black text-emerald-800">₹{totalCredits.toLocaleString()}</p>
          <p className="text-[11px] text-stone-400">Escrow proceeds from buyers</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-rose-500 space-y-1">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Farm Expenses (Debits)</p>
          <p className="text-2xl font-black text-rose-700">₹{totalDebits.toLocaleString()}</p>
          <p className="text-[11px] text-stone-400">Inputs, transport & storage</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-teal-600 space-y-1">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Net Farm Margin</p>
          <p className="text-2xl font-black text-teal-900">₹{(totalCredits - totalDebits).toLocaleString()}</p>
          <p className="text-[11px] text-emerald-600 font-bold">Positive Operating Margin</p>
        </Card>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <h3 className="font-bold text-stone-900 text-base">Historical Transaction Ledger</h3>
          <span className="text-xs text-stone-500 font-mono">{transactions.length} Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="px-5 py-3.5">Transaction ID</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Description</th>
                <th className="px-5 py-3.5">Method</th>
                <th className="px-5 py-3.5">Date & Time</th>
                <th className="px-5 py-3.5 text-right">Amount</th>
                <th className="px-5 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {transactions.map((tx) => {
                const isCredit = tx.type === 'Credit';
                return (
                  <tr key={tx.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-stone-800">
                      {tx.transactionNumber}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        isCredit ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {tx.category}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-stone-700 font-medium max-w-xs">
                      {tx.description}
                    </td>

                    <td className="px-5 py-4 text-stone-500">
                      {tx.paymentMethod}
                    </td>

                    <td className="px-5 py-4 text-stone-400 font-mono">
                      {tx.date}
                    </td>

                    <td className="px-5 py-4 text-right font-black text-sm">
                      <span className={isCredit ? 'text-emerald-700' : 'text-stone-900'}>
                        {isCredit ? '+' : '–'} ₹{tx.amount.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Badge variant="success" dot>
                        {tx.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
