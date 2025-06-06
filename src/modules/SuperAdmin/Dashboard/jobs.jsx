import React from "react";
import Loader from "../../../components/Loader";
import JobList from "../../../components/jobs/JobList";
import { useGetAdminJobs } from "../../../api/jobs";

const App = () => {

  const { data:jobs, isLoading, refetch } = useGetAdminJobs();

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <JobList data={jobs} refetch={() => refetch()} />
      )}
    </div>
  );
};

export default App;
