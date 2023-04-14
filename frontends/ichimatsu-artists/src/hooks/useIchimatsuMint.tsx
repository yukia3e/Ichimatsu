import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import * as yup from "yup";

interface mintFormValues {
  name: string;
  symbol: string;
  royaltyRecipient: string;
  royaltyBps: number;
}

const mintSchema = yup.object().shape({
  image: yup.mixed().required("Image is required"),
  name: yup.string().required("Name is required"),
  symbol: yup.string().required("Symbol is required"),
  royaltyRecipient: yup
    .string()
    .required("Royalty Recipient is required")
    .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address"),
  royaltyBps: yup
    .number()
    .typeError("Royalty Bps must be a number")
    .required("Royalty Bps is required")
    .positive("Royalty Bps must be a positive number"),
});

export const useIchimatsuMint = (): [
  UseFormRegister<mintFormValues>,
  UseFormHandleSubmit<mintFormValues>,
  FieldErrors<mintFormValues>,
  (cids: string[]) => void
] => {
  const {
    register: registerMint,
    handleSubmit: handleSubmitMint,
    formState: { errors: mintErrors },
    watch: watchMint,
  } = useForm<mintFormValues>({ resolver: yupResolver(mintSchema) });

  const mint = (cids: string[]) => {
    const name = watchMint("name");
    const symbol = watchMint("symbol");
    const royaltyRecipient = watchMint("royaltyRecipient");
    const royaltyBps = watchMint("royaltyBps");
    // TODO: ここでcidsを使ってmintする
    console.log("mint!", name, symbol, royaltyRecipient, royaltyBps, cids);
  };

  return [registerMint, handleSubmitMint, mintErrors, mint];
};
