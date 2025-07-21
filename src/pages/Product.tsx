
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Star, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  features: string[];
  images: string[];
}

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [designOption, setDesignOption] = useState<"as-is" | "custom">("as-is");
  const { addToCart } = useCart();

  useEffect(() => {
    // Mock product data - in real app, this would be an API call
    const mockProduct: Product = {
      id: slug || "1",
      name: "Classic Cotton T-Shirt",
      price: 25,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      category: "t-shirts",
      colors: ["black", "white", "navy", "red", "gray"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      description: "Premium cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a comfortable fit that gets softer with every wash.",
      features: [
        "100% Organic Cotton",
        "Pre-shrunk for perfect fit",
        "Reinforced seams",
        "Tagless comfort",
        "Machine washable"
      ],
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1583743814966-8936f37f4ad2?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=500&fit=crop"
      ]
    };

    setProduct(mockProduct);
    setSelectedColor(mockProduct.colors[0]);
    setSelectedSize(mockProduct.sizes[1]); // Default to M
  }, [slug]);

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    if (designOption === "custom") {
      // Redirect to design page with product info
      window.location.href = `/design?product=${product.id}&size=${selectedSize}&color=${selectedColor}`;
      return;
    }

    addToCart({
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize,
      color: selectedColor
    });
    toast.success(`${product.name} added to cart!`);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

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
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
              <Link to="/design" className="text-muted-foreground hover:text-foreground transition-colors">Design Your Own</Link>
              <Link to="/cart" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-12 text-sm">
          <Link to="/shop" className="flex items-center text-foreground hover:text-muted-foreground">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="aspect-square rounded-2xl overflow-hidden bg-card border border-border">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-accent' : 'border-border'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-6 bg-accent hover:bg-accent text-accent-foreground">
                {product.category.replace('-', ' ')}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">{product.name}</h1>
              <div className="flex items-center space-x-6 mb-8">
                <span className="text-3xl font-bold text-foreground">${product.price}</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-muted-foreground ml-2">(124 reviews)</span>
                </div>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Design Option */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-6">Choose Your Option</h3>
                <div className="grid grid-cols-2 gap-6">
                  <button
                    onClick={() => setDesignOption("as-is")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      designOption === "as-is" 
                        ? 'border-accent bg-accent/10' 
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="text-center">
                      <ShoppingCart className="h-8 w-8 mx-auto mb-3 text-accent" />
                      <h4 className="font-semibold text-foreground">Buy As-Is</h4>
                      <p className="text-sm text-muted-foreground mt-1">Plain product without custom design</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setDesignOption("custom")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      designOption === "custom" 
                        ? 'border-accent bg-accent/10' 
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="text-center">
                      <Palette className="h-8 w-8 mx-auto mb-3 text-accent" />
                      <h4 className="font-semibold text-foreground">Upload Design</h4>
                      <p className="text-sm text-muted-foreground mt-1">Add your custom design</p>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-foreground">Color: {selectedColor}</h3>
              <div className="flex space-x-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-xl border-4 transition-all ${
                      selectedColor === color 
                        ? 'border-accent scale-110' 
                        : 'border-border hover:border-accent/50'
                    } ${
                      color === 'black' ? 'bg-black' :
                      color === 'white' ? 'bg-white' :
                      color === 'navy' ? 'bg-blue-900' :
                      color === 'red' ? 'bg-red-500' :
                      color === 'gray' ? 'bg-gray-500' :
                      'bg-green-500'
                    }`}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-foreground">Size</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-32 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Add to Cart */}
            <div className="space-y-6">
              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 font-medium"
              >
                {designOption === "custom" ? "Customize & Add to Cart" : "Add to Cart"}
              </Button>
              
              {designOption === "custom" && (
                <p className="text-sm text-muted-foreground text-center">
                  You'll be redirected to our design tool to upload and position your design
                </p>
              )}
            </div>

            {/* Product Features */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-6 text-foreground">Product Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full mr-4"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
