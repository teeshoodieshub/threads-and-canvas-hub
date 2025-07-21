
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Palette, Star, Truck, Shield, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featuredCategories = [
    {
      name: "T-Shirts",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      count: "50+ designs"
    },
    {
      name: "Hoodies",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
      count: "30+ designs"
    },
    {
      name: "Sweatshirts",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
      count: "25+ designs"
    }
  ];

  const features = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Custom Design",
      description: "Upload your own designs or choose from our collection"
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "Quick printing and delivery within 3-5 business days"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality Guarantee",
      description: "Premium materials and printing quality guaranteed"
    },
    {
      icon: <HeadphonesIcon className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Customer support available around the clock"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">T&H</span>
              </div>
              <span className="text-xl font-semibold text-foreground">
                Tees & Hoodies Hub
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-10">
              <Link to="/" className="text-foreground font-medium">Home</Link>
              <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
              <Link to="/design" className="text-muted-foreground hover:text-foreground transition-colors">Design Your Own</Link>
              <Link to="/cart" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
              </Link>
            </div>

            <Button asChild className="hidden md:flex bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/design">Start Designing</Link>
            </Button>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-foreground"></div>
                <div className="w-full h-0.5 bg-foreground"></div>
                <div className="w-full h-0.5 bg-foreground"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-6 py-4 space-y-3">
              <Link to="/" className="block py-2 text-foreground font-medium">Home</Link>
              <Link to="/shop" className="block py-2 text-muted-foreground">Shop</Link>
              <Link to="/design" className="block py-2 text-muted-foreground">Design Your Own</Link>
              <Link to="/cart" className="block py-2 text-muted-foreground">Cart</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8">
                Express yourself
                <span className="block text-muted-foreground">
                  every day
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg">
                Create custom apparel that speaks your unique style. 
                High-quality printing and thoughtful design made simple.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
                  <Link to="/design">Start designing</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border hover:bg-muted/50">
                  <Link to="/shop">Browse products</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop" 
                  alt="Custom apparel showcase"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Featured Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular apparel categories, designed for comfort and style
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCategories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-500 border-0 bg-background overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count}</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link to={`/shop?category=${category.name.toLowerCase()}`}>
                        Browse {category.name}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why choose us?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make custom apparel simple, fast, and accessible for everyone
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-2xl text-accent-foreground mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to create your perfect apparel?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust us with their custom designs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/design">Start designing now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/shop">Browse products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">T&H</span>
                </div>
                <span className="text-lg font-semibold text-foreground">Tees & Hoodies Hub</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">Creating custom apparel that speaks your unique style.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link></li>
                <li><Link to="/design" className="hover:text-foreground transition-colors">Design</Link></li>
                <li><Link to="/cart" className="hover:text-foreground transition-colors">Cart</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Categories</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">T-Shirts</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Hoodies</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Sweatshirts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Tees & Hoodies Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
