import { useCallback, useEffect, useState } from "react"
import Loader from "../../../components/Loader";
import useApiMutation from "../../../api/hooks/useApiMutation";
import useAppState from "../../../hooks/appState";
import { useGeoLocatorCurrency } from "../../../hooks/geoLocatorProduct";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Tables";
import { useModal } from "../../../hooks/modal";
import { useForm } from "react-hook-form";

export default function Wallet() {
    const { user } = useAppState();
    const [userProfile, setProfile] = useState(user);
    const [bankInformation, setBankInformation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();


    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();

    const currency = useGeoLocatorCurrency();
    const { mutate } = useApiMutation();

    const getUserProfile = useCallback(() => {
        return new Promise((resolve) => {
            mutate({
                url: "/user/profile",
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => resolve(response.data.data),
                onError: () => resolve(null), // Prevent failure from affecting other calls
            });
        });
    }, [mutate]);

    const getBankInfo = useCallback(() => {
        return new Promise((resolve) => {
            mutate({
                url: "/vendor/bank/informations",
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => resolve(response.data.data),
                onError: () => resolve(null), // Prevent failure from affecting other calls
            });
        });
    }, [mutate]);

    const fetchData = useCallback(async () => {
        const [profile, bankInfo] = await Promise.all([getUserProfile(), getBankInfo()]);
        if (bankInfo) {
            const parsedBankInfo = parseQueryString(bankInfo[0].bankInfo);
            parsedBankInfo.id = bankInfo[0].id;
            setBankInformation([parsedBankInfo])
        }

        if (profile) setProfile(profile);

        setIsLoading(false);
    }, [getUserProfile, getBankInfo]);


    useEffect(() => {
        fetchData();
    }, [fetchData]);



    const parseQueryString = (queryString) => {
        const obj = {};
        queryString.split("?").forEach(pair => {
            const [key, value] = pair.split("=");
            obj[decodeURIComponent(key)] = decodeURIComponent(value || "");
        });
        return obj;
    };





    const onInitiateWithdrawal = (data) => {
        const payload = {
            ...data,
            bankInformationId: bankInformation[0].id,
            currency: currency[0].name === 'Naira' ? 'NGN' : 'USD'
        }

        mutate({
            url: "/vendor/withdrawal",
            method: "POST",
            data: payload,
            headers: true,
            onSuccess: (response) => {
                closeModal();
            },
            onError: () => {
                setDisabled(false);
            },
        });
    };







    const initiateWithdrawal = (bankId) => {
        openModal({
            size: "sm",
            content: (
                <form className="grid grid-cols-2 gap-1" onSubmit={handleSubmit(onInitiateWithdrawal)}>
                    {/* Country Selection */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mt-4 mb-2">Amount to Withdraw</label>
                        <input
                            type="number"
                            id="title"
                            {...register("amount", { required: "Amount is required" })}
                            placeholder="Enter amount"
                            className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                            style={{ outline: "none" }}
                            required
                        />
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <Button
                            type="submit"
                            className="bg-kuduOrange text-white normal-case text-sm font-medium rounded-md hover:bg-orange-600"
                        >
                            Initiate Withdrawal
                        </Button>
                    </div>
                </form>
            )
        })
    }






    return (
        <>
            <div className="w-full p-6 bg-white shadow rounded-lg">
                <div className="flex w-full justify-between">
                    <h2 className="text-lg font-bold mb-4">Wallet</h2>
                </div>

                {isLoading ? (
                    <div className="w-full h-96 flex items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="mt-4">
                        <div className="w-full flex md:flex-row flex-col gap-3 justify-between">
                            <div className="w-full flex flex-col gap-2">
                                <p className="text-kuduRomanSilver font-semibold text-sm md:text-base">
                                    Wallet Balance
                                </p>
                                <p className="text-lg md:text-2xl font-bold">
                                    {currency[0].symbol}
                                    {
                                        currency[0].name === 'Naira' ?
                                            userProfile.wallet ? Number(userProfile.wallet).toLocaleString('en-US') : '0'
                                            :
                                            userProfile.dollarWallet ? Number(userProfile.wallet).toLocaleString('en-US') : '0'
                                    }
                                </p>
                            </div>
                            <div className="">
                                <Button className="bg-kuduOrange" onClick={() => initiateWithdrawal(bankInformation[0].id)}>
                                    Withdraw
                                </Button>
                            </div>
                        </div>

                        <div className="mt-20 md:mt-10 w-full">

                            {bankInformation.length > 0 ? (
                                <Table
                                    headers={[
                                        { key: 'bankName', label: 'Bank Name' },
                                        { key: 'accountNumber', label: 'Account Number' },
                                        {
                                            key: 'accountName', label: 'Account Name'
                                        },
                                        {
                                            key: 'swiftCode', label: 'Swift/BIC Code', render: (value) =>
                                                value ?
                                                    value : '---'
                                        },
                                        {
                                            key: 'routingNumber', label: 'Routing Number', render: (value) =>
                                                value ?
                                                    value : '---'
                                        },
                                        {
                                            key: 'bankAddress', label: 'Bank Address', render: (value) =>
                                                value ?
                                                    value : '---'
                                        },
                                    ]}
                                    data={bankInformation}
                                    actions={[
                                        {
                                            label: (row) => {
                                                return 'Edit';
                                            },
                                            onClick: (row) => navigate(`edit-account/${row.id}`),
                                        },
                                    ]}
                                    currentPage={null}
                                    totalPages={null}
                                />
                            ) : (
                                <div className="empty-store">
                                    <div className="text-center">
                                        <img
                                            src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736780988/Shopping_bag-bro_1_vp1yri.png"
                                            alt="Empty Store Illustration"
                                            className="w-80 h-80 mx-auto"
                                        />
                                    </div>
                                    <h1 className="text-center text-lg font-bold mb-4">
                                        No Account Added
                                    </h1>

                                    <div className="w-full flex justify-center p-1">
                                        <Button className="text-white" onClick={() => navigate('add-account')}>
                                            ADD BANK ACCOUNT
                                        </Button>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}