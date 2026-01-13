import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { usePagination } from "../hooks/usePagination";



interface PropsPagination{
  totalPages: number;
};

export function CustomPagination({totalPages}: PropsPagination){
    const {current, handleNext, handlePrevious, handleUpdate} = usePagination();
    
    return(
        <div className="flex items-center justify-center space-x-2">
        <Button variant="outline" size="sm" disabled={
          current <= 1
        } onClick={handlePrevious}>
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>

        {Array.from({length: totalPages}).map((_, index) => (
          <Button variant={
            current === index + 1 ? 'default' : 'outline' 
          } size="sm" key={index} onClick={() => {
            handleUpdate(index + 1)
            
          }}>
            {index + 1}
          </Button>
        ))}


        <Button variant="outline" size="sm" disabled={

          current === totalPages
        } onClick={handleNext}>
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
};