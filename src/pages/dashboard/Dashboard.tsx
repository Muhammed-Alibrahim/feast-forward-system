
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, QrCode, Eye, Menu, User } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger
} from "@/components/ui/sidebar";

// Mock data for menus
const mockMenus = [
  {
    id: "1",
    name: "Main Menu",
    categories: 5,
    items: 32,
    lastUpdated: "2023-04-15T12:00:00Z",
    views: 1245,
    status: "published"
  },
  {
    id: "2",
    name: "Lunch Special",
    categories: 3,
    items: 18,
    lastUpdated: "2023-04-10T12:00:00Z",
    views: 875,
    status: "published"
  },
  {
    id: "3",
    name: "Dinner Special",
    categories: 4,
    items: 26,
    lastUpdated: "2023-04-05T12:00:00Z",
    views: 642,
    status: "draft"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState(mockMenus);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenus = menus.filter(menu => 
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateMenu = () => {
    navigate("/dashboard/menu/edit/new");
  };

  const handleEditMenu = (id: string) => {
    navigate(`/dashboard/menu/edit/${id}`);
  };

  const handleDeleteMenu = (id: string) => {
    // In a real application, you would call an API to delete the menu
    setMenus(menus.filter(menu => menu.id !== id));
    toast({
      title: "Menu deleted",
      description: "The menu has been successfully deleted",
    });
  };

  const handleViewMenu = (id: string) => {
    // In a real application, this would navigate to the public menu view
    window.open(`/menu/${id}`, "_blank");
  };

  const handleGenerateQR = (id: string) => {
    toast({
      title: "QR Code Generated",
      description: "Your QR code has been generated and is ready to download",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Menu className="h-6 w-6" />
              <span className="text-lg font-bold">MenuMaster</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={true}>
                      <Link to="/dashboard">
                        <Home className="h-4 w-4" />
                        <span>Overview</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/analytics">
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/orders">
                        <ShoppingCart className="h-4 w-4" />
                        <span>Orders</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/profile">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/settings">
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {
                navigate("/login");
                toast({ title: "Logged out" });
              }}
            >
              Log out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="border-b">
            <div className="flex h-16 items-center px-4 gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="ml-auto flex items-center gap-4">
                <Button 
                  onClick={handleCreateMenu}
                  className="gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Create Menu
                </Button>
              </div>
            </div>
          </header>

          <main className="container mx-auto p-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Digital Menus</h2>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-500">Manage and edit your restaurant menus</p>
                <div className="w-64">
                  <Input
                    type="search"
                    placeholder="Search menus..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredMenus.map((menu) => (
                  <Card key={menu.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{menu.name}</CardTitle>
                        <span className={`text-xs py-1 px-2 rounded-full ${menu.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {menu.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <CardDescription>
                        Last updated: {new Date(menu.lastUpdated).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Categories</p>
                          <p className="font-medium">{menu.categories}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Items</p>
                          <p className="font-medium">{menu.items}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Views</p>
                          <p className="font-medium">{menu.views}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEditMenu(menu.id)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleViewMenu(menu.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleGenerateQR(menu.id)}
                      >
                        <QrCode className="h-4 w-4 mr-1" />
                        QR Code
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:border-red-300 flex-1"
                        onClick={() => handleDeleteMenu(menu.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredMenus.length === 0 && (
                <Card className="text-center p-8">
                  <CardContent>
                    <div className="mx-auto my-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                      <Menu className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium">No menus found</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {searchTerm ? "Try adjusting your search term" : "Get started by creating your first menu"}
                    </p>
                    {!searchTerm && (
                      <Button className="mt-4" onClick={handleCreateMenu}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Menu
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
