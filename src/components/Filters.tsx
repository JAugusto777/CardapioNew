
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

interface FiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Filters = ({
  categories,
  selectedCategory,
  onSelectCategory,
  isOpen,
  onClose,
}: FiltersProps) => {
  const FilterContent = () => (
    <div className="space-y-2">
      <Button
        variant={selectedCategory === null ? "default" : "ghost"}
        className="w-full justify-start bg-brand-yellow text-black hover:bg-brand-yellow/90"
        onClick={() => onSelectCategory(null)}
      >
        Todas
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "ghost"}
          className={`w-full justify-start ${
            selectedCategory === category
              ? "bg-brand-yellow text-black hover:bg-brand-yellow/90"
              : ""
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop view */}
      <div className="hidden lg:block p-4 bg-white rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-4">Categorias</h2>
        <FilterContent />
      </div>

      {/* Mobile view */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-[80%] sm:w-[385px]">
          <SheetHeader>
            <SheetTitle>Categorias</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
