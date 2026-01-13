import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/shopFrontend/types/product.type";


const BASE_URL = import.meta.env.VITE_BASE_URL;


export const createUpdateProductAction = async (productLike: Partial<Product> & {files?: File[]}): Promise<Product> => {
    const {id, user, images = [], files = [], ...res} = productLike;

    const isCreated = id === "new";

    res.stock = Number(res.stock || 0);
    res.price= Number(res.price || 0);

    let imagesToSend = images.map((img) => {

        if(img.startsWith("http")){
            const parts = img.split('/');
            return parts[parts.length - 1];
        }

        return img;
    });

    if(files.length > 0){
        const newImagesResponse = await uploadImageProduct(files);
        const newImagesName = newImagesResponse.map((response) => response.fileName);
        imagesToSend = [...imagesToSend, ...newImagesName];
    }

    const {data} = await tesloApi<Product>({
        url: isCreated ? "/products" : `/products/${id}`,
        method: isCreated ? 'POST' : 'PATCH',
        data: {...res, images: imagesToSend}
    });

    const imagesResp = data.images.map((img) => {
        if(img.startsWith('http')) return img;
        return `${BASE_URL}/files/product/${img}`;
    })

    return{
        ...data,
        images: imagesResp
    };
};

export interface FileUploadResponse{
    secureUrl: string;
    fileName: string;
};

const uploadImageProduct = async (files: File[]) => {

    const uploadPromises = files.map(async (file) => {

        const formData = new FormData();

        formData.append("file", file);

        const {data} = await tesloApi<FileUploadResponse>({
            url: "/files/product",
            method: "POST",
            data: formData
        });

        return data;
    });

    const uploadesFilesNames = await Promise.all(uploadPromises);

    return uploadesFilesNames;
};