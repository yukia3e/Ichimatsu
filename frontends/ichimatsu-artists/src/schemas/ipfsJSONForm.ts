import * as yup from "yup";
import type { InferType } from "yup";

export const ipfsJSONFormSchema = yup.object().shape({
  eventName: yup
    .string()
    .typeError("eventName must be a number")
    .required("eventName is required"),
  eventDate: yup.string().typeError("eventDate must be a number"),
  artistName: yup.string().typeError("artistName must be a number"),
});

export type IPFSJSONFormSchema = InferType<typeof ipfsJSONFormSchema>;
