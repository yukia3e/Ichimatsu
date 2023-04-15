import { ethers } from "hardhat";

async function main() {
  const IchimatsuNFT = await ethers.getContractFactory("IchimatsuNFT");
  const ichimatsuNFT = await IchimatsuNFT.deploy("IchimatsuNFT", "INFT", "", 0);

  await ichimatsuNFT.deployed();

  console.log(`IchimatsuNFT deployed to ${ichimatsuNFT.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
