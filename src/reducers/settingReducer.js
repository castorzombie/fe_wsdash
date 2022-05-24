import { types } from '../types/types';

const initialState = {
    exchange: '',
    quote: ''
};


export const settingReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.addSetting:

            return {
                ...state,
                ...action.payload 
            }

        case types.updateSetting:
            const { exchange, quote } = action.payload;
            return {
                ...state,
                exchange,
                quote
            }

        default:
            return state;
    }

}