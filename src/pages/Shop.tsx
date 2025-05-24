
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  description: string;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();

  // Mock products data
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Classic Cotton T-Shirt",
        price: 25,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
        category: "t-shirts",
        colors: ["black", "white", "navy", "red"],
        sizes: ["S", "M", "L", "XL"],
        description: "Premium cotton t-shirt perfect for everyday wear"
      },
      {
        id: "2",
        name: "Comfort Hoodie",
        price: 55,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
        category: "hoodies",
        colors: ["black", "gray", "navy"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Cozy hoodie with premium fleece lining"
      },
      {
        id: "3",
        name: "Crew Neck Sweatshirt",
        price: 45,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
        category: "sweatshirts",
        colors: ["gray", "black", "white", "green"],
        sizes: ["S", "M", "L", "XL"],
        description: "Classic crew neck sweatshirt for casual comfort"
      },
      {
        id: "4",
        name: "Vintage Graphic Tee",
        price: 30,
        image: "https://images.unsplash.com/photo-1583743814966-8936f37f4ad2?w=300&h=300&fit=crop",
        category: "t-shirts",
        colors: ["black", "white", "vintage"],
        sizes: ["S", "M", "L", "XL"],
        description: "Retro-style graphic t-shirt with vintage wash"
      },
      {
        id: "5",
        name: "Zip-Up Hoodie",
        price: 65,
        image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=300&h=300&fit=crop",
        category: "hoodies",
        colors: ["black", "gray", "navy", "red"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Full-zip hoodie with kangaroo pocket"
      },
      {
        id: "6",
        name: "Athletic Sweatshirt",
        price: 50,
        image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=300&h=300&fit=crop",
        category: "sweatshirts",
        colors: ["gray", "navy", "black"],
        sizes: ["S", "M", "L", "XL"],
        description: "Performance sweatshirt with moisture-wicking fabric"
      }
    ];
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Filter and search products
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: "M",
      color: product.colors[0]
    });
    toast.success(`${product.name} added to cart!`);
  };

  const categories = [
    { value: "all", label: "All Products" },
    { value: "t-shirts", label: "T-Shirts" },
    { value: "hoodies", label: "Hoodies" },
    { value: "sweatshirts", label: "Sweatshirts" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T&H</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Tees & Hoodies Hub
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/shop" className="text-purple-600 font-semibold">Shop</Link>
              <Link to="/design" className="text-gray-700 hover:text-purple-600 transition-colors">Design Your Own</Link>
              <Link to="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop All Products</h1>
          <p className="text-xl text-gray-600">Discover our collection of premium apparel</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-8 border border-purple-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 border-purple-200">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 border-purple-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600">
                    {product.category.replace('-', ' ')}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                    <div className="flex space-x-1">
                      {product.colors.slice(0, 3).map((color, index) => (
                        <div 
                          key={index} 
                          className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
                            color === 'black' ? 'bg-black' :
                            color === 'white' ? 'bg-white' :
                            color === 'navy' ? 'bg-blue-900' :
                            color === 'red' ? 'bg-red-500' :
                            color === 'gray' ? 'bg-gray-500' :
                            color === 'green' ? 'bg-green-500' :
                            'bg-yellow-600'
                          }`}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      asChild 
                      variant="outline" 
                      className="border-purple-200 hover:bg-purple-50"
                    >
                      <Link to={`/product/${product.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
