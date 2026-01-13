import { tesloApi } from "@/api/tesloApi";
import type { ProductsResponse } from "../types/products.response";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface OptionsProducts{
    limit?: number | string;
    offset?: number | string;
    gender?: string;
    sizes?: string;
    minPrice?: number;
    maxPrice?: number;
    q?: string;
};  



export const getProductsAction = async ({limit, offset, gender, sizes, maxPrice, minPrice, q}: OptionsProducts): Promise<ProductsResponse> => {
    const {data} = await tesloApi.get<ProductsResponse>('/products', {
        params: {
            limit, offset, gender, sizes, minPrice, maxPrice, q
        }
    });

    

    const response = data.products.map((product) => ({
        ...product,
        images: product.images.map((img) => `${BASE_URL}/files/product/${img}`)
    }));


    console.log({response})


    return {
        ...data,
        products: response
    };
};