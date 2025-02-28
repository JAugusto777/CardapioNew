
import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard, Product } from "@/components/ProductCard";
import { Filters } from "@/components/Filters";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Dados de exemplo
const products: Product[] = [
  {
    id: 1,
    name: "Cimento Portland",
    price: 28.90,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    category: "Materiais Básicos"
  },
  {
    id: 2,
    name: "Tijolo Cerâmico",
    price: 1.20,
    image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a",
    category: "Materiais Básicos"
  },
  {
    id: 3,
    name: "Tinta Acrílica 18L",
    price: 289.90,
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
    category: "Pintura"
  },
  {
    id: 4,
    name: "Argamassa 20kg",
    price: 25.90,
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2",
    category: "Materiais Básicos"
  },
];

const categories = Array.from(new Set(products.map(p => p.category)));

const Index = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item, index) => {
      if (item.id === productId) {
        const remainingItems = cart.slice(index + 1).filter(p => p.id === productId);
        return remainingItems.length > 0;
      }
      return true;
    }));
  };

  const getItemCount = (productId: number) => {
    return cart.filter(item => item.id === productId).length;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleWhatsAppCheckout = () => {
    const message = cart.reduce((msg, item) => {
      const count = getItemCount(item.id);
      if (count > 0) {
        return msg + `\n${item.name} x${count} - R$ ${(item.price * count).toFixed(2)}`;
      }
      return msg;
    }, `*Pedido Riachão Casa&Construção*\n\nItens do pedido:`);

    const total = `\n\n*Total: R$ ${getTotalPrice().toFixed(2)}*`;
    const whatsappLink = `https://wa.me/5599999999999?text=${encodeURIComponent(message + total)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cart.length}
        onSearchChange={setSearchTerm}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className={`w-64 hidden lg:block`}>
            <Filters
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
            />
          </aside>
          
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="cart-button">
            <ShoppingCart className="h-5 w-5 mr-2" />
            {cart.length} {cart.length === 1 ? 'item' : 'itens'}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
          </SheetHeader>
          <div className="mt-8">
            {Array.from(new Set(cart.map(item => item.id))).map(productId => {
              const product = products.find(p => p.id === productId)!;
              const count = getItemCount(productId);
              if (count === 0) return null;
              return (
                <div key={productId} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {count}x R$ {product.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(productId)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
            {cart.length > 0 ? (
              <div className="mt-4 space-y-4">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>R$ {getTotalPrice().toFixed(2)}</span>
                </div>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600"
                  onClick={handleWhatsAppCheckout}
                >
                  Finalizar pedido via WhatsApp
                </Button>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-4">
                Seu carrinho está vazio
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
