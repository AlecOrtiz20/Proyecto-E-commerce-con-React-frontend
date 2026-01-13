import { tesloApi } from "@/api/tesloApi";
import type { Product } from "../types/product.type";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getProductSlung = async (titleProduct: string): Promise<Product> => {

    const {data} = await tesloApi.get<Product>(`/products/${titleProduct}`);

    const response = data.images.map((img) => `${BASE_URL}/files/product/${img}`)
    
    return{
        ...data,
        images: response
        
    };
};