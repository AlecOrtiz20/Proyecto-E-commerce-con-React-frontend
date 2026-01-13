import { cn } from "@/lib/utils";

interface StockIndicatorProps {
  stock: number;
}

export const StockIndicator = ({ stock }: StockIndicatorProps) => {
  const getStockStatus = () => {
    if (stock === 0) {
      return { label: "Agotado", color: "bg-destructive", textColor: "text-destructive" };
    }
    if (stock <= 5) {
      return { label: `¡Solo quedan ${stock}!`, color: "bg-warning", textColor: "text-warning" };
    }
    return { label: "En stock", color: "bg-success", textColor: "text-success" };
  };

  const status = getStockStatus();

  return (
    <div className="flex items-center gap-2">
      <span className={cn("w-2 h-2 rounded-full animate-pulse", status.color)} />
      <span className={cn("text-sm font-medium", status.textColor)}>
        {status.label}
      </span>
    </div>
  );
};
