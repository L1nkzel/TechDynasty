import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Helper function to get error display message
export const errorDisplayMessage = (
    error: FetchBaseQueryError | SerializedError) => {
    if ("status" in error) {
      if (error.status === "FETCH_ERROR") {
        return error.error || "An unknown fetch error occurred.";
      }
      return "An unexpected error occurred.";
    }
    return "An unknown error occurred.";
  };

