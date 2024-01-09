import { apiSlice } from "./../../../apiSlice";

export const myAssessmentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMyAssessments: builder.mutation({
            query: () =>({
                url: 'quiz/my-assessment/',
                method: 'GET'
            })
        }),
        getMediaFile: builder.query({
            query: (params) => `media/file/?key=${params.key}`,
            keepUnusedDataFor: 5,
        }),
        getDashboardView: builder.mutation({
            query: () =>({
                url: 'user/dashboard/',
                method: 'GET'
            })
        }),
        getAssessmentSummary: builder.mutation({
            query: () =>({
                url: 'quiz/assessment-summary-status/',
                method: 'GET'
            })
        }),
        ackAssessmentSummary: builder.mutation({
            query: (params) => ({
                url: 'quiz/assessment-summary-status/',
                method: 'POST',
                body: { ...params }
            })
        })
    })
})

export const {
    useGetMyAssessmentsMutation, useGetMediaFileQuery, useGetDashboardViewMutation, useGetAssessmentSummaryMutation, useAckAssessmentSummaryMutation

} = myAssessmentsApiSlice 