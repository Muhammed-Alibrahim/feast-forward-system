
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Home, Menu as MenuIcon, ShoppingCart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MenuIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">MenuMaster</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/register")}>Get Started</Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Digital Menu Platform for Modern Restaurants
            </h1>
            <p className="text-lg mb-8">
              Create beautiful, interactive digital menus that delight your customers and boost your sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate("/register")}>
                Start Free Trial
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/browse")}>
                Browse Menus
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1582562124811-c09040d0a901" 
              alt="Digital Menu Preview" 
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MenuMaster</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MenuIcon />}
              title="Easy Menu Management"
              description="Create and update your menu items easily with our intuitive drag-and-drop editor."
            />
            <FeatureCard 
              icon={<Home />}
              title="Beautiful Templates"
              description="Choose from dozens of professionally designed templates that match your brand."
            />
            <FeatureCard 
              icon={<ShoppingCart />}
              title="Online Ordering"
              description="Enable customers to place orders directly from your digital menu."
            />
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <PricingCard 
              title="Starter"
              price="$19"
              description="Perfect for small cafes and food trucks"
              features={["1 digital menu", "Basic templates", "QR code generation", "Menu analytics"]}
            />
            <PricingCard 
              title="Professional"
              price="$49"
              description="Ideal for restaurants and bars"
              features={["3 digital menus", "Premium templates", "Online ordering", "Reservation system", "Customer feedback"]}
              highlighted={true}
            />
            <PricingCard 
              title="Enterprise"
              price="$99"
              description="For restaurant groups and chains"
              features={["Unlimited menus", "Custom branding", "API access", "Priority support", "Multi-location management"]}
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TestimonialCard 
              quote="MenuMaster transformed our dining experience. Our customers love the interactive menu and we've seen a 20% increase in orders."
              author="Sarah Johnson"
              role="Owner, The Rustic Table"
            />
            <TestimonialCard 
              quote="The platform is incredibly easy to use and the customer support team is always there when we need them."
              author="Michael Rodriguez"
              role="Manager, Ocean Breeze Restaurant"
            />
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your restaurant's menu?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of restaurants that have already upgraded to digital menus.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => navigate("/register")}
            className="bg-white text-primary hover:bg-gray-100"
          >
            Get Started Now
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-800 text-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">MenuMaster</h3>
              <p>Digital menu platform for modern restaurants.</p>
            </div>
            <div>
              <h4 className="text-md font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} MenuMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Component for feature cards
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card>
    <CardHeader>
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 text-primary" })}
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
    </CardContent>
  </Card>
);

// Component for pricing cards
const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  highlighted = false 
}: { 
  title: string, 
  price: string, 
  description: string, 
  features: string[], 
  highlighted?: boolean 
}) => (
  <Card className={`flex flex-col ${highlighted ? 'border-primary shadow-lg ring-2 ring-primary' : ''}`}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <div className="mt-4">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="h-5 w-5 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button 
        className={`w-full ${highlighted ? 'bg-primary text-white' : ''}`} 
        variant={highlighted ? "default" : "outline"}
      >
        Choose Plan
      </Button>
    </CardFooter>
  </Card>
);

// Component for testimonial cards
const TestimonialCard = ({ quote, author, role }: { quote: string, author: string, role: string }) => (
  <Card>
    <CardContent className="pt-6">
      <svg className="h-8 w-8 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h10zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
      </svg>
      <p className="italic mb-6">{quote}</p>
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-muted-foreground">{role}</p>
      </div>
    </CardContent>
  </Card>
);

export default Index;
