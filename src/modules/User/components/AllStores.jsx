import React from 'react';
import Table from '../../../components/Tables';
import { dateFormat } from '../../../helpers/dateHelper';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../hooks/modal';
import DeleteModal from '../../../components/DeleteModal';
import { Button } from '@material-tailwind/react';

const AllStore = ({ data, paginate, refetch }) => {

    const navigate = useNavigate();

    const { openModal } = useModal();

    const fetchNew = (page) => {
        refetch(page)
    }


    const handleEditStore = (id) => {
        navigate(`edit/${id}`)
    }


    const handleDeleteModal = (id) => {
        openModal({
            size: "sm",
            content: <DeleteModal title={'Do you wish to delete this store?'} redirect={refetch}
                api={`/vendor/store?storeId=${id}`} />
        })
    }



    return (
        <>
            <div className='All'>
                <div className="bg-white rounded-md p-6 w-full gap-5">
                    <div className="overflow-x-auto">
                        <Table
                            headers={[
                                { key: 'name', label: 'Store Name' },
                                {
                                    key: 'totalProducts', label: 'No. Product'
                                },
                                { key: 'createdAt', label: 'Date Created' },
                            ]}
                            data={data}
                            transformData={(data) =>
                                data.map((item) => ({
                                    ...item,
                                    createdAt: `${dateFormat(item.createdAt, "dd-MM-YYY")}`,
                                }))
                            }
                            actions={[
                                {
                                    label: (row) => {
                                        return `View/Edit`;
                                    },
                                    onClick: (row) => handleEditStore(row.id),
                                },
                                {
                                    label: () => {
                                        return 'Delete';
                                    },
                                    onClick: (row) => handleDeleteModal(row.id)
                                }
                            ]}
                            currentPage={paginate.page}
                            totalPages={paginate.pages}
                            onPageChange={(page) => fetchNew(page)}
                        />
                    </div>
                    <div className="text-center text-black-100 mt-6 leading-loose text-sm">
                        <Button className='md:w-1/4 w-full bg-kuduOrange p-3' onClick={() => navigate('create')}>
                            Add New Store
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllStore;
