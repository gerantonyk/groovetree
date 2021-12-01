// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
//import "./MultiSig.sol";

contract MusicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    //parent(childToken) = parentToken
    mapping (uint=>uint) public parent;
    event TokenCreated(uint256 indexed index, address owner, string tokenU);
    constructor() ERC721("Music", "MSC") {}

    function createSong(string memory _tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        emit TokenCreated(newItemId, msg.sender,_tokenURI);
        return newItemId;
    }

    function createNewV(uint tokenId, string memory tokenURI) external {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: CreateNewV caller is not owner nor approved");
        uint newTokenId = createSong(tokenURI);
        parent[newTokenId] = tokenId;
        _burn(tokenId);
    }
}


/* flow:
buyer makes an offer;
owner accepts the offer and approves;
buyer can transfer to himself the v1 o create a v2 linked to the previos token;
if he creates a v2 v1 is burnt;
*/
