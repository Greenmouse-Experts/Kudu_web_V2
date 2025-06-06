import { useEffect, useState } from "react";
import "../Home/components/style.css";
import SearchSection from "./components/SearchSection";
import PreviewSection from "./components/PreviewSection";
import ShoppingExperience from "./components/ShoppingExperience";
import GetApp from "./components/GetApp";
import "../Home/components/style.css";
import useApiMutation from "../../api/hooks/useApiMutation";
import ProductsSection from "./components/ProductsSection";
import Loader from "../../components/Loader";
import TrendingProducts from "./components/TrendingProducts";
import CategoriesSection from "./components/CategoriesSection";
import ProductConditions from "./components/ProductConditions";
import AuctionPage from "../Auction/layouts/AuctionPage";
import { useGetJobClient } from "../../api/jobs";
import TrendingJobs from "./components/TrendingJobs";
import { useGeoLocatorCurrency } from "../../hooks/geoLocatorProduct";


export default function NewHome() {
    const { mutate } = useApiMutation();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [auctionProducts, setAuctionProducts] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    const { data: jobs, isLoading } = useGetJobClient();

    const currency = useGeoLocatorCurrency();


    const colorMap = [
        "bg-kuduStrayBlue",
        "bg-kuduPink",
        "bg-kuduOrangeLight",
        "bg-kuduLightGreen",
        "bg-kuduPurple",
        "bg-kuduStrayBlue",
        "bg-kuduPink",
        "bg-kuduOrangeLight",
        "bg-kuduLightGreen",
        "bg-kuduPurple",
        "bg-kuduStrayBlue",
    ];


    // Fetch products from API
    const fetchData = async () => {
        try {
            const productRequest = new Promise((resolve, reject) => {
                mutate({
                    url: `/products?symbol=${currency[0].symbol}&limit=100000000`,
                    method: 'GET',
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data?.data || []),
                    onError: reject,
                });
            });

            const trendingProductRequest = new Promise((resolve, reject) => {
                mutate({
                    url: '/products?popular=true',
                    method: 'GET',
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data?.data || []),
                    onError: reject,
                });
            });


            const auctionProductRequest = new Promise((resolve, reject) => {
                mutate({
                    url: '/auction/products?auctionStatus=upcoming',
                    method: 'GET',
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data?.data || []),
                    onError: reject,
                });
            });


            const categoriesRequest = new Promise((resolve, reject) => {
                mutate({
                    url: `/categories`,
                    method: "GET",
                    headers: true,
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data?.data || []),
                    onError: reject,
                });
            });


            const [productsData] = await Promise.all([productRequest]);
            const [trending] = await Promise.all([trendingProductRequest]);
            const [auction] = await Promise.all([auctionProductRequest]);
            const [categoriesData] = await Promise.all([categoriesRequest]);

            setTrendingProducts(trending);
            setAuctionProducts(auction);
            setProducts(productsData);

            const filterproducts = productsData.filter((product) => product.condition === 'brand_new');

            setFilteredProducts(filterproducts)


            if (!categoriesData || categoriesData.length === 0) {
                setCategoriesArr([]);
                return;
            }

            const formattedCategories = categoriesData.map((category, index) => ({
                id: category.id,
                name: category.name,
                color: colorMap[index] || "bg-gray-200", // Default color
                img: category.image,
                active: index === 0, // First item is active, others are false
            }));

            setCategoriesArr(formattedCategories)

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };



    const fetchAds = () => {
        mutate({
            url: '/adverts?showOnHomePage=true',
            method: 'GET',
            hideToast: true,
            onSuccess: (response) => {
                setAds(response.data.data);
            },
            onError: () => {
            }
        });
    }


    // Fetch data on component mount
    useEffect(() => {
        fetchData();
        fetchAds();
    }, []);




    return (
        <>
            <div className="w-full flex flex-col bg-white">
                <SearchSection categories={categoriesArr} />
                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-30 md:px-20 md:mt-2 mt-4 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                    <div className="w-full flex-col lg:hidden md:hidden gap-3 md:mt-3">
                        <div className="bg-[#A5B3FF] w-full flex justify-between p-6 rounded-md cursor-pointer">
                            <h2 className="text-lg font-semibold">Explore Popular Categories</h2>
                        </div>
                        {loading ? (
                            <div className="w-full h-screen flex items-center justify-center">
                                <Loader />
                            </div>
                        ) : (
                            <CategoriesSection data={categoriesArr} />
                        )
                        }
                    </div>
                    <div className="w-full lg:flex md:flex gap-3 md:mt-3">
                        {loading ? (
                            <div className="w-full h-screen flex items-center justify-center">
                                <Loader />
                            </div>
                        ) : (
                            <ProductsSection productsArr={products} ads={ads.slice(0, 4)} />
                        )
                        }
                    </div>
                    <div className="w-full lg:flex md:flex gap-3 md:mt-3">
                        {loading ? (
                            <div className="w-full h-screen flex items-center justify-center">
                                <Loader />
                            </div>
                        ) : (
                            <TrendingProducts productsArr={trendingProducts} ads={ads.slice(4, 8)} />
                        )}
                    </div>
                    {/* <div className="w-full lg:flex md:flex gap-3 md:mt-3">
                        {loading ? (
                            <div className="w-full h-screen flex items-center justify-center">
                                <Loader />
                            </div>
                        ) : (
                            <AuctionPage auctions={auctionProducts.slice(0, 12)} />
                        )
                        }
                    </div> */}

                    <div className="w-full lg:flex md:flex gap-3 md:mt-3">
                        {isLoading ? (
                            <div className="w-full h-screen flex items-center justify-center">
                                <Loader />
                            </div>
                        ) : (
                            <TrendingJobs jobs={jobs.slice(0, 12)} />
                        )
                        }
                    </div>

                    <div className="w-full lg:flex md:flex flex-col gap-3 md:mt-3">
                        <div className="bg-[#615353] w-full flex justify-between p-6 rounded-md cursor-pointer">
                            <h2 className="text-lg text-white font-semibold">Explore by Product Conditions</h2>
                        </div>
                        {loading ? (
                            <div className="w-full h-screen flex items-center justify-center">
                                <Loader />
                            </div>
                        ) : (
                            <ProductConditions productsArr={products} />
                        )
                        }
                    </div>
                    <div className="w-full lg:flex md:flex gap-3">
                        <PreviewSection />
                    </div>
                    <div className="w-full flex">
                        <ShoppingExperience />
                    </div>

                </div>
                <div
                    className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5"
                    style={{
                        backgroundImage: `url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1737405367/Frame_1618873123_fy7sgx.png)`,
                        backgroundBlendMode: "overlay",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                    }}
                >
                    <div className="w-full flex flex-col gap-5">
                        <GetApp />
                    </div>
                </div>
            </div>
        </>
    );
}
