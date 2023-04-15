import { Dispatch, SetStateAction, useState } from "react";
import { pinImageToPinata } from "@/domains/api/pinImageToPinata";
import type { IPFSImageFormSchema } from "@/schemas/ipfsImageForm";
import { UseFormHandleSubmit, useForm } from "react-hook-form";

export const useImageToIPFS = (): [
  boolean,
  string[],
  UseFormHandleSubmit<IPFSImageFormSchema>,
  () => Promise<void>,
  string[],
  Dispatch<SetStateAction<string[]>>
] => {
  const [slices, setSlices] = useState<string[]>([]);
  const [cids, setCids] = useState<string[]>([]);
  const [isWaiting, setIsWaiting] = useState(false);

  const { handleSubmit: handleSubmitIPFS } = useForm<IPFSImageFormSchema>({});

  const uploadSlicedImagesToIPFS = async () => {
    setIsWaiting(true);

    try {
      const cids: string[] = [];
      await Promise.all(
        slices.map((slice, index) => pinImageToPinata(slice, index))
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
    } finally {
      setIsWaiting(false);
    }
  };

  return [
    isWaiting,
    cids,
    handleSubmitIPFS,
    uploadSlicedImagesToIPFS,
    slices,
    setSlices,
  ];
};
