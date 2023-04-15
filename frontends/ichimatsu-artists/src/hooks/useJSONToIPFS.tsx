import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { pinJSONToPinata } from "@/domains/api/pinJSONToPinata";
import type { Metadata, Attribute } from "@/domains/types/mint";
import { ipfsJSONFormSchema } from "@/schemas/ipfsJSONForm";
import type { IPFSJSONFormSchema } from "@/schemas/ipfsJSONForm";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";

export const useJSONToIPFS = (
  cids: string[]
): [
  boolean,
  string,
  FieldErrors<IPFSJSONFormSchema>,
  () => Promise<void>,
  UseFormRegister<IPFSJSONFormSchema>,
  UseFormHandleSubmit<IPFSJSONFormSchema>
] => {
  const {
    register: registerIPFSJSON,
    handleSubmit: handleSubmitJPFSJSON,
    formState: { errors: ipfsJSONErrors },
    watch: watchIPFSJSON,
  } = useForm<IPFSJSONFormSchema>({
    resolver: yupResolver(ipfsJSONFormSchema),
  });

  const [isWaitingJSON, setIsWaitingJSON] = useState(false);
  const [ipfsHash, setIpfsHash] = useState<string>("");

  const uploadJSONsToIPFS = async () => {
    const eventName = watchIPFSJSON("eventName");
    const eventDate = watchIPFSJSON("eventDate");
    const artistName = watchIPFSJSON("artistName");

    setIsWaitingJSON(true);

    const attributes: Attribute[] = [];
    if (eventName)
      attributes.push({ trait_type: "EventName", value: eventName });

    if (eventDate) {
      attributes.push({
        trait_type: "EventDate",
        value: eventDate,
      });
    }
    if (artistName)
      attributes.push({
        trait_type: "ArtistName",
        value: artistName,
      });

    try {
      const metadatas = cids.map((cid, index) => {
        const metadata: Metadata = {
          name: `${eventName} #${index}`,
          description: `${eventName || ""}  ${eventDate || ""} by ${
            artistName || ""
          }`,
          external_link: `ipfs://${cid}`,
        };
        if (attributes.length > 0) metadata.attributes = attributes;

        return metadata;
      });

      const ipfsHash = await pinJSONToPinata(metadatas);
      if (!ipfsHash) {
        throw new Error("ipfsHash is undefined, アップロード失敗");
      }
      if (ipfsHash) setIpfsHash(ipfsHash);
      console.log("アップロード成功:", ipfsHash);
    } catch (error) {
      console.error("アップロードエラー:", error);
    } finally {
      setIsWaitingJSON(false);
    }
  };

  return [
    isWaitingJSON,
    ipfsHash,
    ipfsJSONErrors,
    uploadJSONsToIPFS,
    registerIPFSJSON,
    handleSubmitJPFSJSON,
  ];
};
