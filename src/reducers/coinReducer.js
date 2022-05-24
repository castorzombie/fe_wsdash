import { types } from '../types/types';

const initialState = {
    coins: [],
    activeCoin: null
};


export const coinReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.coinsLoaded:
            return {
                ...state,
                coins: [ ...action.payload ]
            }

        case types.addCoin:
            return {
                ...state,
                coins: [
                    ...state.coins,
                    action.payload
                ]
            }
    
        case types.deleteCoin:
            return {
                ...state,
                coins: state.coins.filter(
                    e => ( e.id !== action.payload )
                )
            }
        
        case types.setActiveCoin:
            return {
                ...state,
                activeCoin: action.payload
            }
    
        case types.clearActiveCoin:
            return {
                ...state,
                activeCoin: null
            }

        case types.coinLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }


}
