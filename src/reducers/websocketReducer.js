import { types } from '../types/types';

const initialState = {
    trade: [],
    fullVolume: []
}

export const websocketReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.wsTrade:
            const { FSYM } = action.payload;
            return {
                ...state,
                trade: {
                    ...state.trade,
                    [ FSYM ]: action.payload
                },
            }
    
        case types.wsFullVolume:
            const { SYMBOL } = action.payload;
            return {
                ...state,
                fullVolume: {
                    ...state.fullVolume,
                    [ SYMBOL ]: action.payload
                },
            }

        case types.wsSubscribe:
            return {
                ...state,
                ws: [
                    ...state.ws,
                    action.payload
                ]
            }
    
        case types.wsUnsubscribe:
            return {
                ...state,
                ws: state.ws.filter(
                    e => ( e.id !== action.payload )
                )
            }

        default:
            return state;

    }

}
