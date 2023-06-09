import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import router from "next/router";
import mintNFTs from "@/domains/api/mint";
import { mintFormSchema } from "@/schemas/mintForm";
import type { MintFormSchema } from "@/schemas/mintForm";
import useAuthStore from "@/stores/useAuthStore";
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
  const authSignInData = useAuthStore((state) => state.authSignInData);
  const [isWaitingMint, setIsWaitingMint] = useState(false);
  const [txAddress, setTxAddress] = useState("");
  const { handleSubmit: handleSubmitMint } = useForm<MintFormSchema>({
    resolver: yupResolver(mintFormSchema),
  });

  const mint = async () => {
    try {
      if (!authSignInData) {
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
      const artistAddress = authSignInData.eoa;
      const quantity = cols * rows;
      const txAddress = await mintNFTs(
        artistAddress,
        ipfsHash,
        nftContractAddress,
        quantity
      );
      if (!txAddress) throw new Error("txAddress is empty");

      setTxAddress(txAddress);
    } catch (e) {
      console.error(e);
    } finally {
      setIsWaitingMint(false);
    }
  };

  return [handleSubmitMint, mint, isWaitingMint, txAddress];
};
