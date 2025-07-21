import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Upload, Download, RotateCcw, ShoppingCart, Palette, Move, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Canvas as FabricCanvas, Circle, Image as FabricImage } from "fabric";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const Design = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [selectedProduct, setSelectedProduct] = useState("t-shirt");
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [designScale, setDesignScale] = useState([1]);
  const [designRotation, setDesignRotation] = useState([0]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  const products = [
    { id: "t-shirt", name: "T-Shirt", price: 25, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" },
    { id: "hoodie", name: "Hoodie", price: 55, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop" },
    { id: "sweatshirt", name: "Sweatshirt", price: 45, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop" }
  ];

  const colors = [
    { name: "black", hex: "#000000" },
    { name: "white", hex: "#ffffff" },
    { name: "navy", hex: "#1e3a8a" },
    { name: "red", hex: "#dc2626" },
    { name: "gray", hex: "#6b7280" }
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 400,
      height: 500,
      backgroundColor: "#f8fafc",
    });

    // Add product silhouette
    const productRect = new Circle({
      left: 200,
      top: 250,
      radius: 150,
      fill: colors.find(c => c.name === selectedColor)?.hex || "#000000",
      selectable: false,
      evented: false,
      opacity: 0.3
    });

    canvas.add(productRect);
    canvas.renderAll();

    setFabricCanvas(canvas);
    toast.success("Design canvas ready! Upload an image to start designing.");

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    // Update product color
    const objects = fabricCanvas.getObjects();
    const productShape = objects[0]; // First object should be the product silhouette
    
    if (productShape) {
      productShape.set('fill', colors.find(c => c.name === selectedColor)?.hex || "#000000");
      fabricCanvas.renderAll();
    }
  }, [selectedColor, fabricCanvas]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !fabricCanvas) return;

    if (!file.type.match(/image.*/)) {
      toast.error("Please upload a valid image file (PNG, JPG, SVG)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = e.target?.result as string;
      
      FabricImage.fromURL(imgUrl, {
        crossOrigin: 'anonymous'
      }).then((img) => {
        // Remove existing design images
        const existingImages = fabricCanvas.getObjects().filter(obj => obj !== fabricCanvas.getObjects()[0]);
        existingImages.forEach(obj => fabricCanvas.remove(obj));

        // Scale the image to fit nicely on the product
        const maxWidth = 200;
        const maxHeight = 200;
        const scaleX = maxWidth / (img.width || 1);
        const scaleY = maxHeight / (img.height || 1);
        const scale = Math.min(scaleX, scaleY);

        img.set({
          left: 200,
          top: 200,
          scaleX: scale,
          scaleY: scale,
          originX: 'center',
          originY: 'center'
        });

        fabricCanvas.add(img);
        fabricCanvas.setActiveObject(img);
        fabricCanvas.renderAll();
        
        toast.success("Design uploaded! Use the controls to adjust position and size.");
      }).catch((error) => {
        console.error("Error loading image:", error);
        toast.error("Failed to load image. Please try again.");
      });
    };
    reader.readAsDataURL(file);
  };

  const handleScaleChange = (value: number[]) => {
    setDesignScale(value);
    const activeObject = fabricCanvas?.getActiveObject();
    if (activeObject && activeObject.type === 'image') {
      const scale = value[0];
      activeObject.set({
        scaleX: scale,
        scaleY: scale
      });
      fabricCanvas?.renderAll();
    }
  };

  const handleRotationChange = (value: number[]) => {
    setDesignRotation(value);
    const activeObject = fabricCanvas?.getActiveObject();
    if (activeObject && activeObject.type === 'image') {
      activeObject.set('angle', value[0]);
      fabricCanvas?.renderAll();
    }
  };

  const handleClearCanvas = () => {
    if (!fabricCanvas) return;
    
    // Keep only the first object (product silhouette)
    const objects = fabricCanvas.getObjects();
    for (let i = objects.length - 1; i > 0; i--) {
      fabricCanvas.remove(objects[i]);
    }
    fabricCanvas.renderAll();
    setDesignScale([1]);
    setDesignRotation([0]);
    toast.success("Design cleared!");
  };

  const handleSaveToCart = () => {
    if (!fabricCanvas) return;

    const objects = fabricCanvas.getObjects();
    if (objects.length <= 1) {
      toast.error("Please upload a design first!");
      return;
    }

    // Generate thumbnail of the design
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 0.8,
      multiplier: 0.5
    });

    const currentProduct = products.find(p => p.id === selectedProduct);
    if (!currentProduct) return;

    addToCart({
      id: `custom-${Date.now()}`,
      name: `Custom ${currentProduct.name}`,
      price: currentProduct.price + 10, // Add $10 for custom design
      image: dataURL,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
      isCustom: true
    });

    toast.success("Custom design added to cart!");
  };

  const currentProduct = products.find(p => p.id === selectedProduct);

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
              <Link to="/design" className="text-foreground font-medium">Design Your Own</Link>
              <Link to="/cart" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">Design your own</h1>
          <p className="text-xl text-muted-foreground">Upload your design and create custom apparel</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Design Canvas */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Design Canvas</h3>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-border hover:bg-muted/50"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearCanvas}
                      className="border-border hover:bg-muted/50"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                </div>
                
                <div className="border-2 border-dashed border-border rounded-2xl p-6 bg-muted/30">
                  <canvas ref={canvasRef} className="mx-auto border border-border rounded-xl shadow-sm" />
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Design Controls */}
                <div className="mt-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Scale: {designScale[0].toFixed(2)}x
                    </label>
                    <Slider
                      value={designScale}
                      onValueChange={handleScaleChange}
                      min={0.1}
                      max={3}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Rotation: {designRotation[0]}°
                    </label>
                    <Slider
                      value={designRotation}
                      onValueChange={handleRotationChange}
                      min={-180}
                      max={180}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Configuration */}
          <div className="space-y-8">
            {/* Product Selection */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-6 text-foreground">Product</h3>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - ${product.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {currentProduct && (
                  <div className="mt-6">
                    <img 
                      src={currentProduct.image} 
                      alt={currentProduct.name}
                      className="w-full h-32 object-cover rounded-xl"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Color Selection */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-6 text-foreground">Color: {selectedColor}</h3>
                <div className="grid grid-cols-5 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-12 h-12 rounded-xl border-4 transition-all ${
                        selectedColor === color.name 
                          ? 'border-accent scale-110' 
                          : 'border-border hover:border-accent/50'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Size Selection */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-6 text-foreground">Size</h3>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Price and Add to Cart */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-3">
                    ${currentProduct ? currentProduct.price + 10 : 35}
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Base price + $10 for custom design
                  </p>
                  <Button 
                    onClick={handleSaveToCart}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-6 text-foreground">How to Design</h3>
                <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
                  <li>Upload your design image (PNG, JPG, SVG)</li>
                  <li>Select your product type and color</li>
                  <li>Use the sliders to adjust size and rotation</li>
                  <li>Drag the design to position it on the product</li>
                  <li>Choose your size and add to cart</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;
