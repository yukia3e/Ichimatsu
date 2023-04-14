import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Cropper from "cropperjs";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import * as yup from "yup";

interface cropFormValues {
  cols: number;
  rows: number;
}

const imageSchema = yup.object().shape({
  image: yup.mixed().required("Image is required"),
});

const cropSchema = yup.object().shape({
  cols: yup
    .number()
    .typeError("Col must be a number")
    .required("Col is required")
    .positive("Col must be a positive number")
    .integer("Col must be a integer number"),
  rows: yup
    .number()
    .typeError("Row must be a number")
    .required("Row is required")
    .positive("Row must be a positive number")
    .integer("Row must be a integer number"),
});

export const useCropper = (
  setSlices: Dispatch<SetStateAction<string[]>>
): [
  SubmitHandler<FieldValues>,
  UseFormRegister<FieldValues>,
  UseFormHandleSubmit<FieldValues>,
  FieldErrors<FieldValues>,
  UseFormRegister<cropFormValues>,
  UseFormHandleSubmit<cropFormValues>,
  FieldErrors<cropFormValues>,
  MutableRefObject<HTMLImageElement | null>,
  number,
  string | ArrayBuffer | null,
  () => void
] => {
  const {
    register: registerImage,
    handleSubmit: handleSubmitImage,
    formState: { errors: imageErrors },
  } = useForm({ resolver: yupResolver(imageSchema) });

  const {
    register: registerCrop,
    handleSubmit: handleSubmitCrop,
    formState: { errors: cropErrors },
    watch: watchCrop,
  } = useForm<cropFormValues>({ resolver: yupResolver(cropSchema) });

  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  const [imageHoverWidth, setImageHoverWidth] = useState(0.0);
  const [imageSource, setImageSource] = useState<string | ArrayBuffer | null>(
    null
  );

  useEffect(() => {
    if (imageSource) {
      destroyCropper();
      initCropper();
    }

    return () => {
      destroyCropper();
    };
  }, [imageSource]);

  const initCropper = () => {
    if (imageRef.current && !cropperRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        viewMode: 1,
        background: false,
      });
    }
  };

  const readImageFile: SubmitHandler<FieldValues> = (data, event) => {
    if (event) {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (!file) return;

      const reader = new FileReader();

      const onLoadHandler = () => {
        setImageSource(reader.result);
      };

      reader.addEventListener("load", onLoadHandler);

      reader.onloadend = () => {
        reader.removeEventListener("load", onLoadHandler);
      };

      reader.readAsDataURL(file);
    }
  };

  const destroyCropper = () => {
    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = null;
    }
  };

  const sliceAndPreview = () => {
    console.log("sliceAndPreview is called");
    const cols = watchCrop("cols");
    const rows = watchCrop("rows");

    if (cropperRef.current) {
      const tmpNum = 100 / cols - 0.5;
      setImageHoverWidth(Math.floor(tmpNum * 10) / 10);
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

      setSlices(newSlices);
    }
  };

  return [
    readImageFile,
    registerImage,
    handleSubmitImage,
    imageErrors,
    registerCrop,
    handleSubmitCrop,
    cropErrors,
    imageRef,
    imageHoverWidth,
    imageSource,
    sliceAndPreview,
  ];
};
