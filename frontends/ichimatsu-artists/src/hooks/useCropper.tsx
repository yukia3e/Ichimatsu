import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import type { CropFormSchema } from "@/schemas/cropperForm";
import { cropFormSchema } from "@/schemas/cropperForm";
import Cropper from "cropperjs";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";

export const useCropper = (
  setSlices: Dispatch<SetStateAction<string[]>>
): [
  number | null,
  number | null,
  MutableRefObject<HTMLImageElement | null>,
  number,
  FieldErrors<CropFormSchema>,
  () => void,
  () => void,
  UseFormRegister<CropFormSchema>,
  UseFormHandleSubmit<CropFormSchema>,
  () => void
] => {
  const {
    register: registerCrop,
    handleSubmit: handleSubmitCrop,
    formState: { errors: cropErrors },
    watch: watchCrop,
  } = useForm<CropFormSchema>({
    resolver: yupResolver(cropFormSchema),
    defaultValues: {
      cols: 3,
      rows: 3,
    },
  });

  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);
  const [croppedImageHoverWidth, setCroppedImageHoverWidth] = useState(0.0);
  const [cols, setCols] = useState<number | null>(null);
  const [rows, setRows] = useState<number | null>(null);

  const initCropper = () => {
    if (imageRef.current && !cropperRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        viewMode: 1,
        background: false,
      });
    }
  };

  const destroyCropper = () => {
    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = null;
    }
  };

  const sliceAndPreview = () => {
    const cols = watchCrop("cols");
    const rows = watchCrop("rows");

    if (cropperRef.current) {
      const tmpNum = 100 / cols - 0.5;
      setCroppedImageHoverWidth(Math.floor(tmpNum * 10) / 10);
      const cropper = cropperRef.current;
      const canvas = cropper.getCroppedCanvas();
      const { width, height } = canvas;

      const sliceWidth = width / cols;
      const sliceHeight = height / rows;

      const newSlices = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const sliceCanvas = document.createElement("canvas");
          sliceCanvas.width = sliceWidth;
          sliceCanvas.height = sliceHeight;
          const ctx = sliceCanvas.getContext("2d");

          if (!ctx) {
            return;
          }
          ctx.drawImage(
            canvas,
            x * sliceWidth,
            y * sliceHeight,
            sliceWidth,
            sliceHeight,
            0,
            0,
            sliceWidth,
            sliceHeight
          );

          newSlices.push(sliceCanvas.toDataURL());
        }
      }

      setCols(cols);
      setRows(rows);
      setSlices(newSlices);
    }
  };

  return [
    cols,
    rows,
    imageRef,
    croppedImageHoverWidth,
    cropErrors,
    initCropper,
    destroyCropper,
    registerCrop,
    handleSubmitCrop,
    sliceAndPreview,
  ];
};
