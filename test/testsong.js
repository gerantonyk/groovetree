const { expect } = require("chai");
const { ethers } = require("hardhat");
//bytes32 public constant DEFAULT_ADMIN_ROLE = 0x00;
const DEF_ADMIN_ROLE = ethers.utils.formatBytes32String("0x00");
const ZERO_ACCOUNT = "0x0000000000000000000000000000000000000000"
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
        // const owner = await this.song_contract.getRoleAdmin(DEF_ADMIN_ROLE.valueOf());
        // console.log("owner", owner);
        // expect(owner).to.be.equal(this.owner.address);
    });
    it("should create a token", async function () {
        expect(await this.song_contract.connect(this.user).mintSong("https://testuri"))
            .to.emit(this.song_contract, "Transfer")
            .withArgs(ZERO_ACCOUNT, this.user.address, 0);
        expect(await this.song_contract.tokenURI(0)).to.be.equal("https://testuri");
        // const tokenuri = await this.song_contract.tokenURI(0);
        expect(await this.song_contract.connect(this.owner).mintSong("https://testuriII"))
            .to.emit(this.song_contract, "Transfer")
            .withArgs(ZERO_ACCOUNT, this.owner.address, 1);
        // const tokenuri = await this.song_contract.tokenURI(1);
        expect(await this.song_contract.tokenURI(1)).to.be.equal("https://testuriII");
        alltokens = await this.song_contract.getTokenCount();
        expect(alltokens).to.be.equal(2);
        // console.log("tokens", tokens);
        // console.log("token", token);
    });
});
