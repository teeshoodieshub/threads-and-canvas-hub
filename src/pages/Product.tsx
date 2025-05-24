
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
              <Link to="/shop" className="text-gray-700 hover:text-purple-600 transition-colors">Shop</Link>
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
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8 text-sm">
          <Link to="/shop" className="flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white border border-purple-100">
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
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-purple-600' : 'border-gray-200'
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
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600">
                {product.category.replace('-', ' ')}
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-purple-600">${product.price}</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-gray-600 ml-2">(124 reviews)</span>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Design Option */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Choose Your Option</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDesignOption("as-is")}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      designOption === "as-is" 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-center">
                      <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <h4 className="font-semibold">Buy As-Is</h4>
                      <p className="text-sm text-gray-600">Plain product without custom design</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setDesignOption("custom")}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      designOption === "custom" 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-center">
                      <Palette className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <h4 className="font-semibold">Upload Design</h4>
                      <p className="text-sm text-gray-600">Add your custom design</p>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Color: {selectedColor}</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      selectedColor === color 
                        ? 'border-purple-600 scale-110' 
                        : 'border-gray-300 hover:border-purple-400'
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
              <h3 className="text-lg font-semibold mb-4">Size</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-32 border-purple-200">
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
            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6"
              >
                {designOption === "custom" ? "Customize & Add to Cart" : "Add to Cart"}
              </Button>
              
              {designOption === "custom" && (
                <p className="text-sm text-gray-600 text-center">
                  You'll be redirected to our design tool to upload and position your design
                </p>
              )}
            </div>

            {/* Product Features */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
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
