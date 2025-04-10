// <>  
//   <h2 className="flex items-center justify-center font-bold pb-[4rem]">Welcome</h2> 
//  <div className="grid grid-cols-2 gap-4">
//     <div className="col-span-1 row-span-1 md:col-span-1 md:row-span-2 md:text-[0.625rem] lg:text-base">
//       <UploadPDF/> 
//       </div> 
//   <div className="col-span-1 row-span-1  md:col-span-1 md:row-span-2">
//   <p>List </p>
// <ol style={{ listStyleType: 'decimal', paddingLeft: '1.25rem' }}>
//   {!imageListloading && Array.isArray(imageListData) && (imageListData.length > 0) ?( imageListData.map((item, i) => (
//    <li key={i} style={{ padding: "0.5rem", gap: "0.625rem", position:'relative' }} >
//   <DownloadPDF data={item} />
//   <span onClick={() => handleDelete(item.id)} style={{   cursor: "pointer",color: "white", background: "none", border: "none", fontSize: "0.925rem", marginLeft:"-0.875rem", marginTop:"-0.25rem", position:"absolute", backgroundColor:"red",  padding:'0 0.375rem',  borderRadius:"1.25rem" }}  aria-label="Delete" >X </span>
// </li>)
//   )):( <p style={{ padding: "5px", color: "#888" }}>No data available</p>)}
// </ol>
//   </div> 
//    </div>
//   </>;