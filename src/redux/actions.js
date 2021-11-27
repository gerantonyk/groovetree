function addContract(contract) {
    return {
        type: "ADD_CONTRACT",
        payload: contract
    }
}

export { addContract }