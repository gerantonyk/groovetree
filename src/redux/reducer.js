import { combineReducers } from 'redux'

const contractReducer = (state = null, action) => {
    switch (action.type) {
        case "ADD_MUSICNFT_CONTRACT":
            return action.payload
        case "ADD_MARKET_CONTRACT":
            return action.payload
        default: return state
    }
}

const rootReducer = combineReducers({
    musicNftContract: contractReducer,
    marketContract: contractReducer
});

export default rootReducer;