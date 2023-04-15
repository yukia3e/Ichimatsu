// import {
//   ErrorResponse,
//   MintRequestBody,
//   MintResponse,
// } from "@/domains/types/mint";

// const sponsoredMintNFTs = async (
//   artistAddress: string,
//   ipfsHash: string,
//   nftContractAddress: string
// ): Promise<void> => {
//   try {
//     const body: MintRequestBody = {
//       artistAddress,
//       ipfsHash,
//       nftContractAddress,
//     };
//     const response = await fetch("/api/mint", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     if (response.ok) {
//       const data: MintResponse = (await response.json()) as MintResponse;
//       console.log(`Task ID: ${data.taskId}, Status URL: ${data.statusUrl}`);
//     } else {
//       const error: ErrorResponse = (await response.json()) as ErrorResponse;
//       console.error(`Error: ${error.error}`);
//     }
//   } catch (error) {
//     console.error(`Error: ${error}`); // eslint-disable-line
//   }
// };

// export default sponsoredMintNFTs;
