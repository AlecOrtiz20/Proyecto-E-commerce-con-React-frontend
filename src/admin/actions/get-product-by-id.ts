import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/shopFrontend/types/product.type";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getProductById = async (id: string): Promise<Product> => {

    if(!id) throw new Error("Id no ingresado")

    try {
        const {data} = await tesloApi.get<Product>(`/products/${id}`);

        const responseImages: string[] = data.images.map((img) => `${BASE_URL}/files/product/${img}`);
        console.log(responseImages);

        return {
            ...data,
            images: responseImages
        }
    } catch (error) {
        throw error;
    }

};