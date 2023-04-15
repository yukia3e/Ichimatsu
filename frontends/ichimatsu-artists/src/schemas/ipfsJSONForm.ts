import * as yup from "yup";
import type { InferType } from "yup";

export const ipfsJSONFormSchema = yup.object().shape({
  eventName: yup
    .string()
    .typeError("eventName must be a number")
    .required("eventName is required"),
  eventDate: yup.date(),
  artistName: yup.string(),
});

export type IPFSJSONFormSchema = InferType<typeof ipfsJSONFormSchema>;
