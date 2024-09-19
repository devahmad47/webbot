import React, { useState, useEffect } from 'react';
import axios from 'axios';
const serverUrl = process.env.REACT_APP_Server_Url;

const QrCodeDisplay = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);  // Store the QR code URL
  const [isClientReady, setIsClientReady] = useState(false);  // To handle ready state
  const [loading, setLoading] = useState(true);  // Loading state

  // Function to parse HTML and extract the image URL
  const extractQrCodeUrlFromHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    
    const imgElement = doc.querySelector('img');  // Look for the <img> tag
    if (imgElement) {
      return imgElement.getAttribute('src');  // Return the src attribute (image URL)
    }
    return null;
  };

  // Function to fetch the QR code from the backend
  const fetchQrCode = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(`${serverUrl}/api/whatsapp/qr`, { responseType: 'text' }); // Make API call
      const data = response.data;

      // Check for client ready message
      if (data.includes("Client is already connected!")) {
        setIsClientReady(true);
      } else {
        const qrCodeUrl = extractQrCodeUrlFromHTML(data);  // Extract the QR code image URL
        if (qrCodeUrl) {
          setQrCodeUrl(qrCodeUrl);  // Set the QR code image URL
          setIsClientReady(false);
        } else {
          setQrCodeUrl(null);  // Handle case where no QR code is found
        }
      }
    } catch (error) {
      console.error("Error fetching QR code:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the QR code on component mount
  useEffect(() => {
    fetchQrCode();
  }, []);  // Only run once on mount

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/whatsapp/logout`); // Call logout API
      window.location.href = '/admin/starter'; // Redirect to the starter page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <p>Loading QR code...</p>
      ) : isClientReady ? (
        <>
          <h1 className="text-green-600 text-xl">Client is already connected!</h1>
          <button
            onClick={handleLogout}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-500"
          >
            Logout
          </button>
        </>
      ) : qrCodeUrl ? (
        <div className="text-center">
          <h1 className="text-2xl mb-4 font-semibold">Scan the QR Code to Connect to WhatsApp</h1>
          {/* Render the QR code as an image */}
          <img
            src={qrCodeUrl} // Render the extracted QR code image URL
            alt="QR Code"
            className="p-4 border border-gray-300 bg-white inline-block rounded-md shadow-md"
          />
          <button
            onClick={fetchQrCode}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Refresh QR Code
          </button>
        </div>
      ) : (
        <h1 className="text-red-600 text-xl">QR Code not generated yet. Please wait...</h1>
      )}
    </div>
  );
};

export default QrCodeDisplay;
