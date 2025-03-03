import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Headphones } from "lucide-react";

export function RecentOrders() {
  const orders = [
    {
      id: 1,
      product: "Apple AirPods Max",
      category: "NON-00764",
      icon: Headphones,
      iconColor: "#3b82f6",
      quantity: 1,
      price: "$915.00",
      total: "$915.00",
    },
    {
      id: 2,
      product: "Bang & Olufsen",
      category: "HE-TW-0987",
      icon: Headphones,
      iconColor: "#f59e0b",
      quantity: 2,
      price: "$691.00",
      total: "$1382.00",
    },
    {
      id: 3,
      product: "Beats By Dre Studio",
      category: "NON-00764",
      icon: Headphones,
      iconColor: "#ef4444",
      quantity: 4,
      price: "$367.41",
      total: "$1469.64",
    },
    {
      id: 4,
      product: "Bang & Olufsen T554",
      category: "NON-00764",
      icon: Headphones,
      iconColor: "#f59e0b",
      quantity: 1,
      price: "$599.00",
      total: "$599.00",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Table Header */}
        <div className="grid grid-cols-4 text-sm font-medium text-gray-500 mb-2">
          <div>Item</div>
          <div className="text-center">Quantity</div>
          <div className="text-center">Price</div>
          <div className="text-center">Total</div>
        </div>

        {/* Scrollable Orders List */}
        <div className="overflow-y-auto max-h-[400px]"> {/* Adjust max-height as needed */}
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="grid grid-cols-4 items-center">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${order.iconColor}20` }}
                  >
                    <order.icon className="h-5 w-5" style={{ color: order.iconColor }} />
                  </div>
                  <div>
                    <div className="font-medium">{order.product}</div>
                    <div className="text-xs text-gray-500">{order.category}</div>
                  </div>
                </div>
                <div className="text-center">x{order.quantity}</div>
                <div className="text-center">{order.price}</div>
                <div className="text-center">{order.total}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}