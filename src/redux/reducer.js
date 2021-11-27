import { combineReducers } from 'redux'

const contractReducer = (state = null, action) => {
    switch (action.type) {
        case "ADD_CONTRACT":
            return action.payload
        default: return state
    }
}

const rootReducer = combineReducers({
    songContract: contractReducer
});

export default rootReducer;