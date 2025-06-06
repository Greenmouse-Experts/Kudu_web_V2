import React, { useEffect, useState } from 'react';
import { dateFormat } from '../helpers/dateHelper';
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../hooks/modal';
import useApiMutation from '../api/hooks/useApiMutation';
import Table from './ReviewTable';

const VendorTable = ({ data, totalData, refetch }) => {
    const [kycData, setKYCData] = useState([]);
    const { openModal } = useModal();

    const vendorsData = data.data;

    const { mutate } = useApiMutation();

    const getKYC = () => {
        mutate({
            url: `/admin/kyc`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setKYCData(response.data.data);
                setIsLoading(false)
            },
            onError: () => {
                setIsLoading(false)
            }
        });
    }

    useEffect(() => {
        getKYC();
    }, []);

    const navigate = useNavigate();

    const routeKYC = (id) => {
        const userKYC = kycData.find((item) => item.vendorId === id);

        if (userKYC) {
            navigate(`kyc/${id}`)
        }
        else {
            openModal({
                size: "sm",
                content: <>
                    <div className="w-full flex h-auto flex-col px-3 py-6 gap-3 -mt-3">
                        <div className="flex gap-5 justify-center w-full">
                            <p className="font-semibold text-center text-lg">
                                User has not completed their KYC process.
                            </p>
                        </div>
                    </div>
                </>
            })

        }
    };


    const fetchNew = (page) => {
        refetch(page)
    }


    return (
        <>
            <div className="rounded-md pb-2 w-full gap-5"><h2 className="text-lg font-semibold text-black-700 mb-4">All Vendors</h2></div>
            <div className="bg-white rounded-md p-6 w-full gap-5">
                <h2 className="text-lg font-semibold text-black-700">All Vendors</h2>
                <div className="overflow-x-auto">
                    <Table
                        columns={[
                            { key: 'name', label: 'Name' },
                            { key: 'email', label: 'Email' },
                            { key: 'accountType', label: 'User Type' },
                            { key: 'dateJoined', label: 'Date Joined' },
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
                            { key: 'isVerified', label: 'Verified',
                                render: (value) => (
                                    <span className={`py-1 px-3 rounded-full text-sm capitalize ${value
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-red-100 text-red-600'
                                        }`}>
                                        {value ? 'Verified' : 'Unverified'}
                                    </span>
                                )
                             }
                        ]}
                        allData={totalData.map((item) => ({
                            ...item,
                            name: `${item.firstName} ${item.lastName}`,
                            dateJoined: dateFormat(item.createdAt, 'dd-MM-yyyy'),
                        }))}
                        data={vendorsData.map((item) => ({
                            ...item,
                            name: `${item.firstName} ${item.lastName}`,
                            dateJoined: dateFormat(item.createdAt, 'dd-MM-yyyy'),
                        }))}
                        exportData
                        hasNumber
                        actions={[]}
                        currentPage={data.meta.currentPage}
                        totalPages={data.meta.totalPages}
                        onPageChange={(page) => fetchNew(page)}
                    />
                </div>
            </div>
        </>
    );
};

export default VendorTable;