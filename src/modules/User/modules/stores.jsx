import React, { useEffect, useState } from 'react';
import useApiMutation from '../../../api/hooks/useApiMutation';
import { Button } from '@material-tailwind/react';
import AllStore from '../components/AllStores';
import Loader from '../../../components/Loader';
import { useNavigate } from 'react-router-dom';

const Stores = () => {
    const [storesData, setAllStores] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { mutate } = useApiMutation();

    const fetchData = async (page) => {
        try {
            const storesRequest = new Promise((resolve, reject) => {
                mutate({
                    url: `/vendor/store`,
                    method: 'GET',
                    headers: true,
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data),
                    onError: reject,
                });
            });
            const [stores] = await Promise.all([
                storesRequest,
            ]);

            setAllStores(stores.data)
            // setPagination(stores.pagination);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchData(1);
    }, []);

    return (
        <>
            {loading ? (
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <div className="bg-white rounded-lg w-full shadow">
                    <h2 className="text-lg font-bold p-6">Stores</h2>
                    <div className="w-full h-[1px] border" />
                    <div className="mt-5">
                        {storesData.length > 0
                            ?
                            <AllStore data={storesData} paginate={pagination} refetch={(page) => fetchData(page)} />
                            :
                            <div className="w-full">
                                <div className="empty-store">
                                    <div className="text-center">
                                        <img
                                            src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736780988/Shopping_bag-bro_1_vp1yri.png"
                                            alt="Empty Store Illustration"
                                            className="w-80 h-80 mx-auto"
                                        />
                                    </div>
                                    <h1 className="text-center text-lg font-bold mb-4">No Store Found</h1>
                                    <div className="text-center text-black-100 mb-6 leading-loose text-sm">
                                        <Button className='md:w-1/4 w-full bg-kuduOrange p-3' onClick={() => navigate('create')}>
                                            Add New Store
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default Stores;
