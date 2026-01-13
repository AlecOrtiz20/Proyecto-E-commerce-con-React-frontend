import { tesloApi } from "@/api/tesloApi";

export const logoutAction = async () => {
    try {
        await tesloApi.post("/auth/logout");
        console.log("logout realizado con exito..");
    } catch (error) {
        console.log("Error al hacer el logout:", error);
        throw error;
    }
};