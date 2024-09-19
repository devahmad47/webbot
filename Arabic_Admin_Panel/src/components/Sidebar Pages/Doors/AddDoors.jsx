import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";
import { Loader } from "../../Loader/loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const serverUrl = process.env.REACT_APP_Server_Url;

const AddUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState(""); 
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(""); 
  const [numbers, setNumbers] = useState(""); 
  const [status, setStatus] = useState(""); // For user status

  // Function to check WhatsApp status
  const checkWhatsAppStatus = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/whatsapp/status`);
      const { data } = response;
console.log("sdsdss",response.data);
      switch (data.state) {
        case "connected":
          setStatus("Client is Ready!");
          break;
        case "disconnected":
          setStatus("Disconnected");
          break;
        case "auth_failure":
          setStatus("Authentication Failed");
          break;
        case "authenticated":
          setStatus("Authenticated");
          break;
        case "ready":
          setStatus("Ready");
          break;
        default:
          setStatus("Unknown");
      }
    } catch (error) {
      console.error("Error checking WhatsApp status:", error);
      setStatus("Error checking status");
    }
  };

  // Call the status check when the component mounts
  useEffect(() => {
    checkWhatsAppStatus();

    // Optionally, set an interval to check status every 30 seconds

  }, []);

  // Handle CSV file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    Papa.parse(selectedFile, {
      complete: (result) => {
        if (result.data.length > 0) {
          const [header, ...rows] = result.data;
          const parsedNumbers = rows.map(row => row[0]).filter(num => num);
          setCsvData(parsedNumbers.join("\n")); 
          setFile(selectedFile);
          setNumbers(parsedNumbers.join(","));
        }
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  // Format phone number for WhatsApp
  const formatPhoneNumber = (number) => {
    let formattedPhoneNumber = number.replace(/\D/g, "");
    if (!formattedPhoneNumber.startsWith("92")) {
      formattedPhoneNumber = `92${formattedPhoneNumber.startsWith("0") ? formattedPhoneNumber.substring(1) : formattedPhoneNumber}`;
    }
    return `${formattedPhoneNumber}@c.us`;
  };

  // Function to send messages with a delay
  const sendMessagesWithDelay = async (numbersArray) => {
    for (const number of numbersArray) {
      try {
        const formattedNumber = formatPhoneNumber(number);
        await axios.post(`${serverUrl}/api/whatsapp/send-message`, {
          numbers: [formattedNumber],
          message
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success(`Message sent to ${number}`);
      } catch (error) {
        console.error(`Error sending message to ${number}:`, error);
        toast.error(`Failed to send message to ${number}`);
      }
      // Wait for 8 seconds before sending the next message
      await new Promise(resolve => setTimeout(resolve, 8000));
    }
  };

  // Handle form submission for sending messages
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!file && !numbers) { 
      toast.info("Please upload a CSV file or enter phone numbers.");
      return;
    }
    setLoading(true);
    try {
      let numbersArray = [];
      if (file) {
        numbersArray = csvData
          .split(/\s*,\s*/)  
          .map(num => num.trim())  
          .filter(num => num);     
      }

      if (numbers) {
        const manualNumbersArray = numbers.split(",").map(num => num.trim()).filter(num => num);
        numbersArray = [...numbersArray, ...manualNumbersArray];
      }

      if (numbersArray.length === 0) {
        toast.info("No valid phone numbers found.");
        setLoading(false);
        return;
      }

      await sendMessagesWithDelay(numbersArray);
      setLoading(false);
      toast.success("All messages have been sent.");
      resetFormFields();
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Function to reset form fields
  const resetFormFields = () => {
    setCsvData(""); 
    setFile(null); 
    setMessage(""); 
    setNumbers(""); 
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl mt-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Send WhatsApp Message
            </h2>

            {/* Status Display */}
            <div className="my-4">
              <label className="block text-md font-medium leading-6 text-gray-900">
                WhatsApp Status: <span className={`font-bold ${status === "Connected" ? "text-green-500" : "text-red-500"}`}>{status}</span>
              </label>
            </div>

            {/* CSV File Upload */}
            <div className="my-4">
              <label htmlFor="file" className="block text-md font-medium leading-6 text-gray-900">
                Upload CSV File <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  accept=".csv, text/csv"
                  onChange={handleFileChange}
                  className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />
              </div>
            </div>

            {/* Manually Enter Phone Numbers */}
            <div className="my-4">
              <label htmlFor="manualNumbers" className="block text-md font-medium leading-6 text-gray-900">
                Manually Enter Phone Numbers (comma-separated)
              </label>
              <textarea
                id="numbers"
                name="numbers"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                placeholder="Enter phone numbers separated by commas, e.g., 1234567890, 0987654321"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                rows={4}
              />
            </div>

            {/* Preview CSV Data */}
            <div className="my-4">
              <label htmlFor="csvData" className="block text-md font-medium leading-6 text-gray-900">
                CSV Data (Preview)
              </label>
              <textarea
                id="csvData"
                readOnly
                value={csvData}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                rows={5}
              />
            </div>

            {/* Message Field */}
            <div className="my-4">
              <label htmlFor="message" className="block text-md font-medium leading-6 text-gray-900">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                rows={5}
              />
            </div>

            {/* Submit Button */}
            <div className="my-4">
              <button
                type="submit"
                className="mt-2 w-full inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
                disabled={loading}
              >
                {loading ? <Loader /> : "Send Messages"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddUser;
