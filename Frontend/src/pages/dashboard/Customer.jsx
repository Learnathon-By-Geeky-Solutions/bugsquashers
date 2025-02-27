import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
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
  icon: PropTypes.element.isRequired,
};

const AccountOverview = ({ user, setUser }) => {
  const handleUpdate = async () => {
    const response = await fetch("http://localhost:5000/api/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Update your account details here</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{user.fullName}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        </div>
        <Button onClick={handleUpdate}>Update Account</Button>
      </CardContent>
    </Card>
  );
};

const CustomerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [user, setUser] = useState({ fullName: "", email: "" });
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      const resDashboard = await fetch(`http://localhost:5000/api/dashboard/${userId}`);
      const dataDashboard = await resDashboard.json();
      setDashboard(dataDashboard);

      const resUser = await fetch(`http://localhost:5000/api/users/${userId}`);
      const dataUser = await resUser.json();
      setUser(dataUser);
    };
    fetchData();
  }, [userId]);

  return (
    <div>
      <Nav />
      <div className="container mx-auto px-4 py-4 space-y-6 pt-20">
        <h1 className="text-3xl font-bold">Customer Dashboard</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard title="Total Orders" value={dashboard?.totalOrders || 0} description="Lifetime orders" icon={<Package className="h-4 w-4 text-muted-foreground" />} />
          <DashboardCard title="Total Spent" value={`$${dashboard?.totalSpent || 0}`} description="Lifetime spend" icon={<CreditCard className="h-4 w-4 text-muted-foreground" />} />
          <DashboardCard title="Saved Addresses" value={dashboard?.savedAddresses || 0} description="Delivery locations" icon={<MapPin className="h-4 w-4 text-muted-foreground" />} />
          <DashboardCard title="Account Age" value={dashboard?.accountAge || "New User"} description="Membership duration" icon={<User className="h-4 w-4 text-muted-foreground" />} />
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="w-full flex overflow-x-auto sm:overflow-visible">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <RecentOrders />
            <AccountOverview user={user} setUser={setUser} />
          </TabsContent>
          <TabsContent value="orders">
            <RecentOrders fullList={true} />
          </TabsContent>
          <TabsContent value="account">
            <AccountOverview user={user} setUser={setUser} />
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
