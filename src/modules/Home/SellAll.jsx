import { useEffect, useState } from "react";
import "../Home/components/style.css";
import ProductListing from "./components/ProductListing";
import ShoppingExperience from "./components/ShoppingExperience";
import useApiMutation from "../../api/hooks/useApiMutation";
import Loader from "../../components/Loader";
import { useGeoLocatorCurrency } from "../../hooks/geoLocatorProduct";

const About = () => {
    const [products, setProducts] = useState([]);
    const [paginate, setPaginate] = useState({
        page: 1,
        limit: 20,
        total: 0,
    });
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const currency = useGeoLocatorCurrency();


    const { mutate } = useApiMutation();

    // Fetch products from API
    const fetchData = async (paginate) => {
        setLoading(true); // Ensure loading starts before fetching

        try {
            const [productsData, categoriesData] = await Promise.all([
                new Promise((resolve, reject) => {
                    mutate({
                        url: `/products${paginate ? `?page=${paginate.page}&limit=${paginate.limit}&symbol=${currency[0].symbol}` : ""}`,
                        method: 'GET',
                        hideToast: true,
                        onSuccess: (response) => resolve(response.data || []),
                        onError: reject,
                    });
                }),
                new Promise((resolve, reject) => {
                    mutate({
                        url: `/categories`,
                        method: "GET",
                        headers: true,
                        hideToast: true,
                        onSuccess: (response) => resolve(response.data?.data || []),
                        onError: reject,
                    });
                }),
            ]);

            setProducts(productsData.data.length ? productsData.data : []);
            setPaginate({
                page: productsData.pagination.currentPage || 1,
                limit: 20,
                total: productsData.pagination.totalPages || 0,
            });
            setCategoriesArr(categoriesData.length ? categoriesData : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Ensure loading is stopped after everything is done
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData(paginate);
    }, []);


    const handlePagination = (page) => {
        setPaginate((prev) => ({ ...prev, page }));
        fetchData({ ...paginate, page });
    }


    return (
        <>
            <div className="w-full flex flex-col">
                <section className="breadcrumb" style={{
                    backgroundImage: `url(https://res.cloudinary.com/greenmouse-tech/image/upload/v1738015034/image_5_vbukr9.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                    <div className="flex flex-col">
                        <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full">
                            <h1 className="text-4xl font-bold">Products</h1>
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-full flex flex-col bg-white items-center">
                {/* Hero Section */}
                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-20 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                    <div className="w-full flex mt-10">
                        {loading ? (
                            <div className="w-full flex my-20">
                                <Loader />
                            </div>
                        )
                            :
                            <ProductListing data={products} pagination={paginate} categories={categoriesArr} onPageChange={handlePagination} />
                        }
                    </div>
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

export default About;
