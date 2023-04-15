import * as yup from "yup";
import type { InferType } from "yup";

export const mintFormSchema = yup.object().shape({});

export type MintFormSchema = InferType<typeof mintFormSchema>;
