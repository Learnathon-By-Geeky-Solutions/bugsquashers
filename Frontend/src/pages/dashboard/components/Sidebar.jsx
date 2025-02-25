"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {
  BarChart2,
  Receipt,
  Building2,
  CreditCard,
  Folder,
  Wallet,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
  Home,
} from "lucide-react"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({ to, icon: Icon, children }) {
    return (
      <Link
        to={to}
        onClick={handleNavigation}
        className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-300 hover:text-white hover:bg-[#1F1F23]"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-background shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-300" />
      </button>
      <nav
        className={`
          fixed inset-y-0 left-0 z-[70] w-64 bg-background transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:w-64 border-r border-[#1F1F23]
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          <Link to="/" className="h-16 px-6 flex items-center border-b border-[#1F1F23]">
            <div className="flex items-center gap-3">
              <img src="https://kokonutui.com/logo.svg" alt="Acme" className="w-8 h-8 flex-shrink-0" />
              <span className="text-lg font-semibold hover:cursor-pointer text-white">KokonutUI</span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Overview</div>
                <div className="space-y-1">
                  <NavItem to="/dashboard" icon={Home}>
                    Dashboard
                  </NavItem>
                  <NavItem to="#" icon={BarChart2}>
                    Analytics
                  </NavItem>
                  <NavItem to="#" icon={Building2}>
                    Organization
                  </NavItem>
                  <NavItem to="#" icon={Folder}>
                    Projects
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Finance</div>
                <div className="space-y-1">
                  <NavItem to="#" icon={Wallet}>
                    Transactions
                  </NavItem>
                  <NavItem to="#" icon={Receipt}>
                    Invoices
                  </NavItem>
                  <NavItem to="#" icon={CreditCard}>
                    Payments
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Team</div>
                <div className="space-y-1">
                  <NavItem to="#" icon={Users2}>
                    Members
                  </NavItem>
                  <NavItem to="#" icon={Shield}>
                    Permissions
                  </NavItem>
                  <NavItem to="#" icon={MessagesSquare}>
                    Chat
                  </NavItem>
                  <NavItem to="#" icon={Video}>
                    Meetings
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem to="#" icon={Settings}>
                Settings
              </NavItem>
              <NavItem to="#" icon={HelpCircle}>
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

