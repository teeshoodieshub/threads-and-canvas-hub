
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
                <Link to="/cart" className="flex items-center space-x-2 text-purple-600 font-semibold">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-8xl mb-8">🛒</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Start shopping or design your own custom apparel!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Link to="/shop">Browse Products</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-purple-200 hover:bg-purple-50">
                <Link to="/design">Design Your Own</Link>
              </Button>
            </div>
          </div>
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
              <Link to="/cart" className="flex items-center space-x-2 text-purple-600 font-semibold">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({getTotalItems()})</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-xl text-gray-600">{getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-purple-100">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                      {item.isCustom && (
                        <span className="inline-block px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs rounded-full mb-2">
                          Custom Design
                        </span>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className="text-xl font-bold text-purple-600">
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
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>

                <div className="mt-4 text-center">
                  <Link to="/shop" className="text-purple-600 hover:text-purple-700 text-sm">
                    Continue Shopping
                  </Link>
                </div>

                {/* Security badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center text-sm text-gray-600">
                    <p className="font-semibold mb-2">Secure Checkout</p>
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
