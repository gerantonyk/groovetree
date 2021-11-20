const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Song", function () {
     beforeEach(async function ()  {
        this.accounts = await ethers.getSigners();
        this.owner = this.accounts[0];
        this.user = this.accounts[1];
        this.user2 = this.accounts[2];
        this.user3 = this.accounts[3];
        this.provider = ethers.provider;
        const songFactory = await ethers.getContractFactory("Song");
        this.song_contract = await songFactory.deploy();
        await this.song_contract.deployed();
        // this.contractMintFee = await this.song_contract.mintCost();
    });
    it("should deploy", async function () {
        expect(this.song_contract.address).to.be.a('string');
        expect(this.song_contract.address.length).to.be.equal(42);
        expect(await this.song_contract.getOwner()).to.be.equal(this.owner.address);
    });
});
