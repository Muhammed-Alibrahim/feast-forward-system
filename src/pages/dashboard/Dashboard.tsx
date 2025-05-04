import React from "react";
import { Home, ShoppingCart } from "lucide-react";
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
          <h2 className="text-3xl font-bold text-center mb-12">Welcome to your Dashboard</h2>
          
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
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-800 text-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} MenuMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
