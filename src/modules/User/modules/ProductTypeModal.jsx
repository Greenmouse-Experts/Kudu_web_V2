import React from "react";

const ProductTypeModal = ({ openAddNewAuctionProductForm, openAddNewProductForm }) => {
    return(
      <div>
         <h1 className="text-center font-large">
            Product Type
        </h1>
        <div className="flex justify-center mt-4">
            <button
                className="bg-kuduDarkGrey hover:bg-gray-400 text-white text-sm py-2 px-4 rounded mr-2"
                onClick={openAddNewAuctionProductForm}
            >
                Auction
            </button>
            <button className="bg-kuduOrange hover:bg-kuduDarkGrey text-white text-sm py-2 px-4 rounded"
                onClick={openAddNewProductForm}
            >
                Non-Auction
            </button>
        </div>
      </div>
    )
}

export default ProductTypeModal;