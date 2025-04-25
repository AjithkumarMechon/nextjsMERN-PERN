"use client";
import ProductCard from '@/Component/productCard/ProductCard';
import { HTTP } from '@/utils/http'
import React, { useEffect, useState } from 'react'

function ContentListScreen() {
const [data, setdata] = useState([])

  useEffect(()=>{
    try {
      const fetchData=async()=>{
        const response =await HTTP.doGet("api/productsList");
        setdata(response.data.data);
      }
      fetchData();      
    } catch (error) {
      
    }
  },[]);
  return (
    <div>
      {Array.isArray(data) && data.map((item:any,i:number)=>{
         const updatedItem = {...item, productimage: `data:image/jpeg;base64,${item.productimage.filedata}` };      
        return <div key={i}>
       <ProductCard   productData={updatedItem} />
        </div>
})}
    </div>
  )
}

export default ContentListScreen;
