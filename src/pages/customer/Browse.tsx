
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Star } from "lucide-react";

// Mock data for restaurant listings (expanded)
const MOCK_RESTAURANTS = [
  {
    id: "1",
    name: "Italian Delight",
    cuisine: "Italian",
    rating: 4.7,
    location: "Downtown",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  },
  {
    id: "2",
    name: "Sushi Haven",
    cuisine: "Japanese",
    rating: 4.5,
    location: "Westside Mall",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  },
  {
    id: "3",
    name: "Burger Joint",
    cuisine: "American",
    rating: 4.2,
    location: "North Avenue",
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
  {
    id: "5",
    name: "French Bistro",
    cuisine: "French",
    rating: 4.8,
    location: "Downtown",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  },
  {
    id: "6",
    name: "Thai Spice",
    cuisine: "Thai",
    rating: 4.4,
    location: "Eastside Plaza",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },
  {
    id: "7",
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.1,
    location: "Central District",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
  {
    id: "8",
    name: "Indian Curry House",
    cuisine: "Indian",
    rating: 4.6,
    location: "Riverside",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
  }
];

const Browse = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(MOCK_RESTAURANTS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setFilteredRestaurants(MOCK_RESTAURANTS);
      return;
    }
    
    const filtered = MOCK_RESTAURANTS.filter(
      restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredRestaurants(filtered);
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
            <Link to="/browse" className="hover:text-primary transition-colors font-medium">Browse</Link>
            <Link to="/favorites" className="hover:text-primary transition-colors">My Favorites</Link>
            <Link to="/orders" className="hover:text-primary transition-colors">My Orders</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/register")}>Sign Up</Button>
          </div>
        </div>
      </header>
      
      {/* Search Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Find Restaurants & Menus
          </h2>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search by restaurant name, cuisine, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>
      
      {/* Restaurant Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Popular Restaurants</h2>
          
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No restaurants found matching your search criteria.</p>
              <Button variant="link" onClick={() => setFilteredRestaurants(MOCK_RESTAURANTS)}>
                Clear search
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map((restaurant) => (
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
                  <CardFooter>
                    <Button 
                      variant="default" 
                      className="w-full"
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

export default Browse;
