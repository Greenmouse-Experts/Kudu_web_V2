import React from 'react';
import { dateFormat } from '../helpers/dateHelper';
import Table from '../components/ReviewTable';

const UserTable = ({ data, totalData, refetch }) => {
    const usersData = data.data;

    const fetchNew = (page) => {
        refetch(page)
    }
    return (
        <>
            <div className='All'>
                <div className="rounded-md pb-2 w-full gap-5"><h2 className="text-lg font-semibold text-black-700 mb-4">All Customers</h2></div>
                <div className="bg-white rounded-md p-6 w-full gap-5">
                    <h2 className="text-lg font-semibold text-black-700">All Customers</h2>
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
                                }
                            ]}
                            exportData
                            hasNumber
                            allData={totalData.map((item) => ({
                                ...item,
                                name: `${item.firstName} ${item.lastName}`,
                                dateJoined: dateFormat(item.createdAt, 'dd-MM-yyyy')
                            }))}
                            data={usersData.map((item) => ({
                                ...item,
                                name: `${item.firstName} ${item.lastName}`,
                                dateJoined: dateFormat(item.createdAt, 'dd-MM-yyyy')
                            }))}
                            actions={[]}
                            currentPage={data.meta.currentPage}
                            totalPages={data.meta.totalPages}
                            onPageChange={(page) => fetchNew(page)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserTable;
