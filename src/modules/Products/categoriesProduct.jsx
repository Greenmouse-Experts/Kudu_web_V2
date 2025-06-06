import { useEffect, useState } from "react";
import "../Home/components/style.css";
import useApiMutation from "../../api/hooks/useApiMutation";
import { useParams } from "react-router-dom";
import ShoppingExperience from "../Home/components/ShoppingExperience";
import ProductListing from "../Home/components/ProductListing";
import Loader from "../../components/Loader";
import { useGeoLocatorCurrency } from "../../hooks/geoLocatorProduct";

const CategoriesProduct = () => {
    const [products, setProducts] = useState([]);
    const [paginate, setPaginate] = useState({
        page: 1,
        limit: 20,
        total: 0,
    });
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [loading, setLoading] = useState(true);

    const currency = useGeoLocatorCurrency();

    const { id, name } = useParams();
    const { mutate } = useApiMutation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch products
                const productsData = await new Promise((resolve, reject) => {
                    mutate({
                        url: `/products?categoryId=${id}${paginate ? `&page=${paginate.page}&limit=${paginate.limit}&symbol=${currency[0].symbol}` : ""}`,
                        method: 'GET',
                        hideToast: true,
                        onSuccess: (response) => resolve(response.data || []),
                        onError: reject,
                    });
                });

                // Fetch categories
                const categoriesData = await new Promise((resolve, reject) => {
                    mutate({
                        url: `/category/sub-categories?categoryId=${id}`,
                        method: "GET",
                        headers: true,
                        hideToast: true,
                        onSuccess: (response) => resolve(response.data?.data || []),
                        onError: reject,
                    });
                });

                // Update state
                setProducts(productsData.data.length ? productsData.data : []);
                setPaginate({
                    page: productsData.pagination.currentPage || 1,
                    limit: 20,
                    total: productsData.pagination.totalPages || 0,
                });
                setCategoriesArr(categoriesData);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchData(paginate);
    }, [id]);



    const handlePagination = (page) => {
        setPaginate((prev) => ({ ...prev, page }));
        fetchData({ ...paginate, page });
    }



    return (
        <>
            <div className="w-full flex flex-col bg-[#f1f1f2]">
                <section className="breadcrumb" style={{
                    backgroundImage: `url(https://res.cloudinary.com/greenmouse-tech/image/upload/v1738015034/image_5_vbukr9.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                    <div className="flex flex-col py-12">
                        <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full">
                            <h1 className="text-4xl font-bold">{name}</h1>
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-full flex flex-col bg-[#f1f1f2] items-center">
                {/* Hero Section */}
                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-20 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full">
                    {loading ?
                        <div className="w-full h-screen flex items-center justify-center">
                            <Loader />
                        </div>
                        :
                        <div className="w-full flex mt-20 md:mt-10">
                            <ProductListing data={products} pagination={paginate} subCategoriesArr={categoriesArr} onPageChange={handlePagination} selectedCategory={name} />
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

export default CategoriesProduct;
