import React from 'react';

const ProductCard = ({productData}) => {

  const { id ,productname,price,actualprice,discount,favorite, clientcount,rating,productimage } = productData;

  return (
    <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden relative p-4 m-[1rem]">
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
        -{discount}%
      </div>
     <img src={productimage} alt={productname} className="w-full h-40 object-contain" />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{productname}</h3>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-red-500 text-xl font-bold">${price}</span>
          <span className="line-through text-gray-400">${actualprice}</span>
        </div>
        <div className="flex items-center mt-2 text-yellow-500">
          {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
          <span className="text-gray-500 text-sm ml-2">({clientcount})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
