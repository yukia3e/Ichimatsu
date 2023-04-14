import { Dispatch, SetStateAction, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import * as yup from "yup";

const urlPinFileToPinata = "https://api.pinata.cloud/pinning/pinFileToIPFS";

interface ipfsFormValues {
  name: string;
  cidVersion: number;
}

interface responsePinFileToPinata {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

const ipfsSchema = yup.object().shape({
  name: yup.string(),
  cidVersion: yup
    .number()
    .typeError("CIDVersion must be a number")
    .integer("CIDVersion must be an integer"),
});

export const useIPFS = (): [
  string[],
  UseFormRegister<ipfsFormValues>,
  UseFormHandleSubmit<ipfsFormValues>,
  FieldErrors<ipfsFormValues>,
  () => Promise<void>,
  string[],
  Dispatch<SetStateAction<string[]>>
] => {
  const [slices, setSlices] = useState<string[]>([]);
  const [cids, setCids] = useState<string[]>([]);

  const {
    register: registerIPFS,
    handleSubmit: handleSubmitIPFS,
    formState: { errors: ipfsErrors },
    watch: watchIPFS,
  } = useForm<ipfsFormValues>({ resolver: yupResolver(ipfsSchema) });

  const uploadSlicedImagesToIPFS = async () => {
    const name = watchIPFS("name");
    const cidVersion = watchIPFS("cidVersion");

    try {
      const cids: string[] = [];
      await Promise.all(
        slices.map((slice) => uploadToIPFS(slice, name, cidVersion))
      )
        .then((tmpCIDs) => {
          tmpCIDs.map((cid) => {
            if (!cid) throw "cid is undefined";
            console.log("cid: ", cid);
            cids.push(cid);
          });
        })
        .catch((error) => {
          throw error;
        });
      setCids(cids);
      console.log("アップロード成功:", cids);
    } catch (error) {
      console.error("アップロードエラー:", error);
    }
  };

  const uploadToIPFS = async (
    dataurl: string,
    name: string | undefined,
    cidVersion: number | undefined
  ) => {
    const blob = dataURLtoBlob(dataurl);
    if (!blob) return;
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
      const response = await axios.post<responsePinFileToPinata>(
        urlPinFileToPinata,
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${
              process.env.NEXT_PUBLIC_PINATA_SECRET_JSON || ""
            }`,
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
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  };

  return [
    cids,
    registerIPFS,
    handleSubmitIPFS,
    ipfsErrors,
    uploadSlicedImagesToIPFS,
    slices,
    setSlices,
  ];
};
