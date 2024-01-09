import {SET_OPEN, SET_CLOSE, SET_MOBILE_MODE, SET_DESKTOP_MODE} from './../constants/actionTypes'

const initialState = {
    open: false,
    isMobile: false
}
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_OPEN:
            return {
                ...state,
                open: true
            };
        case SET_CLOSE:
            return {
                ...state,
                open: false
            };
        case SET_MOBILE_MODE:
            return {
                ...state,
                isMobile: true,
                open:false
            };
        case SET_DESKTOP_MODE:
            return {
                ...state,
                isMobile: false,
                open:true
            };


        default:
            return state;
    }
}
