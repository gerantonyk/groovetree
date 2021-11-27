
function addContract(contract) {
    console.log("add contract in actinos.js", contract);
    return {
        type: "ADD_CONTRACT",
        payload: contract
    }
}


export { addContract }