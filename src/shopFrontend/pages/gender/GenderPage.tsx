import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotrom } from "@/shopFrontend/components/CustomJumbotrom";
import { ProductsComponent } from "@/shopFrontend/components/ProductsComponent";
import { useProducts } from "@/shopFrontend/hooks/useProducts";
import { useParams } from "react-router";

export function GenderPage(){

    const {gender} = useParams();
    const {data} = useProducts();


 
    const handleChangeTitle = (gender: string): string => {
       const titleGender: Record<string, string> =  {
            men: "Hombres",
            women: "Mujeres",
            kid: "Ninos"
       };

       return titleGender[gender] ?? '';
        
    };
     
    return(
        <>
            <CustomJumbotrom title={`Ropa de ${handleChangeTitle(gender ?? "")}`}/>

            <ProductsComponent products={data?.products ?? []}/>

            <CustomPagination totalPages={data?.pages ?? 1}/>
        </>
        
    );
};