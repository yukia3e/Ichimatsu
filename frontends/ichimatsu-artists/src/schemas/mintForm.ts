import * as yup from "yup";
import type { InferType } from "yup";

export const mintFormSchema = yup.object().shape({
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

export type MintFormSchema = InferType<typeof mintFormSchema>;
