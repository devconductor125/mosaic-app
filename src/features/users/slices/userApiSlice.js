import { apiSlice } from "./../../../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCurrentUser: builder.query({
            query: () => 'user/current/',
            keepUnusedDataFor: 5,
        }),
        acceptTerms: builder.mutation({
            query: () => ({
                url: 'user/accept/terms/',
                method: 'POST',
            })
        }),
        getAnalytics: builder.query({
            query: () => 'user/analytics/',
            keepUnusedDataFor: 5,
        }),
        saveCurrentUser: builder.mutation({
            query: params =>({
                url: 'user/current/',
                method: 'POST',
                body: { ...params }
            })
        }),
        resetUserPassword: builder.mutation({
            query: params =>({
                url: 'user/reset-password/',
                method: 'POST',
                body: { ...params }
            })
        }),
        getDefaultAvatars: builder.mutation({
            query: () =>({
                url: 'user/avatars/',
                method: 'GET'
            })
        }),
        changeAvatar: builder.mutation({
            query: (params) =>({
                url: 'user/change-avatar/',
                method: 'POST',
                body: { ...params }
            })
        }),
        deleteAccount: builder.mutation({
            query: () =>({
                url: 'user/delete-account/',
                method: 'POST'
            })
        }),
        checkDailyReminder: builder.mutation({
            query: params =>({
                url: 'user/check-daily-reminder/',
                method: 'POST',
                body: { ...params }
            })
        }),
        purchaseEmail: builder.mutation({
            query: params =>({
                url: 'user/purchase-email/',
                method: 'POST',
                body: { ...params }
            })
        }),
        playedHelpVideo: builder.mutation({
            query: (params) =>({
                url: 'user/played-video/',
                method: 'POST',
                body: { ...params }
            })
        }),
        getUserAckStatus: builder.query({
            query: (params) => `user/acknowledge/?ack_type=${params.ack_type}`,
            keepUnusedDataFor: 5,
        }),
        ackUserStatus: builder.mutation({
            query: (params) => ({
                url: 'user/acknowledge/',
                method: 'POST',
                body: { ...params }
            })
        }),
        setTimezone: builder.mutation({
            query: (params) => ({
                url: 'user/set-timezone/',
                method: 'POST',
                body: { ...params }
            })
        }),
        getUserStatus: builder.mutation({
            query: () =>({
                url: 'user/status/',
                method: 'GET'
            })
        }),
        getUserInformation: builder.mutation({
            query: () =>({
                url: 'user/information/',
                method: 'GET'
            })
        }),
        saveUserInformation: builder.mutation({
            query: (params) => ({
                url: 'user/information/',
                method: 'POST',
                body: { ...params }
            })
        }),
    })
})

export const {
    useGetCurrentUserQuery, 
    useLazyGetCurrentUserQuery, 
    useAcceptTermsMutation, 
    useGetAnalyticsQuery, 
    useSaveCurrentUserMutation, 
    useResetUserPasswordMutation,
    useGetDefaultAvatarsMutation,
    useChangeAvatarMutation,
    useDeleteAccountMutation,
    useCheckDailyReminderMutation,
    usePurchaseEmailMutation,
    usePlayedHelpVideoMutation,
    useGetUserAckStatusQuery,
    useAckUserStatusMutation,
    useSetTimezoneMutation,
    useGetUserStatusMutation,
    useGetUserInformationMutation,
    useSaveUserInformationMutation
} = userApiSlice 