import PropTypes from 'prop-types';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Package, CreditCard, MapPin, User } from "lucide-react";
import RecentOrders from "./components/RecentOrder";
import SavedAddresses from "./components/SavedAddresses";
import Nav from "../../components/Nav/Nav";

const DashboardCard = ({ title, value, description, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
};

const AccountOverview = () => (
  <Card>
    <CardHeader>
      <CardTitle>Account Information</CardTitle>
      <CardDescription>Update your account details here</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">John Doe</h3>
          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="John Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" defaultValue="john.doe@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" defaultValue="+1 (555) 123-4567" />
      </div>
      <Button>Update Account</Button>
    </CardContent>
  </Card>
);

const CustomerDashboard = () => {
  return (
    <div>
      <Nav />
      <div className="container mx-auto px-4 py-4 space-y-6 pt-20">
        <h1 className="text-3xl font-bold">Customer Dashboard</h1>

        {/* Responsive Grid for Dashboard Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Orders"
            value="23"
            description="Lifetime orders"
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Total Spent"
            value="$1,234"
            description="Lifetime spend"
            icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Saved Addresses"
            value="3"
            description="Delivery locations"
            icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Account Age"
            value="2 years"
            description="Member since 2021"
            icon={<User className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        {/* Responsive Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          {/* TabsList with Horizontal Scroll on Mobile */}
          <TabsList className="w-full flex overflow-x-auto sm:overflow-visible">
            <TabsTrigger value="overview" className="flex-shrink-0">
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex-shrink-0">
              Orders
            </TabsTrigger>
            <TabsTrigger value="account" className="flex-shrink-0">
              Account
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex-shrink-0">
              Addresses
            </TabsTrigger>
          </TabsList>

          {/* TabsContent */}
          <TabsContent value="overview" className="space-y-4">
            <RecentOrders />
            <AccountOverview />
          </TabsContent>
          <TabsContent value="orders">
            <RecentOrders fullList={true} />
          </TabsContent>
          <TabsContent value="account">
            <AccountOverview />
          </TabsContent>
          <TabsContent value="addresses">
            <SavedAddresses />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;