import * as yup from "yup";
import type { InferType } from "yup";

export const ipfsFormSchema = yup.object().shape({
  name: yup.string(),
  cidVersion: yup
    .number()
    .typeError("CIDVersion must be a number")
    .integer("CIDVersion must be an integer"),
});

export type IPFSFormSchema = InferType<typeof ipfsFormSchema>;
