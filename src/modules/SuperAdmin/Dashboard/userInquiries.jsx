import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Loader from "../../../components/Loader";
import DeleteModal from "../../../components/DeleteModal";
import { useModal } from "../../../hooks/modal";

const UserInquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const [loader, setLoader] = useState(true);

    const { openModal, closeModal } = useModal();

    const { mutate } = useApiMutation();


    useEffect(() => {
        getCustomerEnquiries();
    }, []);



    const getCustomerEnquiries = () => {
        setLoader(true);
        setEnquiries([]);
        mutate({
            url: `/admin/contact/us/forms`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setEnquiries(response.data.data);
                setLoader(false)
            },
            onError: () => {
                setEnquiries([]);
                setLoader(false)
            }
        });
    }




    const handleDeleteModal = (id) => {
        openModal({
            size: "sm",
            content: (
                <DeleteModal title={'Do you want to delete this inquiry'} redirect={() => getCustomerEnquiries()} api={`/admin/contact/us/form?id=${id}`} />
            )
        })
    }




    if (loader) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }






    return (
        <>
            <div className="bg-white rounded-md p-6 w-full gap-5">
                <h2 className="text-lg font-semibold text-black-700 mb-4">
                    User Inquiries
                </h2>
                <div className=" grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 divide-y">
                    {enquiries?.map((data, index) => (
                        <div
                            className="border p-7 rounded-lg bg-white relative"
                            key={index}
                        >
                            <h3 className="text-lg font-semibold leading-loose">
                                {data.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 my-2 leading-loose">
                                <span className="text-blue-500 leading-loose">
                                    {data.email}
                                </span>
                            </div>
                            <div
                                className="text-sm text-gray-700 leading-loose"
                                dangerouslySetInnerHTML={{
                                    __html: loadMore ? data?.message : data?.message.slice(0, 200),
                                }}
                            ></div>

                            {data?.message.length > 200 && !loadMore && (
                                < div className="flex w-full">
                                    <span
                                        onClick={() => setLoadMore(true)}
                                        className="border w-full cursor-pointer mt-4 py-4 flex justify-center rounded-lg text-sm hover:bg-gray-100"
                                    >
                                        Read More
                                    </span>
                                </div>
                            )
                            }

                            <div className="flex items-center gap-3 absolute right-2 top-2">
                                <RiDeleteBin5Line
                                    color="red"
                                    size={20}
                                    className=" cursor-pointer"
                                    onClick={() => handleDeleteModal(data.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
};

export default UserInquiries;