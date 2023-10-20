"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBitcoinPrice = void 0;
// bitcoinService.ts
const axios_1 = __importDefault(require("axios"));
const API_ENDPOINT = "https://api.coindesk.com/v1/bpi/currentprice.json";
const fetchBitcoinPrice = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(API_ENDPOINT, {
            timeout: 5000, // 5 seconds timeout
        });
        return {
            data: response.data,
            error: null,
        };
    }
    catch (error) {
        console.error("Failed to fetch Bitcoin price:", error);
        let errorMessage = "An unknown error occurred.";
        if (axios_1.default.isAxiosError(error)) {
            const axiosError = error;
            if (axiosError.response) {
                // The request was made and the server responded with a status outside of the 2xx range
                errorMessage = `Server Error: ${axiosError.response.status} - ${axiosError.response.statusText}`;
            }
            else if (axiosError.request) {
                // The request was made but no response was received
                errorMessage =
                    "No response from server. Please check your network connection.";
            }
            else {
                // Something happened in setting up the request and triggered an error
                errorMessage = axiosError.message;
            }
        }
        return {
            data: null,
            error: errorMessage,
        };
    }
});
exports.fetchBitcoinPrice = fetchBitcoinPrice;
