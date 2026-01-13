import type { PropsWithChildren } from "react";
import { authStateUser } from "../store/Store-auth";
import { Navigate } from "react-router";

export const AdminRoutesValidation = ({children}: PropsWithChildren) => {

    const {isAdmin, authenticated} = authStateUser();

    if(authenticated === "cheking") return <Navigate to="/auth/login"/>

    if(!isAdmin() && authenticated === "no-authenticated") return <Navigate to="/auth/login"/>

    return children;
};