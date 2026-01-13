import type { User } from "@/shopFrontend/types/user.type";

export interface AuthResponse{
    user: User;
    token: string;
};
