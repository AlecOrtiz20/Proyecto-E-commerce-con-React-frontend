import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";
import { useParams, useSearchParams } from "react-router";



export const useProducts = () => {


    const {gender} = useParams();
    const [ searchParam ] = useSearchParams();


    const limitParam = searchParam.get("limit") ?? 9;
    const pagePararam = searchParam.get("page") ?? 1;
    const sizes = searchParam.get('sizes') ?? "";
    const q = searchParam.get('search') ?? "";

    const price = searchParam.get('price') ?? "";

    let minPrice = undefined;
    let maxPrice = undefined;

    switch(price){
        case "0-50":
            minPrice = 0
            maxPrice = 50
        break;

        case "50-100":
            minPrice = 50
            maxPrice = 100
        break;

        case "100-200":
            minPrice = 100
            maxPrice = 200
        break;

        case "200+":
            minPrice=200
            maxPrice = 200
        break;
    }


    const limit = Number(limitParam);
    const page = Number(pagePararam);
    
    const offset = (page - 1) * limit;

    return useQuery({
        queryKey: ['products', {limit, offset, gender, sizes, maxPrice, minPrice, q}],
        queryFn: () => getProductsAction(
        {   limit: isNaN(+limit) ? 0 : limit,     
            offset: isNaN(offset) ? 0: offset,
            gender,
            sizes,
            maxPrice,
            minPrice,
            q
        }
        ),
        staleTime: 1000 * 60 * 5,
    })
};