import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useModal } from "../../../hooks/modal";
import Modal from "../../Modal";
import AddFaqCategoryModal from "./AddFaqCategoryModal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const FaqCategories = ({ data, refetch }) => {
  const [selectedItem, setselectedItem] = useState(null);

  const { openModal } = useModal();

  const handleRedirect = () => {
    refetch();
  };

  const handleCreateModal = (item) => {
    openModal({
      size: "sm",
      content: (
        <AddFaqCategoryModal
          selectedItem={item}
          data={data}
          redirect={refetch}
        />
      ),
    });
  };

  const handleDeleteModal = (id) => {
    openModal({
      size: "sm",
      content: (
        <Modal
          title={`Do you wish to delete this category?`}
          redirect={refetch}
          api={`/admin/faq/category?id=${id}`}
          method={"DELETE"}
        />
      ),
    });
  };

  return (
    <>
      <div className="All">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-black-700 mb-4 mt-4">
            Faq categories
          </h2>
          <button
            onClick={() => handleCreateModal(null)}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 text-center inline-block"
          >
            Add New Category
          </button>
        </div>
        <div className="bg-white rounded-md p-6 w-full gap-5">
          <h2 className="text-lg font-semibold text-black-700 mb-4">
            My categories
          </h2>
          <div className=" mt-5 flex flex-col gap-3">
            {data.map((item) => (
              <div
                className="flex items-center py-3 px-2 justify-between"
                key={item.id}
              >
                <p className="text-lg font-medium">{item.name}</p>
                <div className="flex items-center gap-5">
                  <FaRegEdit
                    color="blue"
                    size={20}
                    className=" cursor-pointer"
                    onClick={() => {
                      handleCreateModal(item);
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

export default FaqCategories;
