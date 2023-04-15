import { yupResolver } from "@hookform/resolvers/yup";
import deployContract from "@/domains/api/deploy";
import mintNFTs from "@/domains/api/mint";
import type { Metadata } from "@/domains/types/mint";
import type { MintFormSchema } from "@/schemas/mintForm";
import { mintFormSchema } from "@/schemas/mintForm";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";

export const useIchimatsuMint = (
  cids: string[],
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
  } = useForm<MintFormSchema>({ resolver: yupResolver(mintFormSchema) });

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
      const metadatas: Metadata[] = [];
      cids.forEach((cid, index) => {
        metadatas.push({
          name: `${name} #${index + 1}`,
          description: "",
          image: `ipfs://${cid}`,
        });
      });
      // TODO: Contractのアドレスを取得する
      const _mintRes = await mintNFTs(artistAddress, metadatas, "");
      // TODO: ここで、mintResの結果をもとに、デプロイ完了を待つ
    } catch (e) {
      console.error(e);
    }
  };

  return [registerMint, handleSubmitMint, mintErrors, mint];
};
