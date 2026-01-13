import type { User } from "./user.type";


export interface Product {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    sizes:       Size[];
    gender:      string;
    tags:        string[];
    images:      string[];
    user:        User | undefined;
}

export type Size = 'L' | 'M' | 'S' | 'XL' | 'XS' | 'XXL';


