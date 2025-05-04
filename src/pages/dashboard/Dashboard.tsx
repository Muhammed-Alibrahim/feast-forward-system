
import React from "react";
import { Home, ShoppingCart, Menu as MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate("/")}>Go to Menu</Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Welcome to your Restaurant Dashboard</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Example Dashboard Cards */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Total Orders</h3>
              <p className="text-3xl font-bold text-primary">125</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Revenue</h3>
              <p className="text-3xl font-bold text-green-500">$5,250</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">New Customers</h3>
              <p className="text-3xl font-bold text-blue-500">42</p>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Your Menus</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">Lunch Menu</h4>
                    <MenuIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <p className="text-gray-600 mb-4">Main lunch offerings with 24 items.</p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => navigate("/dashboard/menu/edit/1")}>
                      Edit
                    </Button>
                    <Button size="sm">View</Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">Dinner Menu</h4>
                    <MenuIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <p className="text-gray-600 mb-4">Evening offerings with premium items.</p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => navigate("/dashboard/menu/edit/2")}>
                      Edit
                    </Button>
                    <Button size="sm">View</Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow border-dashed">
                <div className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <MenuIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Create New Menu</h4>
                  <p className="text-gray-600 mb-4">Add a new menu for a different time or occasion.</p>
                  <Button onClick={() => navigate("/dashboard/menu/edit/new")}>
                    Create Menu
                  </Button>
                </div>
              </div>
            </div>
          </div>
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

export default Dashboard;
