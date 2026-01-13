import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../types/Login-response";

export interface RequestLogin{
    email: string;
    password: string;
};

export const loginAction = async ({email, password}: RequestLogin): Promise<AuthResponse> => {
    try {
        const {data} = await tesloApi.post<AuthResponse>("/auth/login", {
            email,
            password
        });

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};