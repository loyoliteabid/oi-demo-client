import React, { useState } from "react";
import { motion } from "framer-motion";

import useDataFetch from "../hooks/useDataFetch";
import LoadingModal from "./LoadingModal";

interface IFileUploadPage {
  onComplete: () => void;
}

const FileUploadPage: React.FC<IFileUploadPage> = ({ onComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const { fetchData, loading, error } = useDataFetch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null); // Remove the selected file
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Use the fetchData hook to send the file to the server
        await fetchData("/fileupload", {
          method: "POST",
          body: formData,
        });

        onComplete();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const downloadCSV = () => {
    const url = "https://archive.ics.uci.edu/static/public/360/air+quality.zip";
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <LoadingModal
        isOpen={loading}
        text="Please give me a moment; it will be worth the wait."
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex justify-center items-center flex-col h-screen p-4"
    >
      <h1 className="text-2xl font-bold mb-6">Upload a CSV file</h1>

      {!file ? (
        <>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
          />
          <p className="text-gray-600 mb-4">
            If you don't have the file, you can download it below.
          </p>
          <button
            onClick={downloadCSV}
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors duration-200"
          >
            Download air quality data
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-700">You have selected: {file.name}</p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleRemoveFile}
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Remove File
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-blue-500"
              } text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors duration-200`}
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </motion.div>
  );
};

export default FileUploadPage;
