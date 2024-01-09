import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LOG_OUT } from './redux/constants/actionTypes';
import config from './config/config';

const baseQuery = fetchBaseQuery({
    baseUrl: config.apiEndpoint,
    credentials: 'same-origin',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        // console.log("token",token)
        if (token) {
            headers.set("Authorization", `Token ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
        api.dispatch({ type: LOG_OUT })
        // console.log('sending refresh token')
        // // send refresh token to get new access token 
        // const refreshResult = await baseQuery('auth/login/', api, extraOptions)
        // console.log(refreshResult)
        // if (refreshResult?.data) {
        //     const user = api.getState().auth.user
        //     user.token = refreshResult.data.token
        //     // store the new token 
        //     api.dispatch({ type: SET_CREDENTIALS, payload: { ...user} })
        //     // retry the original query with new access token 
        //     result = await baseQuery(args, api, extraOptions)
        // } else {
        //     api.dispatch({ type: LOG_OUT })
        // }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})