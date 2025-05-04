
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, User, Users, Trash, Restaurant } from "lucide-react";

// Mock data for restaurants
const MOCK_RESTAURANTS = [
  {
    id: "1",
    name: "Italian Delight",
    cuisine: "Italian",
    owner: "john@owner.com",
    created: "2025-04-15",
  },
  {
    id: "2",
    name: "Sushi Haven",
    cuisine: "Japanese",
    owner: "lisa@owner.com",
    created: "2025-04-20",
  },
  {
    id: "3",
    name: "Burger Joint",
    cuisine: "American",
    owner: "mike@owner.com",
    created: "2025-04-22",
  },
  {
    id: "4",
    name: "Taco Paradise",
    cuisine: "Mexican",
    owner: "sarah@owner.com",
    created: "2025-04-25",
  },
  {
    id: "5",
    name: "French Bistro",
    cuisine: "French",
    owner: "david@owner.com",
    created: "2025-04-28",
  },
];

// Mock data for users
const MOCK_USERS = [
  {
    id: "u1",
    email: "john@owner.com",
    name: "John Smith",
    type: "owner",
    created: "2025-04-10",
  },
  {
    id: "u2",
    email: "lisa@owner.com",
    name: "Lisa Johnson",
    type: "owner",
    created: "2025-04-12",
  },
  {
    id: "u3",
    email: "mike@owner.com",
    name: "Mike Brown",
    type: "owner",
    created: "2025-04-15",
  },
  {
    id: "u4",
    email: "sarah@owner.com",
    name: "Sarah Davis",
    type: "owner",
    created: "2025-04-18",
  },
  {
    id: "u5",
    email: "david@owner.com",
    name: "David Wilson",
    type: "owner",
    created: "2025-04-20",
  },
  {
    id: "u6",
    email: "emma@customer.com",
    name: "Emma Thompson",
    type: "customer",
    created: "2025-04-21",
  },
  {
    id: "u7",
    email: "alex@customer.com",
    name: "Alex Rodriguez",
    type: "customer",
    created: "2025-04-22",
  },
  {
    id: "u8",
    email: "olivia@customer.com",
    name: "Olivia Parker",
    type: "customer",
    created: "2025-04-24",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState(MOCK_RESTAURANTS);
  const [users, setUsers] = useState(MOCK_USERS);
  const [activeTab, setActiveTab] = useState("overview");

  const deleteRestaurant = (id: string) => {
    setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/")}>View Site</Button>
            <Button variant="destructive" onClick={() => navigate("/login")}>Logout</Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Restaurants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary">{restaurants.length}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Restaurant Owners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-blue-500">
                      {users.filter(user => user.type === "owner").length}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Customers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-green-500">
                      {users.filter(user => user.type === "customer").length}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Restaurants</CardTitle>
                    <CardDescription>Recently added restaurants</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {restaurants.slice(0, 3).map(restaurant => (
                        <li key={restaurant.id} className="flex justify-between items-center text-sm">
                          <span className="font-medium">{restaurant.name}</span>
                          <span className="text-gray-500">{formatDate(restaurant.created)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("restaurants")}>
                      View All Restaurants
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>Recently registered users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {users.slice(0, 3).map(user => (
                        <li key={user.id} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium">{user.name}</span>
                            <span className="text-xs ml-2 bg-gray-100 px-2 py-0.5 rounded-full">
                              {user.type}
                            </span>
                          </div>
                          <span className="text-gray-500">{formatDate(user.created)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("users")}>
                      View All Users
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="restaurants" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Manage Restaurants</h2>
                <Button onClick={() => {/* Add restaurant functionality */}}>
                  Add Restaurant
                </Button>
              </div>
              
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuisine</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {restaurants.map((restaurant) => (
                      <tr key={restaurant.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{restaurant.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {restaurant.cuisine}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {restaurant.owner}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(restaurant.created)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
                            View
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => deleteRestaurant(restaurant.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Manage Users</h2>
                <Button onClick={() => {/* Add user functionality */}}>
                  Add User
                </Button>
              </div>
              
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.type === "owner" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }`}>
                            {user.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.created)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} MenuMaster Admin Panel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
