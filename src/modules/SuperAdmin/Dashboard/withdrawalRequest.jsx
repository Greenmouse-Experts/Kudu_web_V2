import React from 'react';
import useApiMutation from '../../../api/hooks/useApiMutation';
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from '../../../components/Loader';
import { dateFormat } from '../../../helpers/dateHelper';
import Table from '../../../components/ReviewTable';
import { useModal } from '../../../hooks/modal';

const WithdrawalRequest = () => {
    const { mutate } = useApiMutation();

    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const { openModal, closeModal } = useModal();


    const getRequests = () => {
        mutate({
            url: `/admin/withdrawals`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setWithdrawals(response.data.data);
                setIsLoading(false);
            },
            onError: () => {
            }
        });
    }


    useEffect(() => {
        getRequests();
    }, []);






    const handleViewModal = (bank) => {
        openModal({
            size: "md",
            content: (
                <>
                    <div className="grid grid-cols-2 gap-1 px-4">
                        <div className="">
                            <label className="block text-sm font-medium mt-4">Bank Name</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {bank.bankInfo.bankName}
                            </div>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium mt-4">Account Number</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {bank.bankInfo.accountNumber}
                            </div>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium mt-4">Account Name</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {bank.bankInfo.accountName}
                            </div>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium mt-4">Swift Code</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {bank.bankInfo.swiftCode || '---'}
                            </div>
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mt-4">Routing Number</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {bank.bankInfo.routingNumber || '---'}
                            </div>
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mt-4">Bank Address</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {bank.bankInfo.bankAddress}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end w-full mt-5 gap-4">
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 text-black px-4 py-2 font-[500] rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </>
            )
        })
    }





    const parseBankInfo = (bankInfo) => {
        const params = bankInfo.split("?").reduce((acc, param) => {
            const [key, value] = param.split("=");
            if (key && value) acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
        return params;
    };




    return (
        <div className="min-h-screen">
            {loading ?
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
                :
                <>
                    <div className="rounded-md pb-2 w-full gap-5"><h2 className="text-lg font-semibold text-black-700 mb-4">Withdrawal Request</h2></div>
                    <div className="bg-white rounded-md p-6 w-full gap-5">
                        <h2 className="text-lg font-semibold text-black-700">Withdrawal Request</h2>
                        <div className="overflow-x-auto">
                            <Table
                                columns={[
                                    { key: 'name', label: 'Name' },
                                    { key: 'amount', label: 'Amount' },
                                    { key: 'currency', label: 'Currency' },
                                    { key: 'createdAt', label: 'Created On', render: (value) => (<>{dateFormat(value, 'dd MMM yyyy')}</>) },
                                    {
                                        key: 'status',
                                        label: 'Status',
                                        render: (value) => (
                                            <span className={`py-1 px-3 rounded-full text-sm capitalize ${value === 'active'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                                }`}>
                                                {value}
                                            </span>
                                        )
                                    },
                                ]}
                                allData={withdrawals.map((item) => ({
                                    ...item,
                                    name: `${item.vendor.firstName} ${item.vendor.lastName}`,
                                    bankInfo: parseBankInfo(item.bankInformation.bankInfo),
                                }))}
                                data={withdrawals.map((item) => ({
                                    ...item,
                                    name: `${item.vendor.firstName} ${item.vendor.lastName}`,
                                    bankInfo: parseBankInfo(item.bankInformation.bankInfo),
                                }))}
                                exportData
                                actions={
                                    [
                                        {
                                            label: (row) => {
                                                return 'View Bank Details';
                                            },
                                            onClick: (row) => handleViewModal(row),
                                        },
                                    ]
                                }
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default WithdrawalRequest;
