'use client';
import React, { useEffect, useState } from 'react';
import { fetchShowSelect } from '@/Redux/ActionThunk/selectionshow.action';
import { showSelectionLoading, showSelectionSelector } from '@/Redux/Selector/showSelection.selector';
import { AppDispatch } from '@/Redux/Store/store';
import { bindActionCreators } from '@reduxjs/toolkit';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PersonCard from '@/Component/getDetailsComponent/GetDetailsComponent';

const SelectedList=({actions, selectedData, getLoading})=>{
  const [data, setData]=useState({});

  
useEffect(() => {
    const url = window.location.href;
    const mqValue = url?.split("/")?.pop();
    if (mqValue) {
        actions.fetchShowSelect(`${mqValue}`);
    }
}, [actions]);

useEffect(()=>{
  if(selectedData?.data){
  setData(selectedData?.data);
  }
},[selectedData])

if(getLoading){
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
  )
}

const mapStateToProps=createStructuredSelector({
    selectedData:showSelectionSelector,
    getLoading:showSelectionLoading
});

const mapDispatchToProps=(dispatch:AppDispatch)=>({
  actions:bindActionCreators({fetchShowSelect,}, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(SelectedList);