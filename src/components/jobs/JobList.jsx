import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

import { FaClock, FaMapMarkerAlt, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddJobModal from "./AddJobModal";
import { useModal } from "../../hooks/modal";
import Modal from "../Modal";

const JobList = ({ data, refetch }) => {
  const { openModal, closeModal } = useModal();

  const handleCreateModal = () => {
    openModal({
      size: "sm",
      content: <AddJobModal refetch={refetch} closeModal={closeModal} />,
    });
  };

  const handleDeleteModal = (id) => {
    openModal({
      size: "sm",
      content: (
        <Modal
          title={`Do you wish to delete this job?`}
          text="Note: All jobs applications would be deleted alongside"
          redirect={refetch}
          api={`/admin/job/delete?jobId=${id}`}
          method={"DELETE"}
        />
      ),
    });
  };
  const handleDeactivateModal = (id) => {
    openModal({
      size: "sm",
      content: (
        <Modal
          title={`Do you wish to close this job?`}
          redirect={refetch}
          api={`/admin/job/close?jobId=${id}`}
          method={"PATCH"}
        />
      ),
    });
  };

  const handleRepostModal = (id) => {
    openModal({
      size: "sm",
      content: (
        <Modal
          title={`Do you wish to repost this job?`}
          redirect={refetch}
          body={{ jobId: id }}
          api={`/admin/job/repost`}
          method={"POST"}
        />
      ),
    });
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  return (
    <>
      <div className="All">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-black-700 mb-4 mt-4">
            Jobs
          </h2>
          <button
            onClick={() => {
              handleCreateModal();
              window.history.replaceState({}, "", window.location.pathname);
            }}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 text-center inline-block"
          >
            Add Jobs
          </button>
        </div>
        <div className="bg-white rounded-md p-6 w-full gap-5">
          <h2 className="text-lg font-semibold text-black-700 mb-4">
            Job List
          </h2>
          <div className=" grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 divide-y">
            {data?.map((job, index) => (
              <div
                className="border p-7 rounded-lg bg-white relative"
                key={index}
              >
                <h3 className="text-lg font-semibold leading-loose">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 my-2 leading-loose">
                  <FaMapMarkerAlt className="text-orange-500" />
                  <span className="text-orange-500 leading-loose">
                    {job.location}
                  </span>
                  <FaClock className="text-blue-500 ml-4" />
                  <span className="text-blue-500 leading-loose">
                    {job.jobType}
                  </span>
                </div>
                <div>
                  <p
                    className={`capitalize text-white w-fit rounded-md px-2 py-[2px]  ${job.status === "active" ? "bg-green-800" : "bg-red-700"
                      }`}
                  >
                    {job.status}
                  </p>
                </div>

                <div
                  className="text-sm text-gray-700 leading-loose"
                  dangerouslySetInnerHTML={{
                    __html: job?.description.slice(0, 200),
                  }}
                ></div>

                {job.status === "active" ? (
                  <button
                    className="border w-full mt-4 py-4 rounded-lg text-sm hover:bg-gray-100"
                    onClick={() => handleDeactivateModal(job.id)}
                  >
                    {/* <Link to={`/jobs-details/${job.id}`}>View Job Details</Link> */}
                    CLose Job
                  </button>
                ) : (
                  <button
                    className="border w-full mt-4 py-4 rounded-lg text-sm hover:bg-gray-100"
                    onClick={() => handleRepostModal(job.id)}
                  >
                    {/* <Link to={`/jobs-details/${job.id}`}>View Job Details</Link> */}
                    Repost Job
                  </button>
                )}

                <div className="flex w-full">
                  <Link
                    className="border w-full mt-4 py-4 flex justify-center rounded-lg text-sm hover:bg-gray-100"
                    to={`applicants/${job.id}`}
                  >
                    View Job Applicants
                  </Link>
                </div>

                <div className="flex items-center gap-3 absolute right-2 top-2">
                  <FaRegEdit
                    color="blue"
                    size={20}
                    className=" cursor-pointer"
                    onClick={() => {
                      const newUrl = `${location.pathname}?id=${job.id}`;
                      navigate(newUrl, { replace: true });
                      handleCreateModal();
                    }}
                  />
                  <RiDeleteBin5Line
                    color="red"
                    size={20}
                    className=" cursor-pointer"
                    onClick={() => handleDeleteModal(job.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobList;
