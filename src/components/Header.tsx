
import { Search, Menu, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface HeaderProps {
  cartCount: number;
  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
}

export const Header = ({ cartCount, onSearchChange, onToggleFilters }: HeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-yellow/20 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFilters}
              className="lg:hidden hover:bg-brand-yellow/50"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">
              Riachão Casa&Construção
            </h1>
          </div>
          
          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Pesquisar produtos..."
                className="pl-10"
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Search bar - mobile */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
              className="hover:bg-brand-yellow/50"
            >
              <Search className="h-5 w-5" />
            </Button>
            {showSearch && (
              <div className="absolute left-0 right-0 top-full bg-white p-4 shadow-md">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Pesquisar produtos..."
                    className="pl-10 w-full"
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <Button variant="outline" className="relative hover:bg-brand-yellow/20">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-brand-yellow text-black">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
