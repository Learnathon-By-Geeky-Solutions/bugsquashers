import { ArrowUpRight, ArrowDownLeft, Wallet, SendHorizontal, QrCode, Plus, ArrowRight, CreditCard } from "lucide-react"

const ACCOUNTS = [
  {
    id: "1",
    title: "Main Savings",
    description: "Personal savings",
    balance: "$8,459.45",
    type: "savings",
  },
  {
    id: "2",
    title: "Checking Account",
    description: "Daily expenses",
    balance: "$2,850.00",
    type: "checking",
  },
  {
    id: "3",
    title: "Investment Portfolio",
    description: "Stock & ETFs",
    balance: "$15,230.80",
    type: "investment",
  },
  {
    id: "4",
    title: "Credit Card",
    description: "Pending charges",
    balance: "$1,200.00",
    type: "debt",
  },
  {
    id: "5",
    title: "Savings Account",
    description: "Emergency fund",
    balance: "$3,000.00",
    type: "savings",
  },
]

export default function List03({ totalBalance = "$26,540.25", accounts = ACCOUNTS, className }) {
  return (
    <div className={`w-full max-w-xl mx-auto bg-[#1F1F23] border border-[#2B2B30] rounded-xl shadow-sm ${className}`}>
      <div className="p-4 border-b border-[#2B2B30]">
        <p className="text-xs text-gray-400">Total Balance</p>
        <h1 className="text-2xl font-semibold text-white">{totalBalance}</h1>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium text-white">Your Accounts</h2>
        </div>

        <div className="space-y-1">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="group flex items-center justify-between p-2 rounded-lg hover:bg-[#2B2B30] transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${
                  account.type === "savings" ? "bg-emerald-900/30" :
                  account.type === "checking" ? "bg-blue-900/30" :
                  account.type === "investment" ? "bg-purple-900/30" : "bg-red-900/30"}`}>
                  {account.type === "savings" && <Wallet className="w-3.5 h-3.5 text-emerald-400" />}
                  {account.type === "checking" && <QrCode className="w-3.5 h-3.5 text-blue-400" />}
                  {account.type === "checking" && <QrCode className="w-3.5 h-3.5 text-blue-400" />}
                  {account.type === "investment" && <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />}
                  {account.type === "debt" && <CreditCard className="w-3.5 h-3.5 text-red-400" />}
                </div>
                <div>
                  <h3 className="text-xs font-medium text-white">{account.title}</h3>
                  {account.description && (
                    <p className="text-[11px] text-gray-400">{account.description}</p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-medium text-white">{account.balance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 border-t border-[#2B2B30]">
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium bg-[#2B2B30] text-white hover:bg-[#3B3B40] transition-all duration-200"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium bg-[#2B2B30] text-white hover:bg-[#3B3B40] transition-all duration-200"
          >
            <SendHorizontal className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium bg-[#2B2B30] text-white hover:bg-[#3B3B40] transition-all duration-200"
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>Top-up</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium bg-[#2B2B30] text-white hover:bg-[#3B3B40] transition-all duration-200"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
  );
}

