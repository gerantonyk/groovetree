function addMusicNftContract(contract) {
    return {
        type: "ADD_MUSICNFT_CONTRACT",
        payload: contract
    }
}
function addMarketContract(contract) {
    return {
        type: "ADD_MARKET_CONTRACT",
        payload: contract
    }
}

export { addMusicNftContract, addMarketContract }