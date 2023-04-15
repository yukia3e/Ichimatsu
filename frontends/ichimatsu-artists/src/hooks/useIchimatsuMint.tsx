import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import router from "next/router";
import mintNFTs from "@/domains/api/mint";
import { mintFormSchema } from "@/schemas/mintForm";
import type { MintFormSchema } from "@/schemas/mintForm";
import useSafeAuthStore from "@/stores/useSafeAuthStore";
import { UseFormHandleSubmit, useForm } from "react-hook-form";

export const useIchimatsuMint = (
  ipfsHash: string,
  nftContractAddress: string | null,
  cols: number | null,
  rows: number | null
): [
  UseFormHandleSubmit<MintFormSchema>,
  () => Promise<void>,
  boolean,
  string
] => {
  const safeAuthSignInData = useSafeAuthStore(
    (state) => state.safeAuthSignInData
  );
  const [isWaitingMint, setIsWaitingMint] = useState(false);
  const [txAddress, setTxAddress] = useState("");
  const { handleSubmit: handleSubmitMint } = useForm<MintFormSchema>({
    resolver: yupResolver(mintFormSchema),
  });

  const mint = async () => {
    try {
      if (!safeAuthSignInData) {
        router.push("/"); // eslint-disable-line @typescript-eslint/no-floating-promises

        return;
      }
      if (!cols || !rows) {
        throw new Error("cols or rows is empty");
      }
      if (!nftContractAddress) {
        throw new Error("nftContractAddress is empty");
      }
      setIsWaitingMint(true);
      const artistAddress = safeAuthSignInData.eoa;
      const quantity = cols * rows;
      const txAddress = await mintNFTs(
        artistAddress,
        ipfsHash,
        nftContractAddress,
        quantity
      );
      if (!txAddress) throw new Error("txAddress is empty");

      setTxAddress(txAddress);
      setIsWaitingMint(false);
    } catch (e) {
      console.error(e);
    }
  };

  return [handleSubmitMint, mint, isWaitingMint, txAddress];
};
