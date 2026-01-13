
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Spinner } from "@/components/ui/spinner";
import { CustomJumbotrom } from "@/shopFrontend/components/CustomJumbotrom";
import { ProductsComponent } from "@/shopFrontend/components/ProductsComponent";
import { useProducts } from "@/shopFrontend/hooks/useProducts";

export function ShopHome(){

    const {data, isLoading} = useProducts();
        
    if(isLoading) return <Spinner className="size-6 text-red-500 mx-auto"/>;

    return(
        <>
            <CustomJumbotrom title="Todos los productos"/>

            <ProductsComponent products={data?.products ?? []}/>

            <CustomPagination totalPages={data?.pages ?? 1}/>
        </>
    );
};