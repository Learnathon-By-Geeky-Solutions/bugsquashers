import {
  BarChart2,
  Box,
  CreditCard,
  Flame,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingBag,
  Users,
  ChevronDown,
} from "lucide-react";
import PropTypes from "prop-types";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";

function SidebarItem({ icon: Icon, label, active, hasSubmenu }) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 px-3 font-normal rounded-sm",
        active ? "bg-accent font-medium" : "text-gray-500 dark:text-gray-400"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {hasSubmenu && <ChevronDown className="ml-auto h-4 w-4" />}
    </Button>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  hasSubmenu: PropTypes.bool,
};

export function Sidebar() {
  return (
    <div className="w-full lg:w-64 h-full border-r bg-background dark:border-gray-700 flex flex-col">
      <div className="flex-1 py-4 space-y-1 overflow-y-auto px-3">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
        <SidebarItem icon={Box} label="Products" hasSubmenu />
        <SidebarItem icon={ShoppingBag} label="Orders" hasSubmenu />
        <SidebarItem icon={Users} label="Customers" hasSubmenu />
        <SidebarItem icon={BarChart2} label="Statistics" />
        <SidebarItem icon={MessageSquare} label="Reviews" />
        <SidebarItem icon={CreditCard} label="Transactions" />
        <SidebarItem icon={Users} label="Sellers" />
        <SidebarItem icon={Flame} label="Hot offers" />
        <SidebarItem icon={Settings} label="Settings" />
      </div>
    </div>
  );
}
