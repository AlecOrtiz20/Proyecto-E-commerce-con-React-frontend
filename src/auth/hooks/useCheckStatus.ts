import { useQuery } from "@tanstack/react-query";
import { authStateUser } from "../store/Store-auth";


export const useCheckStatus = () => {
    const {checkAuth} = authStateUser();
    return useQuery({
        queryKey: ["auth", "status"],
        queryFn: checkAuth,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
};