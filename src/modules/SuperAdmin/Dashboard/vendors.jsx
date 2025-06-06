import React from 'react';
import useApiMutation from '../../../api/hooks/useApiMutation';
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from '../../../components/Loader';
import VendorTable from '../../../components/VendorTable';

const App = () => {
  const { mutate } = useApiMutation();

  const [customers, setCustomersData] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const getVendors = (page) => {
    mutate({
      url: `/admin/vendors?page=${page}`,
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



  const getTotalVendors = () => {
    mutate({
      url: `/admin/vendors?page=1&limit=100000000000000`,
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
    getVendors(1);
    getTotalVendors();
  }, []);

  return (
    <div className="min-h-screen">
      {loading ?
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
        :
        <VendorTable data={customers} totalData={totalCustomers} refetch={(page) => getVendors(page)} />
      }
    </div>
  );
};

export default App;
