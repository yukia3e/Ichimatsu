import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import mintNFTs from "@/domains/api/mint";
import { mintFormSchema } from "@/schemas/mintForm";
import type { MintFormSchema } from "@/schemas/mintForm";
import { UseFormHandleSubmit, useForm } from "react-hook-form";

export const useIchimatsuMint = (
  ipfsHash: string,
  nftContractAddress: string
): [
  UseFormHandleSubmit<MintFormSchema>,
  () => Promise<void>,
  boolean,
  string
] => {
  const [isWaitingMint, setIsWaitingMint] = useState(false);
  const [txAddress, setTxAddress] = useState("");
  const { handleSubmit: handleSubmitMint } = useForm<MintFormSchema>({
    resolver: yupResolver(mintFormSchema),
  });

  const mint = async () => {
    try {
      setIsWaitingMint(true);
      // TODO: Artist アドレスを取得する
      const artistAddress = "";
      const _mintRes = await mintNFTs(
        artistAddress,
        ipfsHash,
        nftContractAddress
      );
      // TODO: ここで、mintResの結果をもとに、デプロイ完了を待つ
      setTxAddress("");
      setIsWaitingMint(false);
    } catch (e) {
      console.error(e);
    }
  };

  return [handleSubmitMint, mint, isWaitingMint, txAddress];
};
