import AdminLayout from "@/layouts/manager";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import ManageTenant from "@/pages/manager/tenant";
import ManageRoom from "@/pages/manager/room";
import ManageDashboard from "@/pages/manager/dashboard";
import SignIn from "@/pages/auth/SignIn";
import AuthLayout from "@/layouts/auth";
import SingUp from "@/pages/auth/SignUp";
import Invoice from "@/pages/manager/invoice";
import Test from "@/pages/test";

const router = createBrowserRouter([
    {
        path: "",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <ManageDashboard />,
            },

            {
                path: 'tenant',
                element: <ManageTenant />,
            },
            {
                path: 'room',
                element: <ManageRoom />,
            },{
                path: 'invoice',
                element: <Invoice />,
            },
        ],
    },
    {
       path: 'auth',
       element: <AuthLayout />,
       children: [
        {
            path: 'sign-in',
            element: <SignIn />,
        },
        {
            path: 'sign-up',
            element: <SingUp />,
        }
       ]
    },
    {
        path: 'test',
        element: <Test />
    }
]);

export default router;