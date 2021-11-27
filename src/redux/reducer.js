import { combineReducers } from 'redux'

const contractReducer = (state = null, action) => {
    console.log("contract Reducer", action.type);
    switch (action.type) {
        case "ADD_CONTRACT":
            console.log("ADD_CONTRACT IN REDUCER", action)
            return action.payload
        default: return state
    }
}

const rootReducer = combineReducers({
    songContract: contractReducer
});

export default rootReducer;