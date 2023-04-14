import type { FC } from "react";
import { useCropper } from "@/hooks/useCropper";
import { useIPFS } from "@/hooks/useIPFS";
import { useIchimatsuMint } from "@/hooks/useIchimatsuMint";
import "cropperjs/dist/cropper.min.css";

const IchimatsuMintOrganism: FC = () => {
  const [
    cids,
    registerIPFS,
    handleSubmitIPFS,
    ipfsErrors,
    uploadSlicedImagesToIPFS,
    slices,
    setSlices,
  ] = useIPFS();

  const [
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
  ] = useCropper(setSlices);

  const [registerMint, handleSubmitMint, mintErrors, mint] =
    useIchimatsuMint(cids);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <input
          {...registerImage("image")}
          type="file"
          accept="image/*"
          onChange={handleSubmitImage(readImageFile)}
        />
        {imageErrors.image && (
          <span>{imageErrors.image.message as string}</span>
        )}
      </div>
      {imageSource && (
        <div>
          <img
            ref={imageRef}
            src={imageSource as string}
            alt="selected"
            style={{ maxWidth: "100%" }}
          />
          <div>
            <form onSubmit={handleSubmitCrop(sliceAndPreview)}>
              <div>
                <label htmlFor="cols">Cols</label>
                <input id="cols" type="text" {...registerCrop("cols")} />
                {cropErrors.cols && (
                  <span>{cropErrors.cols.message as string}</span>
                )}
              </div>
              <div>
                <label htmlFor="rows">Rows</label>
                <input id="rows" type="text" {...registerCrop("rows")} />
                {cropErrors.rows && (
                  <span>{cropErrors.rows.message as string}</span>
                )}
              </div>
              <button type="submit">分割してプレビュー</button>
            </form>
          </div>
        </div>
      )}
      {slices.length > 0 && (
        <div className="container w-full">
          {/* TODO: gapについて、col=17以降になると、lg以上で画面が破綻する */}
          <div className="flex flex-wrap gap-0.5">
            {slices.map((slice, index) => (
              <img
                className={`w-[${imageHoverWidth}%]`}
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
                  <span>{ipfsErrors.name.message as string}</span>
                )}
              </div>
              <div>
                <label htmlFor="cidVersion">CID Version</label>
                <input id="name" type="text" {...registerIPFS("cidVersion")} />
                {ipfsErrors.name && (
                  <span>{ipfsErrors.name.message as string}</span>
                )}
              </div>
              <button type="submit">アップロード</button>
            </form>
          </div>
        </div>
      )}
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
                <span>{mintErrors.name.message as string}</span>
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
                <span>{mintErrors.royaltyRecipient.message as string}</span>
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
                <span>{mintErrors.royaltyBps.message as string}</span>
              )}
            </div>
            <button type="submit">Mint NFT</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default IchimatsuMintOrganism;
