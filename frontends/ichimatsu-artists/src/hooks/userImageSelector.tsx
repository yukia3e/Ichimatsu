import { MutableRefObject, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { imageFormSchema } from "@/schemas/imageForm";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";

export const useImageSelector = (
  imageRef: MutableRefObject<HTMLImageElement | null>,
  initCropper: () => void,
  destroyCropper: () => void
): [
  string | ArrayBuffer | null,
  FieldErrors<FieldValues>,
  SubmitHandler<FieldValues>,
  UseFormRegister<FieldValues>,
  UseFormHandleSubmit<FieldValues>
] => {
  const {
    register: registerImage,
    handleSubmit: handleSubmitImage,
    formState: { errors: imageErrors },
  } = useForm({ resolver: yupResolver(imageFormSchema) });

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

  return [
    imageSource,
    imageErrors,
    readImageFile,
    registerImage,
    handleSubmitImage,
  ];
};
