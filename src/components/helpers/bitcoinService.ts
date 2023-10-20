// bitcoinService.ts
import axios, { AxiosError } from "axios";

const API_ENDPOINT = "https://api.coindesk.com/v1/bpi/currentprice.json";

export const fetchBitcoinPrice = async () => {
  try {
    const response = await axios.get(API_ENDPOINT, {
      timeout: 5000, // 5 seconds timeout
    });
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch Bitcoin price:", error);

    let errorMessage = "An unknown error occurred.";

    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        // The request was made and the server responded with a status outside of the 2xx range
        errorMessage = `Server Error: ${axiosError.response.status} - ${axiosError.response.statusText}`;
      } else if (axiosError.request) {
        // The request was made but no response was received
        errorMessage =
          "No response from server. Please check your network connection.";
      } else {
        // Something happened in setting up the request and triggered an error
        errorMessage = axiosError.message;
      }
    }

    return {
      data: null,
      error: errorMessage,
    };
  }
};
