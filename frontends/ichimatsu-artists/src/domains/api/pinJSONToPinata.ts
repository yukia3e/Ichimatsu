import { API_PATH_PIN_JSON_TO_PINATA } from "@/domains/constants";
import { ResponsePinJSONToPinata } from "@/domains/pinata/types/response";
import type { Metadata } from "@/domains/types/mint";
import axios from "axios";

export const pinJSONToPinata = async (
  metadatas: Metadata[]
): Promise<string> => {
  if (process.env.NEXT_PUBLIC_API_ENDPOINT === undefined) {
    throw new Error("NEXT_PUBLIC_API_ENDPOINT is undefined");
  }

  const formData = new FormData();
  console.log(metadatas);

  metadatas.forEach((metadata, index) => {
    const file = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });
    formData.append(`file${index}`, file);
  });

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const response = await axios.post<ResponsePinJSONToPinata>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${API_PATH_PIN_JSON_TO_PINATA}`,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data;`,
        },
      }
    );
    console.log(response.data);

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Failed to pin JSON to IPFS:", error);
    throw error;
  }
};
