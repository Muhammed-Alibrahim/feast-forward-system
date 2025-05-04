
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Heart } from "lucide-react";

// Mock data for favorite restaurants
const MOCK_FAVORITES = [
  {
    id: "2",
    name: "Sushi Haven",
    cuisine: "Japanese",
    rating: 4.5,
    location: "Westside Mall",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  },
  {
    id: "4",
    name: "Taco Paradise",
    cuisine: "Mexican",
    rating: 4.3,
    location: "South Street",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  },
];

const Favorites = () => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(MOCK_FAVORITES);

  const viewRestaurant = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter(restaurant => restaurant.id !== id));
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
            <Link to="/favorites" className="text-primary font-medium">My Favorites</Link>
            <Link to="/orders" className="hover:text-primary transition-colors">My Orders</Link>
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
          <h2 className="text-2xl font-bold mb-6">My Favorite Restaurants</h2>
          
          {favorites.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg text-gray-500 mb-4">You don't have any favorite restaurants yet.</p>
              <Button onClick={() => navigate('/browse')}>Browse Restaurants</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((restaurant) => (
                <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{restaurant.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {restaurant.location}
                    </div>
                    <p className="text-sm">{restaurant.cuisine} Cuisine</p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span>{restaurant.rating}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromFavorites(restaurant.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Heart className="h-4 w-4 fill-current mr-1" />
                      Remove
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => viewRestaurant(restaurant.id)}
                    >
                      View Menu
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

export default Favorites;
