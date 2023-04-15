import type { FC } from "react";
import Button from "@/components/atoms/Button";
import { useCropper } from "@/hooks/useCropper";
import { useIPFS } from "@/hooks/useIPFS";
import { useIchimatsuMint } from "@/hooks/useIchimatsuMint";
import "cropperjs/dist/cropper.min.css";
import { useImageSelector } from "@/hooks/userImageSelector";
import range from "@/utils/range";

const IchimatsuMintOrganism: FC = () => {
  const [
    isWaiting,
    cids,
    registerIPFS,
    handleSubmitIPFS,
    ipfsErrors,
    uploadSlicedImagesToIPFS,
    slices,
    setSlices,
  ] = useIPFS();

  const [
    imageRef,
    croppedImageHoverWidth,
    cropErrors,
    initCropper,
    destroyCropper,
    registerCrop,
    handleSubmitCrop,
    sliceAndPreview,
  ] = useCropper(setSlices);

  const [
    imageSource,
    imageErrors,
    readImageFile,
    registerImage,
    handleSubmitImage,
  ] = useImageSelector(imageRef, initCropper, destroyCropper);

  const [registerMint, handleSubmitMint, mintErrors, mint] =
    useIchimatsuMint(cids);

  return (
    <div className="flex flex-col gap-8">
      {/* Select image file */}
      <div className="container w-full">
        <input
          {...registerImage("image")}
          type="file"
          accept="image/*"
          onChange={handleSubmitImage(readImageFile)}
          className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-primary-500 focus:ring-primary-500 file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"
        />
        {imageErrors.image && (
          <span>{imageErrors.image.message as string}</span>
        )}
      </div>
      {/* Crop and Preview */}
      {imageSource && (
        <div className="container w-full">
          <img
            ref={imageRef}
            src={imageSource as string}
            alt="selected"
            style={{ maxWidth: "100%" }}
          />
          <div>
            <form onSubmit={handleSubmitCrop(sliceAndPreview)}>
              <div className="mb-4">
                <div className="flex flex-row justify-around my-4">
                  <label
                    htmlFor="cols"
                    className="block text-sm font-medium mx-4 my-auto"
                  >
                    Cols
                  </label>
                  <select
                    {...registerCrop("cols")}
                    className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {range(1, 20).map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
                {cropErrors.cols && (
                  <span className="text-sm text-red-600 mt-2">
                    {cropErrors.cols.message as string}
                  </span>
                )}
                <div className="flex flex-row justify-around my-4">
                  <label
                    htmlFor="rows"
                    className="block text-sm font-medium mx-4 my-auto"
                  >
                    Rows
                  </label>
                  <select
                    {...registerCrop("rows")}
                    className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {range(1, 20).map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                  {cropErrors.rows && (
                    <span className="text-sm text-red-600 mt-2">
                      {cropErrors.rows.message as string}
                    </span>
                  )}
                </div>
              </div>

              <Button design="primary" buttonType="submit">
                Split and preview
              </Button>
            </form>
          </div>
        </div>
      )}
      {/* upload to IPFS */}
      {slices.length > 0 && (
        <div className="container w-full">
          {/* TODO: gapについて、col=17以降になると、lg以上で画面が破綻する */}
          <div className="flex flex-wrap gap-0.5">
            {slices.map((slice, index) => (
              <img
                className={`w-[${croppedImageHoverWidth}%]`}
                key={index}
                src={slice}
                alt={`slice-${index}`}
                style={{ maxWidth: "100%" }}
              />
            ))}
          </div>
          <div>
            <form onSubmit={handleSubmitIPFS(uploadSlicedImagesToIPFS)}>
              <div>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" {...registerIPFS("name")} />
                {ipfsErrors.name && (
                  <span className="text-sm text-red-600 mt-2">
                    {ipfsErrors.name.message as string}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="cidVersion">CID Version</label>
                <input id="name" type="text" {...registerIPFS("cidVersion")} />
                {ipfsErrors.name && (
                  <span className="text-sm text-red-600 mt-2">
                    {ipfsErrors.name.message as string}
                  </span>
                )}
              </div>
              <Button design="primary" buttonType="submit">
                Upload to IPFS
              </Button>
            </form>
          </div>
        </div>
      )}
      {/* Loading indicator */}
      {isWaiting && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-16 h-16 rounded-full border-t-4 border-blue-500 animate-spin ease-linear"></div>
        </div>
      )}
      {/* Mint! */}
      {cids.length > 0 && (
        <div className="container w-full">
          <form onSubmit={handleSubmitMint(mint)}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                {...registerMint("name", { required: "Name is required" })}
              />
              {mintErrors.name && (
                <span className="text-sm text-red-600 mt-2">
                  {mintErrors.name.message as string}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="symbol">Symbol</label>
              <input
                id="symbol"
                type="text"
                {...registerMint("symbol", { required: "Symbol is required" })}
              />
              {mintErrors.symbol && (
                <span>{mintErrors.symbol.message as string}</span>
              )}
            </div>
            <div>
              <label htmlFor="royaltyRecipient">Royalty Recipient</label>
              <input
                id="royaltyRecipient"
                type="text"
                {...registerMint("royaltyRecipient", {
                  required: "Royalty Recipient is required",
                })}
              />
              {mintErrors.royaltyRecipient && (
                <span className="text-sm text-red-600 mt-2">
                  {mintErrors.royaltyRecipient.message as string}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="royaltyBps">Royalty Bps</label>
              <input
                id="royaltyBps"
                type="number"
                {...registerMint("royaltyBps", {
                  required: "Royalty Bps is required",
                })}
              />
              {mintErrors.royaltyBps && (
                <span className="text-sm text-red-600 mt-2">
                  {mintErrors.royaltyBps.message as string}
                </span>
              )}
            </div>
            <Button design="primary" buttonType="submit">
              Mint NFT
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default IchimatsuMintOrganism;
