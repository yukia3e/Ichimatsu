import * as yup from "yup";
import type { InferType } from "yup";

export const deployFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  symbol: yup.string().required("Symbol is required"),
  royaltyRecipient: yup
    .string()
    .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address"),
  royaltyBps: yup
    .number()
    .typeError("Royalty Bps must be a number")
    .positive("Royalty Bps must be a positive number"),
});

export type DeployFormSchema = InferType<typeof deployFormSchema>;
