
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-lg font-bold text-gray-900 mt-2">
          R$ {product.price.toFixed(2)}
        </p>
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full mt-4 bg-brand-yellow text-black hover:bg-brand-yellow/90"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
};
