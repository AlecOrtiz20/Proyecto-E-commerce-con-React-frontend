import type { Product } from "./product.type";

export interface ProductsResponse {
    count:    number;
    pages:    number;
    products: Product[];
}




