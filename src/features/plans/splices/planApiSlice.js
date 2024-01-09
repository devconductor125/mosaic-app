import { apiSlice } from "./../../../apiSlice";

export const planApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRecommendation: builder.mutation({
            query: (params) => ({
                url: `quiz/recommendation/?order=${params.order}`,
                method: 'GET'
            })
        }),
        generateRecommendation: builder.mutation({
            query: (params) => ({
                url: 'quiz/recommendation/',
                method: 'POST',
                body: { ...params }
            })
        }),
        resultCheckFirstTime: builder.mutation({
            query: () => ({
                url: 'quiz/result-check/',
                method: 'GET'
            })
        }),
        resultCheck: builder.mutation({
            query: () => ({
                url: 'quiz/result-check/',
                method: 'POST'
            })
        }),
        acceptActionPlan: builder.mutation({
            query: () => ({
                url: 'quiz/accept-plan/',
                method: 'POST'
            })
        }),
        getProgress: builder.mutation({
            query: (params) => ({
                url: `quiz/progress/?timeline=${params.timeline}`,
                method: 'GET'
            })
        }),
        submitProgress: builder.mutation({
            query: (params) => ({
                url: 'quiz/submit-progress/',
                method: 'POST',
                body: { ...params }
            })
        }),
        getProgressList: builder.mutation({
            query: (params) => ({
                url: `quiz/progress/?year=${params.year}`,
                method: 'GET'
            })
        }),
        getProgressOptions: builder.mutation({
            query: () => ({
                url: 'quiz/progress-options/',
                method: 'GET'
            })
        }),
        getUserProgressShare: builder.mutation({
            query: (params) => ({
                url: `quiz/progress-share/?date=${params.date}`,
                method: 'GET'
            })
        }),
        sendUserProgressShare: builder.mutation({
            query: (params) => ({
                url: 'quiz/progress-share/',
                method: 'POST',
                body: { ...params }
            })
        }),
        getPublicUserProgressShare: builder.mutation({
            query: (params) => ({
                url: 'quiz/progress-share-public/',
                method: 'POST',
                body: { ...params }
            })
        }),
        getProgressInsight: builder.mutation({
            query: (params) => ({
                url: `quiz/progress-insight/${params.id}/`,
                method: 'GET'
            })
        }),
        getProgressInsightList: builder.mutation({
            query: (params) => ({
                url: `quiz/progress-insights/?insight_type=${params.insight_type}&date=${params.date}&page_size=${params.page_size}&page=${params.page}`,
                method: 'GET'
            })
        }),
        generateProgressInsight: builder.mutation({
            query: (params) => ({
                url: 'quiz/progress-insights/',
                method: 'POST',
                body: { ...params }
            })
        }),
        checkUserProgressInsightStatus: builder.mutation({
            query: () => ({
                url: `quiz/progress-insights-status/`,
                method: 'GET'
            })
        }),
        getUserProgressInsightStatus: builder.mutation({
            query: (params) => ({
                url: 'quiz/progress-insights-status/',
                method: 'POST',
                body: { ...params }
            })
        }),
        selectActionPlanGoal: builder.mutation({
            query: (params) => ({
                url: 'quiz/select-action-plan/',
                method: 'POST',
                body: { ...params }
            })
        }),
        saveActionPlanGoal: builder.mutation({
            query: (params) => ({
                url: 'quiz/action-plan-goal/',
                method: 'POST',
                body: { ...params }
            })
        }),
        deleteActionPlanGoal: builder.mutation({
            query: (params) => ({
                url: 'quiz/action-plan-goal/',
                method: 'DELETE',
                body: { ...params }
            })
        }),
        
    })
})

export const {
    useGetRecommendationMutation, 
    useGenerateRecommendationMutation, 
    useResultCheckFirstTimeMutation, 
    useResultCheckMutation,
    useAcceptActionPlanMutation,
    useGetProgressMutation,
    useSubmitProgressMutation,
    useGetProgressListMutation,
    useGetProgressOptionsMutation,
    useGetUserProgressShareMutation,
    useSendUserProgressShareMutation,
    useGetPublicUserProgressShareMutation,
    useGetProgressInsightMutation,
    useGetProgressInsightListMutation,
    useCheckUserProgressInsightStatusMutation,
    useGetUserProgressInsightStatusMutation,
    useGenerateProgressInsightMutation,
    useSelectActionPlanGoalMutation,
    useDeleteActionPlanGoalMutation,
    useSaveActionPlanGoalMutation
} = planApiSlice 