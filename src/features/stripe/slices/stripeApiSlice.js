import { apiSlice } from "./../../../apiSlice";

export const stripeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStripeSettings: builder.query({
            query: () => 'auth/stripe/products/',
            keepUnusedDataFor: 5,
        }),
        getStripeFilteredSettings: builder.query({
            query: () => 'auth/stripe/filter-products/',
            keepUnusedDataFor: 5,
        }),
        createStripeSession: builder.mutation({
            query: params =>({
                url: 'auth/stripe/checkout/',
                method: 'POST',
                body: { ...params }
            })
        }),
        createCustomerPortalUrl: builder.mutation({
            query: () => ({
                url: 'auth/stripe/customer-portal/',
                method: 'GET',
            })
        }),
        updateStripeSubscription: builder.mutation({
            query: params =>({
                url: 'auth/stripe/subscription/',
                method: 'POST',
                body: { ...params }
            })
        }),
        stripePaymentSheet: builder.mutation({
            query: params =>({
                url: 'auth/stripe/payment-sheet/',
                method: 'POST',
                body: { ...params }
            })
        }),
    })
})

export const {
    useGetStripeSettingsQuery,
    useGetStripeFilteredSettingsQuery,
    useCreateStripeSessionMutation,
    useCreateCustomerPortalUrlMutation,
    useUpdateStripeSubscriptionMutation,
    useStripePaymentSheetMutation
} = stripeApiSlice 