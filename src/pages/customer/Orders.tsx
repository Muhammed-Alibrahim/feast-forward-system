
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for orders
const MOCK_ORDERS = [
  {
    id: "ord-001",
    restaurantId: "1",
    restaurantName: "Italian Delight",
    date: "2025-05-03",
    status: "delivered",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 12.99 },
      { name: "Tiramisu", quantity: 1, price: 6.50 }
    ],
    total: 19.49
  },
  {
    id: "ord-002",
    restaurantId: "2",
    restaurantName: "Sushi Haven",
    date: "2025-05-01",
    status: "delivered",
    items: [
      { name: "Dragon Roll", quantity: 2, price: 14.99 },
      { name: "Miso Soup", quantity: 1, price: 3.50 }
    ],
    total: 33.48
  }
];

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return "bg-blue-100 text-blue-800";
      case 'delivered': return "bg-green-100 text-green-800";
      case 'cancelled': return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const viewRestaurant = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">MenuMaster</h1>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/browse" className="hover:text-primary transition-colors">Browse</Link>
            <Link to="/favorites" className="hover:text-primary transition-colors">My Favorites</Link>
            <Link to="/orders" className="text-primary font-medium">My Orders</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/register")}>Sign Up</Button>
          </div>
        </div>
      </header>
      
      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">My Orders</h2>
          
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg text-gray-500 mb-4">You haven't placed any orders yet.</p>
              <Button onClick={() => navigate('/browse')}>Browse Restaurants</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50">
                    <div className="flex justify-between items-center">
                      <CardTitle>{order.restaurantName}</CardTitle>
                      <Badge className={getStatusColor(order.status)} variant="outline">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {formatDate(order.date)}
                    </div>
                  </CardHeader>
                  <CardContent className="py-4">
                    <h4 className="font-medium mb-2">Order #{order.id}</h4>
                    <ul className="space-y-2">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-gray-600">${item.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t flex justify-between font-medium">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 justify-end">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      Order Details
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => viewRestaurant(order.restaurantId)}
                    >
                      Visit Restaurant
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-800 text-gray-200 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} MenuMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Orders;
