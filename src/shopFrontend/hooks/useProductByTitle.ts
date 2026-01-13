import {  useQuery } from "@tanstack/react-query";
import { getProductSlung } from "../actions/get-product-slung";
import { useParams } from "react-router";


export const useProductByTitle = () => {
    const {title} = useParams();

    return useQuery({
        queryKey: ['product', {title}],
        queryFn: () => getProductSlung(title!),
        enabled: !!title,
        staleTime: 1000 * 60 * 5,
    })
};