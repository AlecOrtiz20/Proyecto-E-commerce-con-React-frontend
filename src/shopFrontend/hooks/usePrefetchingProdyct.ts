import {  useQueryClient } from "@tanstack/react-query";
import { getProductSlung } from "../actions/get-product-slung";
import { useRef } from "react";



export const usePreFetchingProudct = (title: string) => {

    const queryClient = useQueryClient();
    const timeoutRef = useRef<number | null>(null);


    const onMuseEnterGetProduct = () => {

        if(!title) return;

        if(queryClient.getQueryData(['prouduct', title])) return;

        timeoutRef.current = setTimeout(() => {
            queryClient.prefetchQuery({
                queryKey: ['product', {title}],
                queryFn: () => getProductSlung(title),
                staleTime: 1000 * 60 * 5
            });
        }, 1000);
    };


    const onMouseLeaveProduct = () => {

        if(timeoutRef.current){
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null;
        }
    };

    return{
        onMuseEnterGetProduct,
        onMouseLeaveProduct
    };
    
    

    
};