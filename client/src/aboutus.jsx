import axios from "axios";
import Header from "./Header/header";

export default function AboutUs() {
  const handleDownload =async () => {
    try {
        const response = await axios({
          url: 'http://localhost:3000/generate-pdf',
          method: 'GET',
          responseType: 'blob', // Important for handling binary data
        });
  
        // Create a URL for the PDF Blob
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'example.pdf');
        
        // Append the link to the body and trigger the download
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading PDF', error);
      }
  };

  return (
    <div className="w-screnn h-screen bg-yellow-300">
      <Header />
      <h1>This about us page</h1>
      <button onClick={handleDownload}>download</button>
    </div>
  );
}
