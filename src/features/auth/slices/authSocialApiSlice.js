import { apiSlice } from "../../../apiSlice"

export const authApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGoogleOAuthLoginUrl: builder.query({
            query: () => ({
                url: 'social/google/oauth/auth_url/signin/',
                method: 'POST',
            })
        }),
        getGoogleOAuthRegisterUrl: builder.query({
            query: () => ({
                url: 'social/google/oauth/auth_url/signup/',
                method: 'POST',
            })
        }),
        googleOAuth: builder.mutation({
            query: (payload) => ({
                url: 'social/google/oauth/',
                method: 'POST',
                body: { ...payload}
            })
        }),
        getFacebookApp: builder.query({
            query: () => 'social/facebook/oauth/',
            keepUnusedDataFor: 5,
        }),
        facebookOAuth: builder.mutation({
            query: (payload) => ({
                url: 'social/facebook/oauth/',
                method: 'POST',
                body: { ...payload}
            })
        }),

    })
})

export const {
    useGetGoogleOAuthLoginUrlQuery,
    useGetGoogleOAuthRegisterUrlQuery,
    useGoogleOAuthMutation,
    useGetFacebookAppQuery,
    useFacebookOAuthMutation
} = authApi

