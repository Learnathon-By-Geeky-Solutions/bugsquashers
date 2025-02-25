import { Calendar, CreditCard, Wallet } from "lucide-react"
import List01 from "./List01"
import List02 from "./List02"
import List03 from "./List03"

export default function Content() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-muted rounded-xl p-6 flex flex-col border border-[#2B2B30]">
          <h2 className="text-lg font-bold text-white mb-4 text-left flex items-center gap-2 ">
            <Wallet className="w-3.5 h-3.5 text-white" />
            Accounts
          </h2>
          <div className="flex-1">
            <List01 className="h-full" />
          </div>
        </div>
        <div className="bg-muted rounded-xl p-6 flex flex-col border border-[#2B2B30]">
          <h2 className="text-lg font-bold text-white mb-4 text-left flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-white" />
            Recent Transactions
          </h2>
          <div className="flex-1">
            <List02 className="h-full" />
          </div>
        </div>
      </div>

      <div className="bg-[#1F1F23] rounded-xl p-6 flex flex-col items-start justify-start border border-[#2B2B30]">
        <h2 className="text-lg font-bold text-white mb-4 text-left flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-white" />
          Upcoming Events
        </h2>
        <List03 />
      </div>
    </div>
  )
}

