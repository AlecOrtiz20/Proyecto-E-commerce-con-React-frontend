import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] pb-2 lg:pb-0 lg:pr-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden transition-all duration-300",
              "ring-2 ring-offset-2 ring-offset-background",
              selectedIndex === index
                ? "ring-primary"
                : "ring-transparent hover:ring-muted-foreground/30"
            )}
          >
            <img
              src={image}
              alt={`${title} - Vista ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-[3/4] lg:aspect-auto lg:h-[600px] rounded-xl overflow-hidden bg-card">
        <img
          src={images[selectedIndex]}
          alt={title}
          className="w-full h-full object-cover animate-fade-in"
          key={selectedIndex}
        />
      </div>
    </div>
  );
};
