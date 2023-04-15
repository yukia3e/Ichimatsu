import { Dispatch, SetStateAction, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { pinFileToPinata } from "@/domains/api/pinFIleToPinata";
import { ipfsFormSchema } from "@/schemas/ipfsForm";
import type { IPFSFormSchema } from "@/schemas/ipfsForm";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";

export const useIPFS = (): [
  boolean,
  string[],
  UseFormRegister<IPFSFormSchema>,
  UseFormHandleSubmit<IPFSFormSchema>,
  FieldErrors<IPFSFormSchema>,
  () => Promise<void>,
  string[],
  Dispatch<SetStateAction<string[]>>
] => {
  const [slices, setSlices] = useState<string[]>([]);
  const [cids, setCids] = useState<string[]>([]);
  const [isWaiting, setIsWaiting] = useState(false);

  const {
    register: registerIPFS,
    handleSubmit: handleSubmitIPFS,
    formState: { errors: ipfsErrors },
    watch: watchIPFS,
  } = useForm<IPFSFormSchema>({
    resolver: yupResolver(ipfsFormSchema),
  });

  const uploadSlicedImagesToIPFS = async () => {
    setIsWaiting(true);

    const name = watchIPFS("name");
    const cidVersion = watchIPFS("cidVersion");

    try {
      const cids: string[] = [];
      await Promise.all(
        slices.map((slice) => pinFileToPinata(slice, name, cidVersion))
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
    registerIPFS,
    handleSubmitIPFS,
    ipfsErrors,
    uploadSlicedImagesToIPFS,
    slices,
    setSlices,
  ];
};
