import * as yup from "yup";
import type { InferType } from "yup";

export const cropFormSchema = yup.object().shape({
  cols: yup
    .number()
    .typeError("Cols must be a number")
    .required("Cols is required")
    .positive("Cols must be a positive number")
    .integer("Cols must be a integer number"),
  rows: yup
    .number()
    .typeError("Rows must be a number")
    .required("Rows is required")
    .positive("Rows must be a positive number")
    .integer("Rows must be a integer number"),
});

export type CropFormSchema = InferType<typeof cropFormSchema>;
