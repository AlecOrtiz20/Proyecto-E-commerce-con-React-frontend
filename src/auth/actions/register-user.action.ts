import { tesloApi } from "@/api/tesloApi";
import type { User } from "@/shopFrontend/types/user.type";

export interface RegisterUserRequest{
    email: string;
    password: string;
    fullName: string;
}


export const registerUserAction = async (user: RegisterUserRequest) => {
    
    try {
        const {data} = await tesloApi.post<User>("/auth/register", user);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }

};