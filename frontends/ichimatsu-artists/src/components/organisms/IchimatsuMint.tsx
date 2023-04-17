import type { FC } from "react";
import Button from "@/components/atoms/Button";
import { useCropper } from "@/hooks/useCropper";
import { useIchimatsuDeploy } from "@/hooks/useIchimatsuDeploy";
import { useIchimatsuMint } from "@/hooks/useIchimatsuMint";
import { useImageToIPFS } from "@/hooks/useImageToIPFS";
import "cropperjs/dist/cropper.min.css";
import { useJSONToIPFS } from "@/hooks/useJSONToIPFS";
import { useImageSelector } from "@/hooks/userImageSelector";
import range from "@/utils/range";

const IchimatsuMintOrganism: FC = () => {
  const [
    isWaiting,
    cids,
    handleSubmitIPFS,
    uploadSlicedImagesToIPFS,
    slices,
    setSlices,
  ] = useImageToIPFS();

  const [
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
  ] = useCropper(setSlices);

  const [
    imageSource,
    imageErrors,
    readImageFile,
    registerImage,
    handleSubmitImage,
  ] = useImageSelector(imageRef, initCropper, destroyCropper);

  const [
    isWaitingJSON,
    ipfsHash,
    ipfsJSONErrors,
    uploadJSONsToIPFS,
    registerIPFSJSON,
    handleSubmitJPFSJSON,
  ] = useJSONToIPFS(cids);

  const [
    registerDeploy,
    handleSubmitDeploy,
    deployErrors,
    deploy,
    isWaitingDeploy,
    nftContractAddress,
  ] = useIchimatsuDeploy();

  const [handleSubmitMint, mint, isWaitingMint, txAddress] = useIchimatsuMint(
    ipfsHash,
    nftContractAddress,
    cols,
    rows
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Select image file */}
      <div className="container w-full px-4">
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
              <div className="mb-4 px-4">
                <div className="flex flex-row justify-around my-4">
                  <label
                    htmlFor="cols"
                    className="block text-sm font-medium mx-4 my-auto w-1/3"
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
                    className="block text-sm font-medium mx-4 my-auto w-1/3"
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
      {/* upload images to IPFS */}
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
              <Button design="primary" buttonType="submit" className="my-6">
                Upload Images to IPFS
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
      {/* upload JSON to IPFS */}
      {cids.length > 0 && (
        <div className="container w-full">
          <form onSubmit={handleSubmitMint(mint)}>
            <div className="mb-4 px-4">
              <div className="flex flex-row justify-around my-4">
                <label
                  htmlFor="eventName"
                  className="block text-sm font-medium mx-4 my-auto w-1/3"
                >
                  Event Name
                </label>
                <input
                  id="eventName"
                  type="text"
                  className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-primary-500 focus:ring-primary-500 file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"
                  {...registerIPFSJSON("eventName", {
                    required: "EventName is required",
                  })}
                />
                {ipfsJSONErrors.eventName && (
                  <span className="text-sm text-red-600 mt-2">
                    {ipfsJSONErrors.eventName.message as string}
                  </span>
                )}
              </div>
              <div className="flex flex-row justify-around my-4">
                <label
                  htmlFor="eventDate"
                  className="block text-sm font-medium mx-4 my-auto w-1/3"
                >
                  Event Date
                </label>
                <input
                  id="eventDate"
                  type="text"
                  className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-primary-500 focus:ring-primary-500 file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"
                  {...registerIPFSJSON("eventDate", {
                    required: "EventDate is required",
                  })}
                />
                {ipfsJSONErrors.eventDate && (
                  <span>{ipfsJSONErrors.eventDate.message as string}</span>
                )}
              </div>
              <div className="flex flex-row justify-around my-4">
                <label
                  htmlFor="artistName"
                  className="block text-sm font-medium mx-4 my-auto w-1/3"
                >
                  Artist Name
                </label>
                <input
                  id="artistName"
                  type="text"
                  className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-primary-500 focus:ring-primary-500 file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"
                  {...registerIPFSJSON("artistName")}
                />
                {ipfsJSONErrors.artistName && (
                  <span className="text-sm text-red-600 mt-2">
                    {ipfsJSONErrors.artistName.message as string}
                  </span>
                )}
              </div>
            </div>
            <Button
              design="primary"
              onClick={handleSubmitJPFSJSON(uploadJSONsToIPFS)}
            >
              Upload JSON to IPFS
            </Button>
          </form>
        </div>
      )}
      {/* Loading indicator */}
      {isWaitingJSON && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-16 h-16 rounded-full border-t-4 border-blue-500 animate-spin ease-linear"></div>
        </div>
      )}
      {/* Deploy! */}
      {ipfsHash && (
        <div className="container w-full">
          <form onSubmit={handleSubmitDeploy(deploy)}>
            <div className="mb-4 px-4">
              <div className="flex flex-row justify-around my-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mx-4 my-auto w-1/3"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-primary-500 focus:ring-primary-500 file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"
                  {...registerDeploy("name", { required: "Name is required" })}
                />
              </div>
              {deployErrors.name && (
                <span className="text-sm text-red-600 mt-2">
                  {deployErrors.name.message as string}
                </span>
              )}
            </div>
            <div className="mb-4 px-4">
              <div className="flex flex-row justify-around my-4">
                <label
                  htmlFor="symbol"
                  className="block text-sm font-medium mx-4 my-auto w-1/3"
                >
                  Symbol
                </label>
                <input
                  id="symbol"
                  type="text"
                  className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-primary-500 focus:ring-primary-500 file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"
                  {...registerDeploy("symbol", {
                    required: "Symbol is required",
                  })}
                />
              </div>
              {deployErrors.symbol && (
                <span>{deployErrors.symbol.message as string}</span>
              )}
            </div>
            <div className="mb-4 px-4">
              <div className="flex flex-row justify-around my-4">
                <label
                  htmlFor="royaltyRecipient"
                  className="block text-sm font-medium mx-4 my-auto w-1/3"
                >
                  Royalty Recipient
                </label>
                <input
                  id="royaltyRecipient"
                  type="text"
                  className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-primary-500 focus:ring-primary-500 file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"
                  {...registerDeploy("royaltyRecipient", {
                    required: "Royalty Recipient is required",
                  })}
                />
              </div>
              {deployErrors.royaltyRecipient && (
                <span className="text-sm text-red-600 mt-2">
                  {deployErrors.royaltyRecipient.message as string}
                </span>
              )}
            </div>
            <div className="flex flex-row justify-around my-4">
              <label
                htmlFor="royaltyBps"
                className="block text-sm font-medium mx-4 my-auto w-1/3"
              >
                Royalty Bps
              </label>
              <input
                id="royaltyBps"
                type="number"
                className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-primary-500 focus:ring-primary-500 file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4"
                {...registerDeploy("royaltyBps", {
                  required: "Royalty Bps is required",
                })}
              />
              {deployErrors.royaltyBps && (
                <span className="text-sm text-red-600 mt-2">
                  {deployErrors.royaltyBps.message as string}
                </span>
              )}
            </div>
            <Button design="primary" buttonType="submit">
              Deploy NFT Contract
            </Button>
          </form>
        </div>
      )}
      {/* Loading indicator */}
      {isWaitingDeploy && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-16 h-16 rounded-full border-t-4 border-blue-500 animate-spin ease-linear"></div>
        </div>
      )}
      {/* Mint! */}
      {nftContractAddress && (
        <div className="container w-full">
          <form onSubmit={handleSubmitMint(mint)}>
            <Button design="primary" buttonType="submit">
              Mint NFT
            </Button>
          </form>
        </div>
      )}
      {/* Loading indicator */}
      {isWaitingMint && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-16 h-16 rounded-full border-t-4 border-blue-500 animate-spin ease-linear"></div>
        </div>
      )}
      {/* trxAddress */}
      {txAddress && (
        <div className="container w-full">
          <span className="font-logo">Minted!!</span>
          <br />
          <span className="font-logo text-sm flex flex-wrap">
            trxAddress: {`${txAddress}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default IchimatsuMintOrganism;
