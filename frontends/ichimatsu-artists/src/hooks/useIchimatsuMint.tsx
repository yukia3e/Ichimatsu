import { yupResolver } from "@hookform/resolvers/yup";
import type { MintFormSchema } from "@/schemas/mintForm";
import { mintFormSchema } from "@/schemas/mintForm";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";

export const useIchimatsuMint = (
  cids: string[]
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

  const mint = () => {
    const name = watchMint("name");
    const symbol = watchMint("symbol");
    const royaltyRecipient = watchMint("royaltyRecipient");
    const royaltyBps = watchMint("royaltyBps");
    // TODO: ここでcidsを使ってmintする
    console.log("mint!", name, symbol, royaltyRecipient, royaltyBps, cids);
  };

  return [registerMint, handleSubmitMint, mintErrors, mint];
};
