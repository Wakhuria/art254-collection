import { useState } from "react";
import { ShoppingBag, Phone, Mail, Search, Menu, X } from "lucide-react";
import { ProductCard, Product } from "./components/ProductCard";
import { Cart, CartItem } from "./components/Cart";
import { PaymentDialog } from "./components/PaymentDialog";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const products: Product[] = [
  // Sneakers
  {
    id: "1",
    name: "Air Max Pro Sneakers",
    price: 8500,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1656944227480-98180d2a5155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzfGVufDF8fHx8MTc2ODk1NTMwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
  },
  {
    id: "2",
    name: "Urban Runner Shoes",
    price: 6500,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: "3",
    name: "Classic White Sneakers",
    price: 5500,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1597350584914-55bb62285896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzfGVufDF8fHx8MTc2ODkxMTk1OHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "16",
    name: "Black Sport Sneakers",
    price: 7200,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1676821666381-c0456feeeb07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHNuZWFrZXJzfGVufDF8fHx8MTc2ODk3NDgwNXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "17",
    name: "Performance Running Shoes",
    price: 8900,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXN8ZW58MXx8fHwxNzY4OTY0NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
  },
  {
    id: "18",
    name: "Basketball High Tops",
    price: 9500,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwc2hvZXN8ZW58MXx8fHwxNzY4OTExNDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "19",
    name: "Casual Street Sneakers",
    price: 6800,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1612942910539-9ff28b2e00d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzbmVha2Vyc3xlbnwxfHx8fDE3Njg5Mjg1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "20",
    name: "High Top Canvas Sneakers",
    price: 5800,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1721767642708-4b082d03334b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwdG9wJTIwc25lYWtlcnN8ZW58MXx8fHwxNzY4OTg0NzUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "21",
    name: "Jordan Style Sneakers",
    price: 11500,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1684918652908-8c5b4a154781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb3JkYW4lMjBzbmVha2Vyc3xlbnwxfHx8fDE3Njg5MzE4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
  },
  {
    id: "22",
    name: "Nike Air Force Classic",
    price: 9200,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwc2hvZXN8ZW58MXx8fHwxNzY4ODkzMjgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "23",
    name: "Adidas Retro Sneakers",
    price: 7800,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1620794341491-76be6eeb6946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZGlkYXMlMjBzbmVha2Vyc3xlbnwxfHx8fDE3Njg4OTMyODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "24",
    name: "Colorful Sport Trainers",
    price: 6200,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500",
  },
  {
    id: "25",
    name: "Limited Edition Kicks",
    price: 12500,
    category: "Sneakers",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
  },
  // Clothing
  {
    id: "4",
    name: "Designer Denim Jacket",
    price: 4500,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzY4OTY4MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
  },
  {
    id: "5",
    name: "Premium Cotton T-Shirt",
    price: 1500,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1516082669438-2d2bb5082626?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwdHNoaXJ0fGVufDF8fHx8MTc2ODg4NzkwMHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "6",
    name: "Slim Fit Jeans",
    price: 3500,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWFucyUyMGRlbmltfGVufDF8fHx8MTc2ODkwODg2NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "26",
    name: "Urban Hoodie - Black",
    price: 3200,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1625880014195-928b3ee7008b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob29kaWUlMjBmYXNoaW9ufGVufDF8fHx8MTc2ODk1NjM1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
  },
  {
    id: "27",
    name: "Classic Dress Shirt",
    price: 2800,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1602810316693-3667c854239a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVzcyUyMHNoaXJ0fGVufDF8fHx8MTc2ODg5MzI4OHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "28",
    name: "Leather Biker Jacket",
    price: 8500,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwamFja2V0fGVufDF8fHx8MTc2ODkxMjkwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "29",
    name: "Polo Shirt - Multiple Colors",
    price: 2200,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1625910513413-c23b8bb81cba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xvJTIwc2hpcnR8ZW58MXx8fHwxNzY4OTA4ODY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "30",
    name: "Cozy Sweatshirt",
    price: 2900,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VhdHNoaXJ0fGVufDF8fHx8MTc2ODk4NDc1NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "31",
    name: "Athletic Track Pants",
    price: 3100,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1719473466836-ff9f5ebe0e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFjayUyMHBhbnRzfGVufDF8fHx8MTc2ODk4NDc1NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "32",
    name: "Bomber Jacket - Green",
    price: 5500,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib21iZXIlMjBqYWNrZXR8ZW58MXx8fHwxNzY4OTAxMTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "33",
    name: "Flannel Checkered Shirt",
    price: 2400,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1698857494817-d244cb4231a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFubmVsJTIwc2hpcnR8ZW58MXx8fHwxNzY4OTg0NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "34",
    name: "Cargo Utility Pants",
    price: 3800,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1584302052177-2e90841dad6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHBhbnRzfGVufDF8fHx8MTc2ODk4NDc1NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "35",
    name: "Graphic Print Tee",
    price: 1800,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
  },
  {
    id: "36",
    name: "Winter Parka Jacket",
    price: 7200,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500",
  },
  // Watches
  {
    id: "7",
    name: "Luxury Gold Watch",
    price: 15000,
    category: "Watches",
    image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3Njg5Mjg4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
  },
  {
    id: "8",
    name: "Sport Chronograph",
    price: 9500,
    category: "Watches",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
  },
  {
    id: "9",
    name: "Classic Leather Watch",
    price: 7500,
    category: "Watches",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500",
  },
  // Perfumes
  {
    id: "10",
    name: "Noir Elegance Perfume",
    price: 5500,
    category: "Perfumes",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc2ODk1ODUyMHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "11",
    name: "Fresh Ocean Eau de Parfum",
    price: 4500,
    category: "Perfumes",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
  },
  {
    id: "12",
    name: "Midnight Rose Fragrance",
    price: 6000,
    category: "Perfumes",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500",
  },
  // Miscellaneous
  {
    id: "13",
    name: "Leather Crossbody Bag",
    price: 4000,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1709899504137-575171b3258d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3NvcmllcyUyMGJhZ3xlbnwxfHx8fDE3Njg5ODQzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "14",
    name: "Designer Sunglasses",
    price: 3500,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
  },
  {
    id: "15",
    name: "Premium Wallet",
    price: 2500,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
  },
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toast.info("Item removed from cart");
  };

  const handleCheckout = () => {
    setPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setCartItems([]);
    toast.success("Order placed successfully!");
  };

  const categories = ["All", "Sneakers", "Clothing", "Watches", "Perfumes", "Accessories"];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // PayPal configuration
  const paypalOptions = {
    clientId: "test", // Using PayPal sandbox test mode
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="min-h-screen bg-gray-50">
        <Toaster />
        
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-8 w-8 text-green-600" />
                <h1 className="text-2xl">Art254 Collection</h1>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>0790048393</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-green-600" />
                  <span>muigaijoseph173@gmail.com</span>
                </div>
                <Cart
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={handleCheckout}
                />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-2">
                <Cart
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={handleCheckout}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Contact Info */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t py-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>0790048393</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-green-600" />
                  <span>muigaijoseph173@gmail.com</span>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl mb-2">Welcome to Art254 Collection</h2>
              <p className="text-xl text-green-100 mb-6">
                Premium Sneakers, Fashion, Watches & More
              </p>
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="mb-8 flex-wrap h-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory}>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl mb-4 flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6 text-green-500" />
                  Art254 Collection
                </h3>
                <p className="text-gray-400">
                  Your one-stop shop for premium sneakers, fashion, watches, perfumes and accessories.
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-4">Contact Us</h3>
                <div className="space-y-2 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-500" />
                    <span>0790048393</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-green-500" />
                    <span>muigaijoseph173@gmail.com</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl mb-4">Payment Methods</h3>
                <div className="text-gray-400 space-y-1">
                  <p className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> M-Pesa Payment
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-blue-500">✓</span> PayPal & Cards
                  </p>
                  <p className="text-sm mt-2">
                    Secure and convenient payments
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2026 Art254 Collection. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Payment Dialog */}
        <PaymentDialog
          open={paymentOpen}
          onOpenChange={setPaymentOpen}
          amount={totalAmount}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    </PayPalScriptProvider>
  );
}