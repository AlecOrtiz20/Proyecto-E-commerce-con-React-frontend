import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Truck, RotateCcw, Shield } from "lucide-react";
import { ImageGallery } from "./poductComponents/ImageGallery";
import { SizeSelector } from "./poductComponents/SizeSelector";
import { StockIndicator } from "./poductComponents/StockIndicator";
import { AddToCartButton } from "./poductComponents/AddTocardButton";
import { GenderBadge } from "./poductComponents/GenderBadge";

import { useProductByTitle } from "@/shopFrontend/hooks/useProductByTitle";
import { data } from "react-router";


export const ProductPage = () => {

  const {data: product} = useProductByTitle();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  console.log(data);



  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="animate-fade-in">
            <ImageGallery images={product?.images ?? []} title={product?.title ?? ""} />
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:self-start animate-slide-up">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <GenderBadge gender={product?.gender ?? ""} />
                <StockIndicator stock={product?.stock ?? 0} />
              </div>
              
              <h1 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground leading-tight">
                {product?.title}
              </h1>
              
              <p className="text-2xl lg:text-3xl font-heading font-medium text-foreground">
                {formatPrice(product?.price ?? 0)}
              </p>
            </div>

            <Separator className="bg-border" />

            {/* Size Selector */}
            <SizeSelector
              sizes={product?.sizes ?? []}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />

            {/* Add to Cart */}
            <AddToCartButton
              disabled={!selectedSize || product?.stock === 0}
              productTitle={product?.title ?? ""}
            />

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Truck className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">Envío gratis</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">30 días devolución</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">Compra segura</span>
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Descripción
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {product?.description}
              </p>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};
