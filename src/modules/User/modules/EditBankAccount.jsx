import { useNavigate, useParams } from "react-router-dom";
import useApiMutation from "../../../api/hooks/useApiMutation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGeoLocatorCurrency } from "../../../hooks/geoLocatorProduct";
import Loader from "../../../components/Loader";


const EditBankAccount = () => {
    const currency = useGeoLocatorCurrency();

    const { mutate } = useApiMutation();
    const navigate = useNavigate();

    const [bankDetails, setBankDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);

    const { id } = useParams();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm();





    const editAccount = (data) => {
        setDisabled(true);
        const payload = {
            bankInfo: { ...data }
        }

        const query = formatPayloadAsQuery(payload.bankInfo);

        mutate({
            url: "/vendor/bank/informations",
            method: "PUT",
            data: {bankId: id, bankInfo: query },
            headers: true,
            onSuccess: (response) => {
                navigate(-1)
                setDisabled(false);
            },
            onError: () => {
                setDisabled(false);
            },
        });
    };





    const getBankInfo = () => {
        mutate({
            url: `/vendor/bank/information?bankId=${id}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                const bankInfo = parseQueryString(response.data.data.bankInfo);                
                setBankDetails(bankInfo);
            },
            onError: () => {
                setLoading(false);
            }
        });
    }




    const formatPayloadAsQuery = (data) => {
        return Object.entries(data)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join("?");
    };



    const parseQueryString = (queryString) => {
        const obj = {};
        queryString.split("?").forEach(pair => {
            const [key, value] = pair.split("=");
            obj[decodeURIComponent(key)] = decodeURIComponent(value || "");
        });
        return obj;
    };





    useEffect(() => {
        getBankInfo();
    }, []);




    useEffect(() => {
        if (!bankDetails || Object.keys(bankDetails || {}).length === 0) return;

        setValue("bankName", bankDetails.bankName);
        setValue("accountNumber", bankDetails.accountNumber);
        setValue("accountName", bankDetails.accountName);
        setValue("swiftCode", bankDetails.swiftCode);
        setValue("routingNumber", bankDetails.routingNumber);
        setValue("bankAddress", bankDetails.bankAddress);

        setLoading(false);
    }, [bankDetails, setValue]);



    if (loading) {
        return (<div className="w-full h-screen flex items-center justify-center">
            <Loader />
        </div>
        )
    }


    return (
        <div className='w-full'>
            <div className="rounded-md pb-2 w-full gap-5">
                <h2 className="text-lg font-semibold text-black-700">Edit Bank Account</h2>
            </div>
            <div className="w-full flex flex-grow mt-3">
                <div className="shadow-xl py-2 px-5 md:w-3/4 w-full bg-white flex rounded-xl flex-col gap-10">

                    <form
                        className="w-full flex flex-col items-center justify-center p-4"
                        onSubmit={handleSubmit(editAccount)}
                    >
                        <div className="w-full p-6">

                            <div className="mb-4">
                                <label
                                    className="block text-md font-semibold mb-3"
                                    htmlFor="title"
                                >
                                    Bank Name
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    {...register("bankName", { required: "Bank Name is required" })}
                                    placeholder="Enter bank name"
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                    style={{ outline: "none" }}
                                    required
                                />
                            </div>


                            <div className="mb-4">
                                <label
                                    className="block text-md font-semibold mb-3"
                                    htmlFor="title"
                                >
                                    Account Number
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    {...register("accountNumber", { required: "Account Number is required" })}
                                    placeholder="Enter account number"
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                    style={{ outline: "none" }}
                                    required
                                />
                            </div>


                            <div className="mb-4">
                                <label
                                    className="block text-md font-semibold mb-3"
                                    htmlFor="title"
                                >
                                    Bank Account Name (Full Name)
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    {...register("accountName", { required: "Account Name is required" })}
                                    placeholder="Enter account name"
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                    style={{ outline: "none" }}
                                    required
                                />
                            </div>

                            {currency[0].name !== 'Naira' &&
                                (
                                    <>
                                        <div className="mb-4">
                                            <label
                                                className="block text-md font-semibold mb-3"
                                                htmlFor="title"
                                            >
                                                SWIFT/BIC CODE
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                {...register("swiftCode", { required: "Swift Code is required" })}
                                                placeholder="Enter swift code"
                                                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                                style={{ outline: "none" }}
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label
                                                className="block text-md font-semibold mb-3"
                                                htmlFor="title"
                                            >
                                                Routing Number
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                {...register("routingNumber", { required: "Routing Number is required" })}
                                                placeholder="Enter routing number"
                                                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                                style={{ outline: "none" }}
                                                required
                                            />
                                        </div>


                                        <div className="mb-4">
                                            <label
                                                className="block text-md font-semibold mb-3"
                                                htmlFor="title"
                                            >
                                                Bank Address (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                {...register("bankAddress")}
                                                placeholder="Enter bank address"
                                                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                                style={{ outline: "none" }}
                                            />
                                        </div>

                                    </>
                                )
                            }
                            <div className="w-full md:w-2/5">
                                <button
                                    type="submit"
                                    disabled={disabled}
                                    className="w-full bg-kuduOrange text-white py-2 px-4 rounded-md font-bold"
                                >
                                    Edit Account
                                </button>
                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    )
};

export default EditBankAccount;