import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LoadingModal from "../components/LoadingModal";
import useDataFetch, { baseUrl } from "../hooks/useDataFetch";
import FileUploadPage from "../components/FileUpload";
import AppRoutes from "./routes";

const Home = () => {
  const [isDataExisting, setIsDataExisting] = useState<boolean | null>(null);
  const [showHomePage, setShowHomePage] = useState(false);

  const {
    data: dataInfo,
    loading,
    error,
    fetchData,
    clearError,
  } = useDataFetch<{ hasData: boolean }>();

  const hasData = dataInfo?.hasData ?? false;

  useEffect(() => {
    // Useful for checking if server is accessible
    if (error) {
      alert(`Please make sure ${baseUrl} is accessible !`);
      toast.error(error, {
        onClose: () => {
          clearError("");
        },
      });
    }
  }, [error, clearError]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchData("/check-if-data");
      } catch (err) {
        console.error(err);
      }
    };

    // Show the loading indicator for at least 2 seconds
    const timer = setTimeout(() => setShowHomePage(true), 2000);

    loadData();

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [fetchData]);

  useEffect(() => {
    // Update the state once `hasData` is determined
    setIsDataExisting(hasData);
  }, [hasData]);

  if (!showHomePage || loading) {
    return <LoadingModal isOpen={true} />;
  }

  return (
    <>
      {isDataExisting ? (
        <AppRoutes />
      ) : (
        <FileUploadPage onComplete={() => setIsDataExisting(true)} />
      )}
    </>
  );
};

export default Home;
