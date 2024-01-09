import { apiSlice } from "./../../../apiSlice";

export const resourcesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getResources: builder.mutation({
            query: (params) => ({
                url: `resources/list/?type=${params.type}&is_save=${params.is_save}&area=${params.area}&page_size=${params.page_size}&page=${params.page}`,
                method: 'GET'
            })
        }),
        refreshResources: builder.mutation({
            query: (params) => ({
                url: 'resources/list/',
                method: 'POST',
                body: { ...params }
            })
        }),
        checkResourceStatus: builder.mutation({
            query: (params) => ({
                url: `resources/status/?resource_type=${params.resource_type}`,
                method: 'GET'
            })
        }),
        checkResourceLimit: builder.mutation({
            query: (params) => ({
                url: 'resources/status/',
                method: 'POST',
                body: { ...params }
            })
        }),
        getResource: builder.mutation({
            query: (params) => ({
                url: `resources/${params.id}/`,
                method: 'GET'
            })
        }),
        voteSaveResource: builder.mutation({
            query: (params) => ({
                url: `resources/${params.id}/`,
                method: 'POST',
                body: { ...params }
            })
        }),
        playedResourceVideo: builder.mutation({
            query: (params) => ({
                url: `resources/${params.id}/`,
                method: 'PUT'
            })
        }),
        getAffirmations: builder.mutation({
            query: (params) => ({
                url: `resources/affirmations/?is_save=${params.is_save}&page_size=${params.page_size}&page=${params.page}`,
                method: 'GET'
            })
        }),
        refreshAffirmations: builder.mutation({
            query: (params) => ({
                url: 'resources/affirmations/',
                method: 'POST',
                body: { ...params }
            })
        }),
        checkAffirmationStatus: builder.mutation({
            query: () => ({
                url: `resources/affirmation-status/`,
                method: 'GET'
            })
        }),
        checkAffirmationLimit: builder.mutation({
            query: (params) => ({
                url: 'resources/affirmation-status/',
                method: 'POST',
                body: { ...params }
            })
        }),
        saveAffirmation: builder.mutation({
            query: (params) => ({
                url: `resources/affirmation/${params.id}/`,
                method: 'POST',
                body: { ...params }
            })
        }),

    })
})

export const {
    useGetResourcesMutation, 
    useRefreshResourcesMutation,
    useCheckResourceStatusMutation,
    useCheckResourceLimitMutation,
    useGetResourceMutation,
    useVoteSaveResourceMutation,
    usePlayedResourceVideoMutation,
    useGetAffirmationsMutation,
    useRefreshAffirmationsMutation,
    useCheckAffirmationStatusMutation,
    useCheckAffirmationLimitMutation,
    useSaveAffirmationMutation
} = resourcesApiSlice 