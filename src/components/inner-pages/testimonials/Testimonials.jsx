import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useModal } from "../../../hooks/modal";
import Modal from "../../Modal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddTestimonialModal from "./AddTestimonialModal";

const Testimonials = ({ data, refetch }) => {
  

  const { openModal, closeModal } = useModal();

  const handleCreateModal = () => {
    openModal({
      size: "sm",
      content: (
        <AddTestimonialModal
        refetch={refetch}
          closeModal={closeModal}
        />
      ),
    });
  };

  const handleDeleteModal = (id) => {
    openModal({
      size: "sm",
      content: (
        <Modal
          title={`Do you wish to delete this item?`}
          redirect={refetch}
          api={`/admin/testimonial?id=${id}`}
          method={"DELETE"}
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
            Testimonials
          </h2>
          <button
            onClick={() => {
              handleCreateModal();
              window.history.replaceState({}, "", window.location.pathname);
            }}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 text-center inline-block"
          >
            Add Testimonial
          </button>
        </div>
        <div className="bg-white rounded-md p-6 w-full gap-5">
          <h2 className="text-lg font-semibold text-black-700 mb-4">
            Testimonial list
          </h2>
          <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 divide-y">
            {data.map((item, index) => (
              <div
                key={index}
                className={`pr-4 pl-4 pt-8 pb-8 rounded-lg border relative`}
              >
                <div dangerouslySetInnerHTML={{ __html: item?.message }}></div>
                {/* <p className="text-sm leading-loose">{item.text}</p> */}
                <div className="flex items-center mt-6">
                  <div>
                    <h4 className="text-base font-medium">{item.name}</h4>
                    <p className="text-sm text-orange-500 leading-loose">
                      {item.position}
                    </p>
                  </div>
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-10 h-10 rounded-full ml-20"
                  />
                </div>
                <div className="flex items-center gap-3 absolute right-2 top-2">
                  <FaRegEdit
                    color="blue"
                    size={20}
                    className=" cursor-pointer"
                    onClick={() => {
                      const newUrl = `${location.pathname}?id=${item.id}`;
                      navigate(newUrl, { replace: true });
                      handleCreateModal();
                    }}
                  />
                  <RiDeleteBin5Line
                    color="red"
                    size={20}
                    className=" cursor-pointer"
                    onClick={() => handleDeleteModal(item.id)}
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

export default Testimonials;
