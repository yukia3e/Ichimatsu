import { expect } from "chai";
import { ethers } from "hardhat";

describe("IchimatsuNFT", function () {
  async function deployIchimatsuNFTFixture() {
    const [owner] = await ethers.getSigners();
    const IchimatsuNFT = await ethers.getContractFactory("IchimatsuNFT");
    const ichimatsuNFT = await IchimatsuNFT.deploy(
      "IchimatsuNFT",
      "INFT",
      owner.address,
      0
    );
    await ichimatsuNFT.deployed();
    return { owner, ichimatsuNFT };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { ichimatsuNFT, owner } = await deployIchimatsuNFTFixture();
      expect(await ichimatsuNFT.owner()).to.equal(owner.address);
    });
  });
});
