'use client';
import { uploadDocument } from '@/Redux/ActionThunk/document.action';
import { uploadedSelector } from '@/Redux/Selector/document.selector';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

function UploadPDF({actions, uploadPDF }) {
  const [file, setFile] = useState(null);
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
const handleUpload = async () => {
  if (!file) return;    
     const base64Data=await convertFileToBase64(file);
     const formData={
        filename:(file as any)?.name,
        filetype:(file as any)?.type,
        filedata:base64Data
      };
      actions.uploadDocument(formData) 
};

  return (
<div className="p-6 border-2 border-blue-500 max-w-xl w-full mx-auto">
  <h2 className="mb-4 text-2xl font-semibold text-blue-600">Upload PDF</h2>  
  <div className="flex flex-col md:flex-row gap-4">
    <input
      type="file"
      accept="application/pdf"
      onChange={(e: any) => setFile(e.target.files[0])}
        className="flex-1 border border-gray-300 rounded px-3 py-2"
    />
    <button
      onClick={handleUpload}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition "
    >
      Upload
    </button>
  </div>
</div>

  );
}


const mapStateToProps=createStructuredSelector({
  uploadPDF:uploadedSelector
})
const mapDispatchToProps=(dispatch)=>({
  actions:bindActionCreators({uploadDocument}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadPDF);