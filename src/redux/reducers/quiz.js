import {SET_CATEGORIES, SET_JOURNAL_TEMPLATES, SET_DEFAULT_TEMPLATE_ID} from './../constants/actionTypes'

const initialState = {
    categories: null,
    journalTemplates: null,
    defaultTemplateId: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case SET_JOURNAL_TEMPLATES:
            return {
                ...state,
                journalTemplates: action.payload
            };
        case SET_DEFAULT_TEMPLATE_ID:
            return {
                ...state,
                defaultTemplateId: action.payload
            };
        default:
            return state;
    }
}
