import {SET_LIFE_COACH_SESSIONS, SET_LAST_SESSION_ORDER} from './../constants/actionTypes'

const initialState = {
    sessions: null,
    lastSessionOrder: 0,
    goalCount: 0,
    isActionPlanAccepted: false
}
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LIFE_COACH_SESSIONS:
            return {
                ...state,
                sessions: action.payload.sessions,
                goalCount: action.payload.goalCount,
                lastSessionOrder: action.payload.lastSessionOrder,
                isActionPlanAccepted: action.payload.isActionPlanAccepted
            };
        case SET_LAST_SESSION_ORDER:
            return {
                ...state,
                lastSessionOrder: action.payload
            };
        default:
            return state;
    }
}
