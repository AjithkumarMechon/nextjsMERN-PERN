"use client";

import { Spin } from 'antd';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
interface initialFormDataProps{
    productImage: any; discount: any; favorite: string; productName: string; price: any; actualPrice: any; clientCount: string|null; rating: string|null; 
}

const AddProduct: React.FC = () => {
  const {data:session, status}=useSession();
  const [pending, setPending] = useState(false);
  const initialFormData:initialFormDataProps={
    productImage: '',
    discount: null,
    favorite:'',
    productName:'',
    price: null,  
    actualPrice: null,
    rating: null,
    clientCount: null,
  }
  const [formData, setFormData] = useState<initialFormDataProps>(initialFormData);
//     useEffect(()=>{
//     if (status === "authenticated" && session?.user) {
//       setFormData({...formData, username:session?.user?.name??'', email:session?.user?.email??''})
//     }
//   },[session, status]);

  const fetchData = async (value: initialFormDataProps)=>{
   setPending(true); // assuming you're setting loading state

try {
  const response = await axios.post("api/addproducts", value, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(response,"resjhg")
  if (response?.data?.status === 201) {
    toast.success("Registered successfully!");
    setFormData(initialFormData);
    // router.replace("/dashboard"); 
  }
} catch (error: any) {
  if (error.response) {
    toast.error(`${error.response.data.message || "Something went wrong!"}`);
    if (error.response.status === 409) {
      toast.error("User already exists");
    }
  } else if (error.request) {
    toast.error("No response from server. Please try again.");
  } else {
    toast.error(`${error.message}`);
  }
} finally {
  setPending(false);
}    
}
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    console.log("formData", formData);
    setPending(false);
    await fetchData(formData);
  };

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  const nullFields = ['education', 'mobile', 'work', 'email', 'dob'];
  const numberFields = ['height', 'weight', 'salary'];
  let newValue: any = value;
  if (nullFields.includes(name) && value.trim() === '') {
    newValue = null;
  } else if (name === 'dob') {
    newValue = value ? new Date(value) : null;
  } else if (numberFields.includes(name)) {
    newValue = value.trim() === '' ? null : Number(value);
  }

  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};
    if (status === "loading") {
        return (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-white z-50">
            <Spin size="large" />
          </div>
        );
    }

const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Remove metadata (e.g., "data:application/pdf;base64,")
            const base64Data = (reader as any)?.result?.split(",")[1];
            resolve(base64Data);
        };
        reader.onerror = (error) => reject(error);
    });
};
const handleUpload = async (file) => {
  if (!file) return;    
     const base64Data=await convertFileToBase64(file);
     const formFile={
        filename:(file as any)?.name,
        filetype:(file as any)?.type,
        filedata:base64Data
      };
    setFormData((prev) => ({...prev, productImage: formFile }));
      
};
  return (<>
    {/* <button className="flex w-16 p-2 m-4 rounded-lg text-blue-300 border border-blue-400 justify-start items-start transition duration-300 hover:text-white hover:bg-blue-500"><a href="/login">Login</a></button> */}
    <div className='flex justify-center items-center text-center'>
      <form method="POST" action="/login" onSubmit={handleSubmit} >
      <h2 className='text-[24px] my-4'>Register Form</h2>

<div className="flex flex-col gap-2">
  {/** Product Image */}
  <div className="flex items-center gap-4">
    <label htmlFor="productImage" className="w-40 text-left whitespace-nowrap">Product Image:</label>
    <div className="flex flex-row md:flex-row items-center justify-center  border-[0.05rem] border-gray-500 max-w-[100rem] w-full mx-auto p-[0.275rem] rounded">
   <div className="">
    <input
      type="file"
      accept="application/pdf"
      onChange={(e: any) => handleUpload(e.target.files[0])}
        className=" border border-gray-300 rounded px-[0.325rem] py-[0.425rem] md:text-[0.475rem] lg:text-[0.675rem]"
    />   
  </div>
</div>
  </div>

  {/** Discount */}
  <div className="flex items-center gap-4">
    <label htmlFor="discount" className="w-40 text-left whitespace-nowrap">Discount:</label>
    <input
      id="discount"
      name="discount"
      type="text"
      value={formData.discount ?? ''}
      onChange={handleChange}
      placeholder="Discount"
      className="border p-2 rounded w-full"
    />
  </div>

  {/** Favorite */}
  <div className="flex items-center gap-4">
    <label htmlFor="favorite" className="w-40 text-left whitespace-nowrap">Favorite:</label>
    <input
      id="favorite"
      name="favorite"
      type="text"
      value={formData.favorite ?? ''}
      onChange={handleChange}
      placeholder="Favorite"
      className="border p-2 rounded w-full"
    />
  </div>

  {/** Product Name */}
  <div className="flex items-center gap-4">
    <label htmlFor="productName" className="w-40 text-left whitespace-nowrap">Product Name:</label>
    <input
      id="productName"
      name="productName"
      type="text"
      value={formData.productName ?? ''}
      onChange={handleChange}
      placeholder="Product Name"
      className="border p-2 rounded w-full"
    />
  </div>

  {/** Price */}
  <div className="flex items-center gap-4">
    <label htmlFor="price" className="w-40 text-left whitespace-nowrap">Price:</label>
    <input
      id="price"
      name="price"
      type="text"
      value={formData.price ?? ''}
      onChange={handleChange}
      placeholder="Price"
      className="border p-2 rounded w-full"
    />
  </div>

  {/** Actual Price */}
  <div className="flex items-center gap-4">
    <label htmlFor="actualPrice" className="w-40 text-left whitespace-nowrap">Actual Price:</label>
    <input
      id="actualPrice"
      name="actualPrice"
      type="text"
      value={formData.actualPrice ?? ''}
      onChange={handleChange}
      placeholder="Actual Price"
      className="border p-2 rounded w-full"
    />
  </div>

  {/** Client Count */}
  <div className="flex items-center gap-4">
    <label htmlFor="clientCount" className="w-40 text-left whitespace-nowrap">Client Count:</label>
    <input
      id="clientCount"
      name="clientCount"
      type="text"
      value={formData.clientCount ?? ''}
      onChange={handleChange}
      placeholder="Client Count"
      className="border p-2 rounded w-full"
    />
  </div>

  {/** Rating */}
  <div className="flex items-center gap-4">
    <label htmlFor="rating" className="w-40 text-left whitespace-nowrap">Rating:</label>
    <input
      id="rating"
      name="rating"
      type="text"
      value={formData.rating ?? ''}
      onChange={handleChange}
      placeholder="Rating"
      className="border p-2 rounded w-full"
    />
  </div>

  <div className="flex justify-center pt-2">
    <button
      type="submit"
      disabled={pending}
      className={`p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
        pending ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {pending ? 'Submitting...' : 'Register'}
    </button>
  </div>
</div>
      </form>
    </div></>
  );
};


export default AddProduct;