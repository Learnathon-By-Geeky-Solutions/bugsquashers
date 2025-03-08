"use client"

import { useState, useEffect } from "react"
import PropTypes from 'prop-types'; // Added import for PropTypes
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import {
  BarChart3,
  Calendar,
  Clipboard,
  Loader2,
  TreesIcon as Plant,
  RefreshCw,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Progress } from "../../components/ui/progress"

// Demo Data for Orders
const demoOrders = [
  { id: "1", crop: "Wheat", quantity: "100 kg", price: "$500", status: "Pending", date: "2025-03-01" },
  { id: "2", crop: "Rice", quantity: "50 kg", price: "$300", status: "Delivered", date: "2025-02-28" },
  { id: "3", crop: "Corn", quantity: "200 kg", price: "$600", status: "Processing", date: "2025-03-05" },
  { id: "4", crop: "Barley", quantity: "75 kg", price: "$375", status: "Pending", date: "2025-03-07" },
  { id: "5", crop: "Soybeans", quantity: "150 kg", price: "$750", status: "Delivered", date: "2025-02-25" },
]

// Demo Data for Crops
const demoCrops = [
  { id: "1", name: "Tomato", price: "$10/kg", stock: "500 kg", season: "Summer" },
  { id: "2", name: "Potato", price: "$5/kg", stock: "1200 kg", season: "All Year" },
  { id: "3", name: "Carrot", price: "$3/kg", stock: "800 kg", season: "Winter" },
  { id: "4", name: "Lettuce", price: "$7/kg", stock: "300 kg", season: "Spring" },
  { id: "5", name: "Cucumber", price: "$4/kg", stock: "600 kg", season: "Summer" },
]

// Demo Data for Reviews
const demoReviews = [
  { id: "1", customer: "John Doe", rating: 5, comment: "Excellent quality produce!", date: "2025-02-28" },
  { id: "2", customer: "Jane Smith", rating: 4, comment: "Fresh and tasty vegetables.", date: "2025-03-01" },
  { id: "3", customer: "Robert Johnson", rating: 5, comment: "Best organic farm in the region!", date: "2025-03-05" },
]

// Demo Data for Statistics
const demoStats = {
  totalRevenue: "$12,500",
  totalOrders: 48,
  averageRating: 4.7,
  topCrop: "Wheat",
  monthlySales: [
    { month: "Jan", amount: 5200 },
    { month: "Feb", amount: 7800 },
    { month: "Mar", amount: 9500 },
  ],
  cropDistribution: [
    { crop: "Wheat", percentage: 40 },
    { crop: "Rice", percentage: 25 },
    { crop: "Corn", percentage: 20 },
    { crop: "Others", percentage: 15 },
  ],
}

export default function FarmerDashboard() {
  return (
    <div className="container mx-auto p-4 space-y-6 mt-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Manage your farm operations, crops, and orders in one place.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            March 8, 2025
          </Button>
          <Button size="sm">
            <Plant className="mr-2 h-4 w-4" />
            Add New Crop
          </Button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={demoStats.totalRevenue}
          description="Last 30 days"
          icon={<TrendingUp className="h-4 w-4 text-green-500" />}
          trend="+12.5%"
          trendDirection="up"
        />
        <StatCard
          title="Total Orders"
          value={demoStats.totalOrders.toString()}
          description="Last 30 days"
          icon={<ShoppingCart className="h-4 w-4 text-blue-500" />}
          trend="+8.2%"
          trendDirection="up"
        />
        <StatCard
          title="Average Rating"
          value={demoStats.averageRating.toString()}
          description="From 27 reviews"
          icon={<Star className="h-4 w-4 text-yellow-500" />}
          trend="+0.3"
          trendDirection="up"
        />
        <StatCard
          title="Top Selling Crop"
          value={demoStats.topCrop}
          description="By volume"
          icon={<BarChart3 className="h-4 w-4 text-purple-500" />}
          trend="Consistent"
          trendDirection="neutral"
        />
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="orders">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="crops">
            <Plant className="mr-2 h-4 w-4" />
            Crops
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <Star className="mr-2 h-4 w-4" />
            Reviews
          </TabsTrigger>
          <TabsTrigger value="statistics">
            <BarChart3 className="mr-2 h-4 w-4" />
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <OrdersDashboard />
        </TabsContent>

        <TabsContent value="crops" className="space-y-4">
          <CropsDashboard />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <ReviewsDashboard />
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <StatisticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// StatCard Component
function StatCard({ title, value, description, icon, trend, trendDirection }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="rounded-full bg-muted p-2">{icon}</div>
          <div
            className={`text-sm font-medium flex items-center ${
              trendDirection === "up" ? "text-green-500" : trendDirection === "down" ? "text-red-500" : "text-gray-500"
            }`}
          >
            {trend}
            {trendDirection === "up" && <TrendingUp className="ml-1 h-3 w-3" />}
            {trendDirection === "down" && <TrendingUp className="ml-1 h-3 w-3 rotate-180" />}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

// Added PropTypes for StatCard
StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  trend: PropTypes.string.isRequired,
  trendDirection: PropTypes.oneOf(['up', 'down', 'neutral']).isRequired,
};

// OrdersDashboard Component
function OrdersDashboard() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchOrders = async () => {
    try {
      setLoading(true)
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setOrders(demoOrders) // Use demo data
    } catch {
      setError("Failed to fetch orders. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleRefresh = () => {
    fetchOrders()
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
            <CardDescription>Manage and track your customer orders</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <Loader2 className="animate-spin mx-auto h-6 w-6" />
                  <p className="text-sm text-muted-foreground mt-2">Loading orders...</p>
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <Clipboard className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">No orders found.</p>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.crop}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Delivered" ? "success" : order.status === "Processing" ? "warning" : "default"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => alert(`Update status for order ${order.id}`)}>
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {orders.length} of {orders.length} orders
        </p>
        <Button variant="outline" size="sm">
          View All Orders
        </Button>
      </CardFooter>
    </Card>
  )
}

// CropsDashboard Component
function CropsDashboard() {
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchCrops = async () => {
    try {
      setLoading(true)
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCrops(demoCrops) // Use demo data
    } catch {
      setError("Failed to fetch crops. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCrops()
  }, [])

  const handleRefresh = () => {
    fetchCrops()
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Crop Inventory</CardTitle>
            <CardDescription>Manage your crop inventory and pricing</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Available Stock</TableHead>
              <TableHead>Season</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <Loader2 className="animate-spin mx-auto h-6 w-6" />
                  <p className="text-sm text-muted-foreground mt-2">Loading crops...</p>
                </TableCell>
              </TableRow>
            ) : crops.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <Plant className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">No crops found.</p>
                </TableCell>
              </TableRow>
            ) : (
              crops.map((crop) => (
                <TableRow key={crop.id}>
                  <TableCell className="font-medium">{crop.name}</TableCell>
                  <TableCell>{crop.price}</TableCell>
                  <TableCell>{crop.stock}</TableCell>
                  <TableCell>{crop.season}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => alert(`Edit crop ${crop.id}`)}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => alert(`Update stock for crop ${crop.id}`)}>
                        Update Stock
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {crops.length} of {crops.length} crops
        </p>
        <Button variant="outline" size="sm">
          Add New Crop
        </Button>
      </CardFooter>
    </Card>
  )
}

// ReviewsDashboard Component
function ReviewsDashboard() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setReviews(demoReviews)
      setLoading(false)
    }

    fetchReviews()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Customer Reviews</CardTitle>
        <CardDescription>See what your customers are saying about your products</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="animate-spin h-6 w-6" />
            <p className="text-sm text-muted-foreground mt-2">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Star className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">No reviews available yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="border border-muted">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{review.customer}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View All Reviews
        </Button>
      </CardFooter>
    </Card>
  )
}

// StatisticsDashboard Component
function StatisticsDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Monthly Sales</CardTitle>
          <CardDescription>Revenue for the last 3 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-end justify-between gap-2 pt-4">
            {demoStats.monthlySales.map((item) => {
              const height = (item.amount / 10000) * 100
              return (
                <div key={item.month} className="flex flex-col items-center gap-2">
                  <div className="w-16 bg-primary rounded-t-md" style={{ height: `${height}%` }}></div>
                  <div className="text-sm font-medium">{item.month}</div>
                  <div className="text-sm text-muted-foreground">${item.amount}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Crop Distribution</CardTitle>
          <CardDescription>Sales distribution by crop type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demoStats.cropDistribution.map((item) => (
              <div key={item.crop} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.crop}</span>
                  <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Customer Demographics</CardTitle>
          <CardDescription>Information about your customer base</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Users className="h-16 w-16 mx-auto text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">Customer data visualization coming soon</p>
              <p className="text-sm text-muted-foreground mt-1">
                We&apos;re working on gathering more detailed customer insights for you.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}