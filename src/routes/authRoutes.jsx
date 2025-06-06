import Login from "../modules/Auth/login";
import SignUp from "../modules/Auth/signUp";
import Forget from "../modules/Auth/forget";
import VerifyEmail from "../modules/Auth/verifyEmail";
import AdminLogin from "../modules/SuperAdmin";

export const authRoutes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    },
    {
        path: '/forget',
        element: <Forget />,
    },
    {
        path: '/verify-account',
        element: <VerifyEmail />
    },
    {
        path: "auth/admin/login",
        element: <AdminLogin />
    },
];
