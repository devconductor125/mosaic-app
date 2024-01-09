import { apiSlice } from "../../../apiSlice"

export const authApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'auth/login/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: 'auth/register/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'auth/logout/',
                method: 'POST',
            })
        }),
        sendVerificationEmail: builder.mutation({
            query: credentials => ({
                url: 'auth/send-verification-email/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        activateEmail: builder.mutation({
            query: (params) => ({
                url: `auth/activate/?user_id=${params.user_id}&code=${params.code}`,
                method: 'GET'
            })
        }),
        checkAccountByEmail: builder.mutation({
            query: (params) => ({
                url: 'auth/check-account/',
                method: 'POST',
                body: { ...params }
            })
        }),
        sendResetPasswordEmail: builder.mutation({
            query: credentials => ({
                url: 'auth/send-reset-password-email/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        checkResetLink: builder.mutation({
            query: (params) => ({
                url: `auth/check-reset-link/${params.uidb64}/${params.token}/`,
                method: 'GET'
            })
        }),
        resetPassword: builder.mutation({
            query: (params) => ({
                url: `auth/reset-password/${params.uidb64}/${params.token}/`,
                method: 'POST',
                body: { password: params.password }
            })
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useSendVerificationEmailMutation,
    useActivateEmailMutation,
    useCheckAccountByEmailMutation,
    useSendResetPasswordEmailMutation,
    useCheckResetLinkMutation,
    useResetPasswordMutation
} = authApi

