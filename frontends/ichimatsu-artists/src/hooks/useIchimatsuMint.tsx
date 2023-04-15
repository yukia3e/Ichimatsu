import { yupResolver } from "@hookform/resolvers/yup";
import deployContract from "@/domains/api/deploy";
import mintNFTs from "@/domains/api/mint";
import { mintFormSchema } from "@/schemas/mintForm";
import type { MintFormSchema } from "@/schemas/mintForm";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";

export const useIchimatsuMint = (
  baseURI: string,
  artistAddress: string
): [
  UseFormRegister<MintFormSchema>,
  UseFormHandleSubmit<MintFormSchema>,
  FieldErrors<MintFormSchema>,
  () => void
] => {
  const {
    register: registerMint,
    handleSubmit: handleSubmitMint,
    formState: { errors: mintErrors },
    watch: watchMint,
  } = useForm<MintFormSchema>({
    resolver: yupResolver(mintFormSchema),
  });

  const mint = async () => {
    const name = watchMint("name");
    const symbol = watchMint("symbol");
    const royaltyRecipient = watchMint("royaltyRecipient");
    const royaltyBps = watchMint("royaltyBps");
    try {
      const _deployRes = await deployContract(
        name,
        symbol,
        royaltyRecipient,
        royaltyBps
      );
      // TODO: ここで、deployResの結果をもとに、デプロイ完了を待ち、NFTをmintする

      // TODO: Contractのアドレスを取得する
      const nftContractAddress = "";
      const _mintRes = await mintNFTs(
        artistAddress,
        baseURI,
        nftContractAddress
      );
      // TODO: ここで、mintResの結果をもとに、デプロイ完了を待つ
    } catch (e) {
      console.error(e);
    }
  };

  return [registerMint, handleSubmitMint, mintErrors, mint];
};
