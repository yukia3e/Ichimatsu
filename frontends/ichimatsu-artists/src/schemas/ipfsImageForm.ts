import * as yup from "yup";
import type { InferType } from "yup";

export const ipfsImageFormSchema = yup.object().shape({});

export type IPFSImageFormSchema = InferType<typeof ipfsImageFormSchema>;
