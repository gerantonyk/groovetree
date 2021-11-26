import { combineReducers } from 'redux'

const contractReducer = (state = [], action) => {
    console.log("contract Reducer");
    switch (action.type) {
        case "ADD_CONTRACT":
            return [...state, { text: action.payload, id: action.payload.address }]
        default: return state
    }
}

const rootReducer = combineReducers({
    contract: contractReducer
});

export default rootReducer;