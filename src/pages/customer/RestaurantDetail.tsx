
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, MapPin, Phone, Clock, Star } from "lucide-react";

// Mock data for the restaurant
const MOCK_RESTAURANT = {
  id: "1",
  name: "Italian Delight",
  description: "Authentic Italian cuisine in a cozy atmosphere",
  cuisine: "Italian",
  rating: 4.7,
  location: "123 Main St, Downtown",
  phone: "(555) 123-4567",
  hours: "Mon-Sun: 11:00 AM - 10:00 PM",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  menu: {
    categories: [
      {
        id: "cat_1",
        name: "Appetizers",
        description: "Start your meal with these delicious options",
        items: [
          {
            id: "item_1",
            name: "Bruschetta",
            description: "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil",
            price: "8.99",
          },
          {
            id: "item_2",
            name: "Fried Calamari",
            description: "Tender calamari, lightly battered and fried, served with marinara sauce",
            price: "12.99",
          },
          {
            id: "item_3",
            name: "Caprese Salad",
            description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze",
            price: "9.99",
          }
        ]
      },
      {
        id: "cat_2",
        name: "Pasta",
        description: "Homemade pasta dishes",
        items: [
          {
            id: "item_4",
            name: "Spaghetti Carbonara",
            description: "Spaghetti with a creamy sauce of eggs, cheese, pancetta, and black pepper",
            price: "16.99",
          },
          {
            id: "item_5",
            name: "Fettuccine Alfredo",
            description: "Fettuccine tossed with butter and Parmesan cheese",
            price: "15.99",
          },
          {
            id: "item_6",
            name: "Lasagna",
            description: "Layers of pasta, ricotta cheese, and meat sauce topped with mozzarella",
            price: "17.99",
          }
        ]
      },
      {
        id: "cat_3",
        name: "Desserts",
        description: "Sweet endings to your meal",
        items: [
          {
            id: "item_7",
            name: "Tiramisu",
            description: "Coffee-flavored Italian dessert made of ladyfingers dipped in coffee and mascarpone cheese",
            price: "7.99",
          },
          {
            id: "item_8",
            name: "Cannoli",
            description: "Fried pastry tubes filled with a sweet, creamy filling with chocolate chips",
            price: "6.99",
          }
        ]
      }
    ]
  }
};

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("menu");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the restaurant data based on ID
    // For now, we'll use mock data
    setIsLoading(true);
    setTimeout(() => {
      setRestaurant(MOCK_RESTAURANT);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading restaurant information...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Restaurant Not Found</h2>
          <p className="mb-6 text-gray-600">We couldn't find the restaurant you're looking for.</p>
          <Button onClick={() => navigate("/browse")}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Button>
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
            <Button variant="ghost" size="icon" onClick={() => navigate("/browse")}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Restaurant Details</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="default" onClick={() => navigate("/order/new/" + id)}>
              Order Now
            </Button>
          </div>
        </div>
      </header>

      {/* Restaurant Hero */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-6">
            <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
            <div className="flex items-center text-white/90 mb-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span>{restaurant.rating}</span>
              <span className="mx-2">•</span>
              <span>{restaurant.cuisine}</span>
            </div>
            <div className="flex items-center text-white/80">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{restaurant.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="menu" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="info">Restaurant Info</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu" className="space-y-6">
            {restaurant.menu.categories.map((category: any) => (
              <div key={category.id} className="space-y-4">
                <div className="border-b pb-2">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  {category.description && (
                    <p className="text-gray-600">{category.description}</p>
                  )}
                </div>
                
                <div className="space-y-4">
                  {category.items.map((item: any) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div className="space-y-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <div className="font-semibold">${item.price}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="info">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">About</h3>
                  <p>{restaurant.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-gray-600">{restaurant.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-gray-600">{restaurant.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Hours</h4>
                      <p className="text-gray-600">{restaurant.hours}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews">
            <Card>
              <CardContent className="p-6">
                <p className="text-center py-8 text-gray-500">
                  Reviews coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RestaurantDetail;
