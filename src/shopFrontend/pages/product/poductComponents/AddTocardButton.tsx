import { ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";


interface AddToCartButtonProps {
  disabled?: boolean;
  productTitle: string;
}

export const AddToCartButton = ({ disabled, productTitle }: AddToCartButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (disabled) return;
    
    setIsAdding(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsAdding(false);
    

  toast.success("Agregado al carrito con exito", {description: `${productTitle} se ha añadido a tu carrito.`})
};

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);

  toast.success(isWishlisted ? "Eliminado de favoritos" : "Añadido a favoritos", 
    {description: `${productTitle} ${isWishlisted ? "se ha eliminado de" : "se ha añadido a"} tu lista de deseos.`})
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleAddToCart}
        disabled={disabled || isAdding}
        className={cn(
          "flex-1 h-14 px-8 rounded-lg font-medium text-base transition-all duration-300",
          "flex items-center justify-center gap-3",
          disabled
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98]"
        )}
      >
        <ShoppingBag className={cn("w-5 h-5", isAdding && "animate-bounce")} />
        {isAdding ? "Añadiendo..." : disabled ? "Selecciona una talla" : "Añadir al carrito"}
      </button>
      
      <button
        onClick={handleWishlist}
        className={cn(
          "w-14 h-14 rounded-lg border-2 transition-all duration-300",
          "flex items-center justify-center",
          isWishlisted
            ? "bg-destructive/10 border-destructive text-destructive"
            : "border-border hover:border-foreground text-foreground hover:bg-muted"
        )}
      >
        <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
      </button>
    </div>
  );
};
