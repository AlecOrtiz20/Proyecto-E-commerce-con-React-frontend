import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
}

export const SizeSelector = ({ sizes, selectedSize, onSelectSize }: SizeSelectorProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Talla</span>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
          Guía de tallas
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelectSize(size)}
            className={cn(
              "min-w-[48px] h-12 px-4 rounded-lg font-medium text-sm transition-all duration-200",
              "border-2 hover:border-foreground",
              selectedSize === size
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-border hover:bg-muted"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
