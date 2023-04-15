import * as yup from "yup";
import type { InferType } from "yup";

export const imageFormSchema = yup.object().shape({
  image: yup.mixed().required("Image is required"),
});

export type ImageFormSchema = InferType<typeof imageFormSchema>;
