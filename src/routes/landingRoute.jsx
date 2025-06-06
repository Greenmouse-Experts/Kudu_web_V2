import LandingLayout from "../layouts/landing";
import LandingHomepage from "../modules/Home";
import Contact from "../modules/Home/contact";
import Faqs from "../modules/Home/faqs";
import Privacy from "../modules/Home/privacy";
import Cookie from "../modules/Home/cookies";
import Return from "../modules/Home/return";
import Condititons from "../modules/Home/conditions";
import Testimonial from "../modules/Home/testimonial";
import About from "../modules/Home/about";
import SellAll from "../modules/Home/SellAll";
import Careers from "../modules/Home/Careers";
import JobDetails from "../modules/Home/JobDetails";
import BecomeAvendor from "../modules/Home/BecomeAvendor";
import AdvertiseOnKudu from "../modules/Home/AdvertiseOnKudu"
import SearchProduct from "../modules/Products/searchProduct";
import UserSettings from "../modules/Settings";
import ProfileSettings from "../modules/Settings/modules/profile";
import Notification from "../modules/Notification/Notification";
import ProfileSecurity from "../modules/Settings/modules/security";
import ViewProduct from "../modules/Products/viewProduct";
import CategoryProduct from "../modules/Products/categoriesProduct";
import Cart from "../modules/Cart";
import Messages from "../modules/Messages";
import ErrorBoundary from "../components/ErrorBoundary";


export const landingRooutes = [
  {
    path: '/',
    element: <LandingLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <LandingHomepage />,
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'faqs',
        element: < Faqs />
      },
      {
        path: 'privacy',
        element: <Privacy />
      },
      {
        path: 'product/:id',
        element: <ViewProduct />
      },
      {
        path: 'products/categories/:id/:name',
        element: <CategoryProduct />
      },
      {
        path: 'terms-condition',
        element: <Condititons />
      },

      {
        path: 'testimonial',
        element: <Testimonial />
      },

      {
        path: 'about',
        element: <About />
      },

      {
        path: 'see-all',
        element: <SellAll />
      },

      {
        path: 'career',
        element: <Careers />
      },

      {
        path: 'jobs-details/:jobId',
        element: <JobDetails />
      },

      {
        path: 'become-a-vendor',
        element: <BecomeAvendor />
      },

      {
        path: 'advertise-with-us',
        element: <AdvertiseOnKudu />
      },
      {
        path: 'catalog',
        element: <SearchProduct />
      },
      {
        path: 'settings',
        element: <UserSettings />,
        children: [
          {
            path: 'profile',
            element: <ProfileSettings />,
          },
          {
            path: 'security',
            element: <ProfileSecurity />,
          },
        ]
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'messages',
        element: <Messages />
      },
      {
        path: 'notification',
        element: <Notification />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'faqs',
        element: < Faqs />
      },
      {
        path: 'privacy',
        element: <Privacy />
      },

      {
        path: 'terms-condition',
        element: <Condititons />
      },

      {
        path: 'testimonial',
        element: <Testimonial />
      },

      {
        path: 'about',
        element: <About />
      },

      {
        path: 'see-all',
        element: <SellAll />
      },

      {
        path: 'career',
        element: <Careers />
      },

      {
        path: 'jobs-details',
        element: <JobDetails />
      },

      {
        path: 'become-a-vendor',
        element: <BecomeAvendor />
      },

      {
        path: 'advertise-with-us',
        element: <AdvertiseOnKudu />
      },

      {
        path: 'cookie-policy',
        element: <Cookie />
      },

      {
        path: 'return-policy',
        element: <Return />
      },
      
    ],
  }
];