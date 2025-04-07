'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Spin } from "antd";
import Cookies from "js-cookie";
import { createStructuredSelector } from "reselect";
import { getDashboard } from "@/Redux/Selector/dashboard.selector";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { AppDispatch } from "@/Redux/Store/store";
import UploadPDF from "@/Component/UploadComponent/uploader";
import DownloadPDF from "@/Component/UploadComponent/downloader";
import { fetchDeleteList, fetchDocumentList } from "@/Redux/ActionThunk/document.action";
import { imageListSelector, uploadImageListLoading } from "@/Redux/Selector/document.selector";


 function Dashboard({actions, userData, imageList, imageListloading}) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true); 
  const [imageListData, setImageListData] = useState<any>([]); 


  useEffect(()=>{
    actions.fetchDocumentList();
  },[actions])

    useEffect(()=>{
    if (imageList) {
      setImageListData(imageList);      
    }
  }, [imageList])
  
    useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    const accessToken = (session as any)?.accessToken;
    if (accessToken) {
        Cookies.set("token", accessToken)
        setLoading(false);
    } else {
        const token =  Cookies.get("token");
        if (!token) {
            redirect("/login"); // Redirect only if no session and no token
        } 
        setLoading(false);
    }
    }, [session, status]);

  if (loading) {
    return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50"><Spin size="large" /></div>  
  }

  const handleDelete=(filename)=>{
    actions.fetchDeleteList(filename);
  }

  return <>  
  <h2 className="flex items-center justify-center font-bold">Welcome</h2> 
 <div className="grid grid-cols-2 gap-4">
    <div className="col-span-1 row-span-1 md:col-span-1 md:row-span-2 md:text-[0.625rem] lg:text-base">
      <UploadPDF/> 
      </div> 
  <div className="col-span-1 row-span-1  md:col-span-1 md:row-span-2">
  <p>List </p>
<ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
  {!imageListloading && Array.isArray(imageListData) && (imageListData.length > 0) ?( imageListData.map((item, i) => (
   <li key={i} style={{ padding: "5px", gap: "10px", position:'relative' }} >
  <DownloadPDF data={item} />
  <span onClick={() => handleDelete(item.id)} style={{   cursor: "pointer",color: "white", background: "none", border: "none", fontSize: "14px", marginLeft:"-14px", marginTop:"-4px", position:"absolute", backgroundColor:"red",  padding:'0 6px',  borderRadius:"20px" }}  aria-label="Delete" >X </span>
</li>)
  )):( <p style={{ padding: "5px", color: "#888" }}>No data available</p>)}
</ol>
  </div> 
   </div>
  </>;
}

const mapStateToProps=createStructuredSelector({
  userData: getDashboard,
  imageList:imageListSelector,
  imageListloading:uploadImageListLoading
});
const mapDispatchToProps=(dispatch:AppDispatch)=>({
  actions:bindActionCreators({fetchDocumentList, fetchDeleteList}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);