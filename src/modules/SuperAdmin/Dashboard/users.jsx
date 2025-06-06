import React from 'react';
import UserTable from "../../../components/UserTable";
import useApiMutation from '../../../api/hooks/useApiMutation';
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from '../../../components/Loader';

const App = () => {
  const { mutate } = useApiMutation();

  const [customers, setCustomersData] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const getCustomers = (page) => {
    mutate({
      url: `/admin/customers?page=${page}`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setCustomersData(response.data);
        setIsLoading(false);
      },
      onError: () => {
      }
    });
  }


  const getAllCustomers = () => {
    mutate({
      url: `/admin/customers?page=1&limit=100000000000000`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setTotalCustomers(response.data.data);
      },
      onError: () => {
      }
    });
  }


  useEffect(() => {
    getCustomers(1);
    getAllCustomers();
  }, []);

  return (
    <div className="min-h-screen">
      {loading ?
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
        :
        <UserTable data={customers} totalData={totalCustomers} refetch={(page) => getCustomers(page)} />
      }
    </div>
  );
};

export default App;
