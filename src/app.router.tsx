import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shopFrontend/layout/ShopLayout";
import { ShopHome } from "./shopFrontend/pages/home/ShopHome";
import { ProductPage } from "./shopFrontend/pages/product/ProductPage";
import { GenderPage } from "./shopFrontend/pages/gender/GenderPage";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { DashboardAdminPage } from "./admin/pages/dashboard/DashboardAdminPage";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import { lazy } from "react";
import { AdminRoutesValidation } from "./auth/routes/Protected-routes";

const AdminLayouth = lazy(() => import("./admin/layout/AdminLayout"));
const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));

export const appRouter = createBrowserRouter([
    
    {
        path: '/',
        element: <ShopLayout/>,
        children: [
            {
                index: true,
                element: <ShopHome/>,
            },
            {
                path: 'product/:title',
                element: <ProductPage/>
            },
            {
                path: "gender/:gender",
                element: <GenderPage/>
            }
        ]
    },
    //Auth Routes
    {
        path: '/auth',
        element: <AuthLayout/>,
        children:[
            {
                index: true,
                element: <Navigate  to='/auth/login'/>
            },
            {
                path:'login',
                element: <LoginPage/>
            },
            {
                path: 'register',
                element: <RegisterPage/>
            }
        ]
    },
    //Admin routes
    {
        path:'/admin',
        element: <AdminRoutesValidation>
                    <AdminLayouth/>
                </AdminRoutesValidation>,
        children: [
            {
                index: true,
                element: <DashboardAdminPage/>
            },
            {
                path:'products',
                element: <AdminProductsPage/> 
            },
            {
                path:'products/:id',
                element: <AdminProductPage/>
            }
        ],
        
        
    },
    {
        path:'*',
        element: <Navigate to='/'/>

    }

]);