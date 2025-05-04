
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Save, Eye, Plus, Trash2, Menu, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Interface definitions
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
}

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

interface MenuData {
  id?: string;
  name: string;
  description: string;
  categories: MenuCategory[];
}

// Mock initial data
const getEmptyMenu = (): MenuData => ({
  name: "",
  description: "",
  categories: [
    {
      id: "cat_" + Date.now(),
      name: "New Category",
      description: "",
      items: []
    }
  ]
});

const MenuEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("content");
  const [menu, setMenu] = useState<MenuData>(getEmptyMenu());
  const [isLoading, setIsLoading] = useState(false);
  const isNewMenu = id === "new";

  // Fetch menu data if editing an existing menu
  useEffect(() => {
    if (!isNewMenu) {
      // In a real app, you would fetch the menu data from Firebase
      // For now, we'll just simulate loading with mock data
      setIsLoading(true);
      setTimeout(() => {
        setMenu({
          id: id,
          name: "Sample Menu",
          description: "A delicious menu with various dishes.",
          categories: [
            {
              id: "cat_1",
              name: "Appetizers",
              description: "Start your meal with these delicious options",
              items: [
                {
                  id: "item_1",
                  name: "Garlic Bread",
                  description: "Toasted bread with garlic butter",
                  price: "5.99",
                  image: "https://images.unsplash.com/photo-1500672860114-9e913f298978"
                },
                {
                  id: "item_2",
                  name: "Mozzarella Sticks",
                  description: "Breaded and deep-fried mozzarella cheese",
                  price: "7.99"
                }
              ]
            },
            {
              id: "cat_2",
              name: "Main Courses",
              description: "Hearty meals for your satisfaction",
              items: [
                {
                  id: "item_3",
                  name: "Pasta Carbonara",
                  description: "Classic Italian pasta with eggs, cheese, and pancetta",
                  price: "14.99"
                }
              ]
            }
          ]
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [id, isNewMenu]);

  // Handle menu name and description changes
  const handleMenuChange = (field: keyof MenuData, value: string) => {
    setMenu({
      ...menu,
      [field]: value
    });
  };

  // Handle category changes
  const handleCategoryChange = (categoryId: string, field: keyof MenuCategory, value: string) => {
    setMenu({
      ...menu,
      categories: menu.categories.map(category => 
        category.id === categoryId ? { ...category, [field]: value } : category
      )
    });
  };

  // Handle item changes
  const handleItemChange = (categoryId: string, itemId: string, field: keyof MenuItem, value: string) => {
    setMenu({
      ...menu,
      categories: menu.categories.map(category => 
        category.id === categoryId 
          ? {
              ...category,
              items: category.items.map(item =>
                item.id === itemId ? { ...item, [field]: value } : item
              )
            } 
          : category
      )
    });
  };

  // Add a new category
  const handleAddCategory = () => {
    setMenu({
      ...menu,
      categories: [
        ...menu.categories,
        {
          id: "cat_" + Date.now(),
          name: "New Category",
          description: "",
          items: []
        }
      ]
    });
  };

  // Delete a category
  const handleDeleteCategory = (categoryId: string) => {
    setMenu({
      ...menu,
      categories: menu.categories.filter(category => category.id !== categoryId)
    });
  };

  // Add a new item to a category
  const handleAddItem = (categoryId: string) => {
    setMenu({
      ...menu,
      categories: menu.categories.map(category => 
        category.id === categoryId 
          ? {
              ...category,
              items: [
                ...category.items,
                {
                  id: "item_" + Date.now(),
                  name: "New Item",
                  description: "",
                  price: "0.00"
                }
              ]
            } 
          : category
      )
    });
  };

  // Delete an item from a category
  const handleDeleteItem = (categoryId: string, itemId: string) => {
    setMenu({
      ...menu,
      categories: menu.categories.map(category => 
        category.id === categoryId 
          ? {
              ...category,
              items: category.items.filter(item => item.id !== itemId)
            } 
          : category
      )
    });
  };

  // Move category up or down
  const handleMoveCategory = (categoryId: string, direction: "up" | "down") => {
    const categoryIndex = menu.categories.findIndex(cat => cat.id === categoryId);
    if ((direction === "up" && categoryIndex === 0) || 
        (direction === "down" && categoryIndex === menu.categories.length - 1)) {
      return;
    }

    const newCategories = [...menu.categories];
    const newIndex = direction === "up" ? categoryIndex - 1 : categoryIndex + 1;
    
    [newCategories[categoryIndex], newCategories[newIndex]] = 
    [newCategories[newIndex], newCategories[categoryIndex]];
    
    setMenu({
      ...menu,
      categories: newCategories
    });
  };

  // Move item up or down within a category
  const handleMoveItem = (categoryId: string, itemId: string, direction: "up" | "down") => {
    const categoryIndex = menu.categories.findIndex(cat => cat.id === categoryId);
    const category = menu.categories[categoryIndex];
    const itemIndex = category.items.findIndex(item => item.id === itemId);
    
    if ((direction === "up" && itemIndex === 0) || 
        (direction === "down" && itemIndex === category.items.length - 1)) {
      return;
    }

    const newItems = [...category.items];
    const newIndex = direction === "up" ? itemIndex - 1 : itemIndex + 1;
    
    [newItems[itemIndex], newItems[newIndex]] = [newItems[newIndex], newItems[itemIndex]];
    
    const newCategories = [...menu.categories];
    newCategories[categoryIndex] = {
      ...category,
      items: newItems
    };
    
    setMenu({
      ...menu,
      categories: newCategories
    });
  };

  // Save menu
  const handleSaveMenu = async () => {
    if (!menu.name) {
      toast({
        title: "Error",
        description: "Please enter a menu name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // This would be replaced with actual Firebase data saving
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Menu saved successfully",
      });
      
      // Navigate back to dashboard if this is a new menu
      if (isNewMenu) {
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save menu. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Preview menu
  const handlePreviewMenu = () => {
    toast({
      title: "Preview Mode",
      description: "This would open a preview of your menu",
    });
    // In a real app, you might open a modal or a new tab to show the preview
  };

  if (isLoading && !isNewMenu) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">{isNewMenu ? "Create New Menu" : "Edit Menu"}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePreviewMenu}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSaveMenu} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="menu-name">Menu Name</Label>
                    <Input
                      id="menu-name"
                      value={menu.name}
                      onChange={(e) => handleMenuChange("name", e.target.value)}
                      placeholder="Enter menu name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="menu-description">Description</Label>
                    <Textarea
                      id="menu-description"
                      value={menu.description}
                      onChange={(e) => handleMenuChange("description", e.target.value)}
                      placeholder="Enter a brief description of your menu"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Menu Categories</h2>
                <Button onClick={handleAddCategory} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
              
              {menu.categories.map((category, catIndex) => (
                <Card key={category.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gray-50 p-4 border-b">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex-1">
                          <Label htmlFor={`category-${category.id}-name`} className="sr-only">
                            Category Name
                          </Label>
                          <Input
                            id={`category-${category.id}-name`}
                            value={category.name}
                            onChange={(e) => handleCategoryChange(category.id, "name", e.target.value)}
                            placeholder="Category Name"
                            className="font-medium"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveCategory(category.id, "up")}
                            disabled={catIndex === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveCategory(category.id, "down")}
                            disabled={catIndex === menu.categories.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCategory(category.id)}
                            disabled={menu.categories.length <= 1}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Label htmlFor={`category-${category.id}-description`} className="sr-only">
                          Category Description
                        </Label>
                        <Textarea
                          id={`category-${category.id}-description`}
                          value={category.description}
                          onChange={(e) => handleCategoryChange(category.id, "description", e.target.value)}
                          placeholder="Category Description"
                          className="min-h-[60px]"
                        />
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold">Items in {category.name}</h3>
                        <Button onClick={() => handleAddItem(category.id)} size="sm" variant="outline">
                          <Plus className="h-3 w-3 mr-1" />
                          Add Item
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {category.items.length === 0 ? (
                          <div className="text-center p-8 border border-dashed rounded-lg">
                            <Menu className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No items in this category</p>
                            <Button onClick={() => handleAddItem(category.id)} size="sm" className="mt-2">
                              <Plus className="h-3 w-3 mr-1" />
                              Add First Item
                            </Button>
                          </div>
                        ) : (
                          category.items.map((item, itemIndex) => (
                            <div key={item.id} className="border rounded-lg overflow-hidden">
                              <div className="p-3 bg-white">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex-1">
                                    <Label htmlFor={`item-${item.id}-name`} className="sr-only">
                                      Item Name
                                    </Label>
                                    <Input
                                      id={`item-${item.id}-name`}
                                      value={item.name}
                                      onChange={(e) => handleItemChange(category.id, item.id, "name", e.target.value)}
                                      placeholder="Item Name"
                                      className="font-medium"
                                    />
                                  </div>
                                  <div className="w-24">
                                    <Label htmlFor={`item-${item.id}-price`} className="sr-only">
                                      Price
                                    </Label>
                                    <Input
                                      id={`item-${item.id}-price`}
                                      value={item.price}
                                      onChange={(e) => handleItemChange(category.id, item.id, "price", e.target.value)}
                                      placeholder="Price"
                                      className="text-right"
                                    />
                                  </div>
                                </div>
                                
                                <div className="mt-2">
                                  <Label htmlFor={`item-${item.id}-description`} className="sr-only">
                                    Item Description
                                  </Label>
                                  <Textarea
                                    id={`item-${item.id}-description`}
                                    value={item.description}
                                    onChange={(e) => handleItemChange(category.id, item.id, "description", e.target.value)}
                                    placeholder="Item Description"
                                    className="min-h-[60px]"
                                  />
                                </div>
                                
                                <div className="mt-2 flex justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleMoveItem(category.id, item.id, "up")}
                                    disabled={itemIndex === 0}
                                  >
                                    <ArrowUp className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleMoveItem(category.id, item.id, "down")}
                                    disabled={itemIndex === category.items.length - 1}
                                  >
                                    <ArrowDown className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteItem(category.id, item.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6">
                <div className="text-center p-8">
                  <h3 className="text-lg font-medium mb-2">Menu Settings</h3>
                  <p className="text-gray-500 mb-4">
                    Configure visibility, availability, and other settings for your menu.
                  </p>
                  <p className="text-sm text-gray-400">
                    This section will be implemented in a future update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="design">
            <Card>
              <CardContent className="p-6">
                <div className="text-center p-8">
                  <h3 className="text-lg font-medium mb-2">Menu Design</h3>
                  <p className="text-gray-500 mb-4">
                    Customize the appearance of your menu with themes, colors, and fonts.
                  </p>
                  <p className="text-sm text-gray-400">
                    This section will be implemented in a future update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MenuEditor;
