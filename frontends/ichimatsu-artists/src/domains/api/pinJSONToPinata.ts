import { ResponsePinJSONToPinata } from "@/domains/pinata/types/response";
import type { Metadata } from "@/domains/types/mint";
import axios from "axios";
import { API_PATH_PIN_JSON_TO_PINATA } from "../constants";

export const pinJSONToPinata = async (
  jsonData: Metadata
): Promise<string | undefined> => {
  if (process.env.NEXT_PUBLIC_API_ENDPOINT === undefined) {
    throw new Error("NEXT_PUBLIC_API_ENDPOINT is undefined");
  }

  try {
    const response = await axios.post<ResponsePinJSONToPinata>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${API_PATH_PIN_JSON_TO_PINATA}`,
      jsonData
    );
    console.log(response.data);

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Failed to pin JSON to IPFS:", error);
    throw error;
  }
};
