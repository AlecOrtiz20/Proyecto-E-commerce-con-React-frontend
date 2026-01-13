import { tesloApi } from "@/api/tesloApi";
import type { User } from "@/shopFrontend/types/user.type";
import { AxiosError } from "axios";

interface CheckAuthResponse{
    ok: boolean;
    user: User;
};

export const checkAuthAction = async (): Promise<User | null> => {
    try {
        const {data} = await tesloApi.get<CheckAuthResponse>("/auth/check-status");
        return data.user;
    } catch (error) {
        if(error instanceof AxiosError){
            if(error.response?.status === 401){
                return null;
            }
        }
        throw error;
    }
};