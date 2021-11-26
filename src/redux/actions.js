
function addContract(contract) {
    console.log("add contract in actinos.js");
    return {
        type: "ADD_CONTRACT",
        payload: { text: contract, id: contract.address }
    }
}


export { addContract }