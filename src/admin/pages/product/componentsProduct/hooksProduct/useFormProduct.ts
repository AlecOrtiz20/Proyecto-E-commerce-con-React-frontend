import { useState } from "react";
import type { Product } from "../../AdminProductPage";

export const useFormProduct = () => {

    type ProducForm = Omit<Product, "images" | "tags" | "sizes">;

    const [productForm, setProductForm] = useState<ProducForm>({
        id: "",
        description: "",
        gender: "",
        price: 0,
        slug: "",
        stock: 0,
        title: ""
    });;

    const handleInputChange = (field: keyof ProducForm, value: string | number) => {
        setProductForm((prev) => ({...prev, [field]: value}));
    };

    return{
        productForm,
        handleInputChange,
        setProductForm
    };
};