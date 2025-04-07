
function DownloadPDF({ data }) {
  const handleDownload = () => {
    window.open(`api/download/${data.fileName}`);
  };

  return (
    <button onClick={handleDownload}  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow transition">
      {data.filename}
    </button>
  );
}


export default DownloadPDF;