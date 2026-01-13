import type { User } from "@/shopFrontend/types/user.type";
import { loginAction} from "../actions/login-action";
import {create} from "zustand";
import { checkAuthAction } from "../actions/check-auth.action";
import { logoutAction } from "../actions/logout-action";
import { registerUserAction, type RegisterUserRequest } from "../actions/register-user.action";

type AuthStatus = "authenticated" | "no-authenticated" | "cheking";

interface AuthState{
    //Properties
    user: User | null;
    authenticated: AuthStatus;

    //Actions
    isAdmin: () => boolean;
    login: (email: string, password: string) => Promise<boolean>;
    checkAuth: () => Promise<void>;
    logout: () => void;
    register: (user: RegisterUserRequest) => Promise<boolean>;
    

}

export const authStateUser = create<AuthState>()((set, get) => ({
    user: null,
    authenticated: "cheking",
    login: async (email: string, password: string) => {
        console.log({email, password});
        try {
            const data = await loginAction({email, password});
            set({user: data.user,  authenticated: "authenticated"});
            return true;
        } catch (error) {
            console.log(error);
            set({user: null, authenticated: "no-authenticated"});
            return false;
        }
    },

    checkAuth: async () => {
        try {
            const data = await checkAuthAction();

            if(data){
                set({user: data, authenticated: "authenticated"});
            }else{
                set({user: null, authenticated: "no-authenticated"})
            }


            console.log("user check auth", get().user);
        } catch (error) {
            set({user: null, authenticated: "no-authenticated"});
        }
    },

    logout: async () => {
        await logoutAction();
        set({user: null,  authenticated: "no-authenticated"});
    },

    isAdmin: () => {

        //Se obtienen los roles que tiene el usuario autenticado para verificar si es admin
        const roles = get().user?.roles ?? [];

        return roles.includes("admin");
    },

    register: async (user: RegisterUserRequest) => {
        try {
            const data = await registerUserAction(user);
            set({user: data, authenticated: "authenticated"});
            return true;
        } catch (error) {
            console.log(error);
            set({user: null, authenticated: "no-authenticated"});
            return false;
        }
    }
}));