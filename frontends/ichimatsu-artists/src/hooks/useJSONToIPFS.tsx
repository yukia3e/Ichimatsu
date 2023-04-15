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
  const [baseURI, setBaseURI] = useState<string>("");

  const uploadJSONsToIPFS = async () => {
    const eventName = watchIPFSJSON("eventName");
    const eventDate = watchIPFSJSON("eventDate");
    const artistName = watchIPFSJSON("artistName");

    setIsWaitingJSON(true);

    const attributes: Attribute[] = [];
    if (eventName)
      attributes.push({ trait_type: "EventName", value: eventName });
    if (eventDate)
      attributes.push({
        trait_type: "EventDate",
        value: eventDate.toDateString(),
      });
    if (artistName)
      attributes.push({
        trait_type: "ArtistName",
        value: artistName,
      });
    try {
      const jsonHashes: string[] = [];

      await Promise.all(
        cids.map((cid, index) => {
          const metadata: Metadata = {
            name: `${eventName} #${index}`,
            description: `${eventName || ""}  ${
              eventDate?.toDateString() || ""
            } by ${artistName || ""}`,
            external_link: `ipfs://${cid}/${index}`,
          };
          if (attributes.length > 0) metadata.attributes = attributes;

          return pinJSONToPinata(metadata);
        })
      )
        .then((tmpJSONHashes) => {
          tmpJSONHashes.map((jsonHash) => {
            if (!jsonHash) throw "jsonHash is undefined";
            console.log("jsonHash: ", jsonHash);
            jsonHashes.push(jsonHash);
          });
        })
        .catch((error) => {
          throw error;
        });
      console.log("アップロード成功:", jsonHashes);
    } catch (error) {
      console.error("アップロードエラー:", error);
    } finally {
      setBaseURI("ipfs://"); // TODO: 正しい情報が設定できるように修正する
      setIsWaitingJSON(false);
    }
  };

  return [
    isWaitingJSON,
    baseURI,
    ipfsJSONErrors,
    uploadJSONsToIPFS,
    registerIPFSJSON,
    handleSubmitJPFSJSON,
  ];
};
