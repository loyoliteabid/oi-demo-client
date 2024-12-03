/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any; // For POST, PUT, PATCH
}

// TODO: Store this URL in an environment variable or config file for better flexibility and security.
export const baseUrl = "http://localhost:5000";

const useDataFetch = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (url: string, options: FetchOptions = { method: "GET" }) => {
      setLoading(true);
      setError(null);

      const config: AxiosRequestConfig = {
        url: baseUrl + "/api" + url,
        method: options.method || "GET",
        headers: options.headers || {},
        data: options.body || null,
      };

      try {
        const response = await axios(config);
        setData(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, error, loading, fetchData, clearError: setError };
};

export default useDataFetch;
