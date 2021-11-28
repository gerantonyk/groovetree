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
        const owner = await this.song_contract.getOwner();
        console.log("owner", owner);
        expect(owner).to.be.equal(this.owner.address);
    });
    it("should create a token", async function () {
        expect(await this.song_contract.connect(this.user).createToken("TestSong", "https://testuri"))
            .to.emit(this.song_contract, "TokenCreated")
            .withArgs(0, this.user.address, "TestSong", "https://testuri");
        const token = await this.song_contract.getToken(0);
        expect(token.title).to.be.equal("TestSong");
        expect(token.owner).to.be.equal(this.user.address);
        expect(await this.song_contract.connect(this.user2).createToken("TestSongII", "https://testuriII"))
            .to.emit(this.song_contract, "TokenCreated")
            .withArgs(1, this.user2.address, "TestSongII", "https://testuriII");;
        const tokens = await this.song_contract.getTokens();
        console.log(tokens)
        expect(tokens[0][0].title).to.be.equal("TestSong");
        expect(tokens[1][0].title).to.be.equal("TestSongII");
        // console.log("tokens", tokens);
        // console.log("token", token);
    });
});
