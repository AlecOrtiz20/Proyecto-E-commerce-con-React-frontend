import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../actions/get-product-by-id";
import { createUpdateProductAction } from "../actions/create-update.action";
import type { Product } from "@/shopFrontend/types/product.type";


export const useProductById = (id: string) => {


    const queryClient = useQueryClient();


    const query = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutos
        enabled: id !== "new",
        refetchOnMount: "always"
    });

    const mutationUpdate = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            queryClient.invalidateQueries({queryKey: ['products']})
            console.log("Accion realizada con exito", product);

        }
    })

    

    return {
        ...query,
        mutationUpdate
    }
};