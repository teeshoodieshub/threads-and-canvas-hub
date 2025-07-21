
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      toast.success("Item removed from cart");
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  if (items.length === 0) {
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
                <Link to="/cart" className="flex items-center space-x-2 text-foreground font-medium">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="text-8xl mb-12">🛒</div>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">Your cart is empty</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Start shopping or design your own custom apparel!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/shop">Browse Products</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border hover:bg-muted/50">
                <Link to="/design">Design Your Own</Link>
              </Button>
            </div>
          </div>
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
              <Link to="/cart" className="flex items-center space-x-2 text-foreground font-medium">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart ({getTotalItems()})</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">Shopping cart</h1>
          <p className="text-xl text-muted-foreground">{getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="bg-card border-border">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{item.name}</h3>
                      {item.isCustom && (
                        <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full mb-3">
                          Custom Design
                        </span>
                      )}
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted/50 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted/50 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <span className="text-xl font-bold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item.id, item.name)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border sticky top-32">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-8">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-xl font-bold text-foreground">
                      <span>Total</span>
                      <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mb-4">
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>

                <div className="text-center">
                  <Link to="/shop" className="text-muted-foreground hover:text-foreground text-sm">
                    Continue Shopping
                  </Link>
                </div>

                {/* Security badges */}
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="text-center text-sm text-muted-foreground">
                    <p className="font-semibold mb-3">Secure Checkout</p>
                    <div className="flex justify-center space-x-2 text-xs">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded">256-bit SSL</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Secure</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
