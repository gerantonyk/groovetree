import { combineReducers } from 'redux'

const musicNftReducer = (state = null, action) => {
    switch (action.type) {
        case "ADD_MUSICNFT_CONTRACT":
            return action.payload
        default: return state
    }
}
const marketReducer = (state = null, action) => {
    switch (action.type) {
        case "ADD_MARKET_CONTRACT":
            return action.payload
        default: return state
    }
}

const rootReducer = combineReducers({
    musicNftContract: musicNftReducer,
    marketContract: marketReducer
});

export default rootReducer;