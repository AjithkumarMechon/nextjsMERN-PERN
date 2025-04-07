
function DownloadPDF({ fileName }) {

  const handleDownload = () => {
    window.open(`api/download/${fileName}`);
  };

  return (
    <button onClick={handleDownload}  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow transition">
      {fileName}
    </button>
  );
}


export default DownloadPDF;