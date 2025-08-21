import React from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(product?.link || `/product/${product?.id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] h-[22rem] mx-3"
    >
      <div className="h-[13rem] w-[10rem] relative">
        {product?.discount && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        )}
        <img
          className="object-cover object-center w-full h-full"
          src={product?.image || product?.imageUrl}
          alt={product?.name}
        />
      </div>

      <div className="p-4 flex flex-col items-start">
        <h3 className="text-lg font-medium text-gray-900">
          {product?.brand}
        </h3>
        <p className="mt-2 text-sm text-gray-500">{product?.name}</p>
        
        {product?.rating && (
          <div className="flex items-center mt-2">
            <Rating name="read-only" value={product.rating} readOnly size="small" />
            <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        )}

        <div className="flex items-center mt-2 space-x-2">
          <p className="font-bold text-lg text-gray-900">${product?.price}</p>
          <p className="text-sm line-through text-gray-500">${product?.originalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;