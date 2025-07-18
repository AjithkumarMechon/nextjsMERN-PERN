"use client";
import React from "react";
import { Spin } from "antd";
import PersonCard from "@/Component/getDetailsComponent/GetDetailsComponent";
import { usefetchSelectedProduct } from "@/tanstack/fetchProduct";

const SelectedList = () => {
  const { data, isLoading, error } = usefetchSelectedProduct(
    window.location.href?.split("/")?.pop() ?? ""
  );

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-white z-50">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item, i) => (
          <div key={i} className=" last:border-b-0 py-4 cursor-pointer">
            <PersonCard
              email={item.email || "N/A"}
              name={item.name || "N/A"}
              gender={item.gender || "N/A"}
              dob={item.dob || "N/A"}
              work={item.work || "N/A"}
              education={item.education || "N/A"}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500 p-2">No data available</p>
      )}
    </div>
  );
};

export default SelectedList;
