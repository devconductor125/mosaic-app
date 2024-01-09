import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth'
import quizReducer from './reducers/quiz'
import themeReducer from './reducers/theme'
import sessionReducer from './reducers/session'
import { apiSlice } from '../apiSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        quiz: quizReducer,
        theme: themeReducer,
        session: sessionReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})