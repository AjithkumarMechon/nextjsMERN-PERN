import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Spin } from "antd";
import Cookies from "js-cookie";
import { createStructuredSelector } from "reselect";
import { getDashboard, getDashboardLoading } from "@/Redux/Selector/dashboard.selector";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { AppDispatch } from "@/Redux/Store/store";
import { fetchDeleteList, fetchDocumentList } from "@/Redux/ActionThunk/document.action";
import { imageListSelector, uploadImageListLoading } from "@/Redux/Selector/document.selector";
import { fetchDashboard } from "@/Redux/ActionThunk/dashboard.action";
import PersonCardList from "@/component/getDetailsComponent/GetDetailListComponent";

function Dashboard({actions, userData, getLoading}) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true); 
  const [userlistData, setUserListData] = useState<any>([]); 

  useEffect(()=>{
    actions.fetchDocumentList();
    actions.fetchDashboard();
  },[actions])


    useEffect(()=>{
    if (userData?.data) {
      setUserListData(userData?.data);      
    }
  }, [userData])
  
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

if (loading && getLoading) {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-white z-50">
      <Spin size="large" />
    </div>
  );
}

  const handleClick=async(valueId:any)=>{    
   redirect(`/showselect/${valueId}`);
  }

  return <>  <main className="min-h-screen bg-white p-6 m-4 mx-auto rounded-xl">
      <header>
        <h2 className="text-3xl font-bold text-center mb-10">Welcome</h2>
      </header>

      <section>
        <h1 className="text-xl font-semibold mb-4">List</h1>
        {Array.isArray(userlistData) && userlistData.length > 0 ? (
          userlistData.map((item, i) => (
            <div key={i} className=" last:border-b-0 py-4 cursor-pointer" onClick={()=>handleClick(item.id)}>
              <PersonCardList
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
      </section>
    </main>
  </>;
}

const mapStateToProps=createStructuredSelector({
  userData: getDashboard,
  imageList:imageListSelector,
  imageListloading:uploadImageListLoading,
  getLoading: getDashboardLoading
});
const mapDispatchToProps=(dispatch:AppDispatch)=>({
  actions:bindActionCreators({fetchDocumentList, fetchDeleteList, fetchDashboard}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);