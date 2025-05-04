
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import MenuEditor from "./pages/dashboard/MenuEditor";
import Browse from "./pages/customer/Browse";
import RestaurantDetail from "./pages/customer/RestaurantDetail";
import Favorites from "./pages/customer/Favorites";
import Orders from "./pages/customer/Orders";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Restaurant Owner Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/menu/edit/:id" element={<MenuEditor />} />
          
          {/* Customer Routes */}
          <Route path="/browse" element={<Browse />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
