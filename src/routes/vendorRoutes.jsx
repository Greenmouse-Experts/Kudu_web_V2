import VendorLayout from "../layouts/vendor";
import Dashboard from "../modules/Vendor/Dashboard";

export const vendorRoutes = [
    {
        path: '/vendor',
        element: <VendorLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            }        
        ],
    },
];
