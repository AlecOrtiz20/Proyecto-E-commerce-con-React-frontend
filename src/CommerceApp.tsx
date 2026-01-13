import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect} from "react";

import { authStateUser } from "./auth/store/Store-auth";
import { Spinner } from "./components/ui/spinner";
import { Toaster } from "sonner";

const queryClient = new QueryClient(); 

export function EcommerceApp(){

    const checkAuth = authStateUser((s) => s.checkAuth);
    const authenticated = authStateUser((s) => s.authenticated);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if(authenticated === "cheking"){
        return <Spinner />
    }

    return(
        
       <QueryClientProvider client={queryClient}>
                <RouterProvider router={appRouter}/>
            <ReactQueryDevtools initialIsOpen={true}/>
            <Toaster/>
       </QueryClientProvider>
    
    );
};