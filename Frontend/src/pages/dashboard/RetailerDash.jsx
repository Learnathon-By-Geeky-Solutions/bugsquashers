"use client"
import { Bell, Moon ,Menu, Search, Sun } from "lucide-react"
import { useState } from "react"
import { Sidebar } from "./components/sidebar"
import { DashboardHeader } from "./components/dashboard-header"
import { ExpectedEarnings } from "./components/expected-earnings"
import { AverageDailySales } from "./components/average-daily-sales"
import { SalesThisMonth } from "./components/sales-this-month"
import { OrdersThisMonth } from "./components/orders-this-month"
import { NewCustomers } from "./components/new-customers"
import { TodaysHeroes } from "./components/todays-heroes"
import { RecentOrders } from "./components/recent-orders"
import { DiscountedSales } from "./components/discounted-sales"
import { Button } from "../../components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"


function RetailerDash() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }
  return (
    <div className={`min-h-screen flex ${isDarkMode ? "dark" : ""}`}>
    {/* Desktop Sidebar */}
    <div className="hidden lg:block">
      <Sidebar />
    </div>

    {/* Mobile Sidebar */}
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden fixed left-4 top-4 z-50">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>

    <div className="flex-1 bg-background">
      <header className="h-16 border-b bg-background dark:border-gray-700 flex items-center justify-between px-4 lg:px-6">
        {/* Search - Hidden on mobile */}
        <div className="hidden md:block w-72 relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-9 pl-8 pr-4 rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mobile Search Button */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <main className="p-4 lg:p-6 space-y-6">
        <DashboardHeader />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <ExpectedEarnings />
          <AverageDailySales />
          <SalesThisMonth />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <OrdersThisMonth />
          <NewCustomers />
          <TodaysHeroes />
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          <RecentOrders />
          <DiscountedSales />
        </div>
      </main>
    </div>
  </div>
  )
}

export default RetailerDash