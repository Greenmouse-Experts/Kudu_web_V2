import { useEffect, useState } from "react";
import useApiMutation from "../../api/hooks/useApiMutation";
import ProductListing from "../../components/ProductsList";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ShoppingExperience from "../Home/components/ShoppingExperience";

const SearchProduct = () => {
    const [products, setProducts] = useState([]);
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();

    // Get single parameter
    const searchQuery = searchParams.get('q') || '';


    const { mutate } = useApiMutation();

    // Fetch products from API
    const fetchData = async () => {
        try {
            const productRequest = new Promise((resolve, reject) => {
                mutate({
                    url: `/products?name=${searchQuery}`,
                    method: 'GET',
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data?.data || []),
                    onError: reject,
                });
            });

            const [productsData] = await Promise.all([productRequest]);

            if (!productsData || productsData.length === 0) {
                console.warn("No products found.");
                setProducts([]);
                return;
            }

            setProducts(productsData);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <div className="w-full flex flex-col">
                <div className="w-full flex gap-2 md:px-20 py-5 px-5 mt-14">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex gap-2 font-semibold text-sm">
                            <span className="flex flex-col pt-1">
                                Home
                            </span>
                            <span className="pt-[5px]">{">"}</span>
                        </div>
                        <div className="flex gap-2 font-semibold text-sm">
                            <span className="flex flex-col pt-1">
                                Search
                            </span>
                            <span className="pt-[5px]">{">"}</span>
                        </div>
                        <div className="flex gap-2 font-semibold text-sm">
                            <span className="flex flex-col pt-1">
                                {searchQuery}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col bg-white items-center">
                {/* Hero Section */}
                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-20 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                    {loading ?
                        <div className="w-full h-screen flex items-center justify-center">
                            <Loader />
                        </div>
                        :
                        products.length > 0 ?
                            <div className="w-full flex mt-0">
                                <ProductListing productsArr={products} />
                            </div>
                            :
                            <div className="empty-store mt-20">
                                <div className="text-center">
                                    <img
                                        src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736780988/Shopping_bag-bro_1_vp1yri.png"
                                        alt="Empty Store Illustration"
                                        className="w-80 h-80 mx-auto"
                                    />
                                </div>
                                <h1 className="text-center text-lg font-bold mb-4">Search Item not found!</h1>
                            </div>
                    }
                </div>

                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                    <div className="w-full flex mt-3">
                        <ShoppingExperience />
                    </div>
                </div>
            </div>
        </>
    );

};

export default SearchProduct;