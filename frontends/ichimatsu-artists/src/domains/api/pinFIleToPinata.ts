import { ResponsePinFileToPinata } from "@/domains/pinata/types/response";
import axios from "axios";
import { API_PATH_PIN_FILE_TO_PINATA } from "../constants";

export const pinFileToPinata = async (
  dataurl: string,
  name: string | undefined,
  cidVersion: number | undefined
): Promise<string | undefined> => {
  if (process.env.NEXT_PUBLIC_API_ENDPOINT === undefined) {
    throw new Error("NEXT_PUBLIC_API_ENDPOINT is undefined");
  }

  const blob = dataURLtoBlob(dataurl);
  if (!blob) {
    throw new Error("blob is undefined");
  }

  const formData = new FormData();
  formData.append("file", blob);

  if (!name) {
    const metadata = JSON.stringify({
      name,
    });
    formData.append("pinataMetadata", metadata);
  }

  if (!cidVersion) {
    const options = JSON.stringify({
      cidVersion,
    });
    formData.append("pinataOptions", options);
  }

  try {
    const response = await axios.post<ResponsePinFileToPinata>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${API_PATH_PIN_FILE_TO_PINATA}`,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      }
    );

    return response.data.IpfsHash;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const dataURLtoBlob = (dataurl: string) => {
  const arr = dataurl.split(",");
  const tmp = arr[0].match(/:(.*?);/);
  if (!tmp) return;
  const mime = tmp[1];
  const bstr = Buffer.from(arr[1], "base64").toString("binary");
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};
