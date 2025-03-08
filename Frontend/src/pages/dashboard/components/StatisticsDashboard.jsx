import { ArrowRight, BarChart3, LineChart, PieChart, TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import PropTypes from 'prop-types';

export function StatisticsDashboard() {
  return (
    <div className="min-w-[80vw] p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Statistics</h1>

      <Tabs defaultValue="overview" className="space-y-4 mt-4">
        {/* Tabs List */}
        <div className="overflow-x-auto pb-2">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Revenue"
              value="$45,231.89"
              change="+20.1%"
              trend="up"
              description="vs last month"
              icon={<DollarSign className="h-4 w-4" />}
            />
            <StatCard
              title="Total Orders"
              value="12,345"
              change="+12.3%"
              trend="up"
              description="vs last month"
              icon={<ShoppingBag className="h-4 w-4" />}
            />
            <StatCard
              title="New Customers"
              value="1,234"
              change="+18.7%"
              trend="up"
              description="vs last month"
              icon={<Users className="h-4 w-4" />}
            />
            <StatCard
              title="Conversion Rate"
              value="3.2%"
              change="-0.4%"
              trend="down"
              description="vs last month"
              icon={<TrendingUp className="h-4 w-4" />}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SalesChart />
            <TopProducts />
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CustomerAcquisition />
            <SalesByCategory />
          </div>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>Detailed breakdown of your sales performance over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] sm:h-[400px] flex items-center justify-center border rounded-md">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <LineChart className="h-10 w-10" />
                <p>Sales trend chart would appear here</p>
                <p className="text-sm">Showing data from the last 12 months</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Analysis of your product sales and inventory</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] sm:h-[400px] flex items-center justify-center border rounded-md">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <BarChart3 className="h-10 w-10" />
                <p>Product performance chart would appear here</p>
                <p className="text-sm">Showing top and bottom performing products</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Demographics</CardTitle>
              <CardDescription>Insights into your customer base</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] sm:h-[400px] flex items-center justify-center border rounded-md">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <PieChart className="h-10 w-10" />
                <p>Customer demographics chart would appear here</p>
                <p className="text-sm">Showing age, location, and purchase frequency</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper Components
function StatCard({ title, value, change, trend, description, icon }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        <div className="flex items-center pt-1">
          <span className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"}`}>{change}</span>
          <span className="text-xs text-muted-foreground ml-1">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['up', 'down']).isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

function SalesChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Sales Trend</CardTitle>
        <CardDescription>Daily sales performance for the past 30 days</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center border rounded-md">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <LineChart className="h-10 w-10" />
          <p>Sales trend chart would appear here</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" size="sm">
          View Detailed Report
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function TopProducts() {
  const products = [
    { id: "earbuds", name: "Wireless Earbuds", sales: 1245, growth: "+12.3%" },
    { id: "watch", name: "Smart Watch", sales: 986, growth: "+10.8%" },
    { id: "speaker", name: "Bluetooth Speaker", sales: 765, growth: "+8.4%" },
    { id: "case", name: "Phone Case", sales: 654, growth: "+5.2%" },
    { id: "sleeve", name: "Laptop Sleeve", sales: 543, growth: "+3.7%" },
  ];

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Best performing products by sales volume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
              </div>
              <div className="text-sm text-green-500 font-medium">{product.growth}</div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" size="sm">
          View All Products
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}


function CustomerAcquisition() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Customer Acquisition</CardTitle>
        <CardDescription>New customers by channel</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center border rounded-md">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <PieChart className="h-10 w-10" />
          <p>Customer acquisition chart would appear here</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" size="sm">
          View Customer Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function SalesByCategory() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>Revenue distribution across product categories</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center border rounded-md">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <BarChart3 className="h-10 w-10" />
          <p>Category sales chart would appear here</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" size="sm">
          View Category Analysis
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}