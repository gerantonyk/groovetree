//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Song {
    address private owner;
    address private createdBy;
    Token[] private tokens;
    struct Token {
        address owner;
        string title;
    }

    constructor() {
        owner = msg.sender;
        createdBy = msg.sender;
    }

    event TokenCreated(uint256 index, address owner, string title);

    function createToken(string calldata _title) public returns (uint256) {
        // (bool success, ) = payable(address(owner)).call{value: msg.value}("");
        // require(success, "failed transactions");
        tokens.push(Token(msg.sender, _title));
        emit TokenCreated(tokens.length - 1, msg.sender, _title);
        return tokens.length - 1;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getToken(uint256 _id) public view returns (Token memory) {
        // require(msg.sender == owner, "Only the owner can view the token");
        return tokens[_id];
    }

    function getTokens() public view returns (Token[] memory) {
        return tokens;
    }
}
