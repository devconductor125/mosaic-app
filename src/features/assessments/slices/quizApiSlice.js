import { apiSlice } from "./../../../apiSlice";

export const quizApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => 'quiz/categories/',
            keepUnusedDataFor: 5,
        }),
        getCategory: builder.query({
            query: (id) => `quiz/category/${id}/`,
            keepUnusedDataFor: 5,
        }),
        getQuizForm: builder.query({
            query: (id) => `quiz/form/${id}/`,
            keepUnusedDataFor: 5,
        }),
        getResults: builder.mutation({
            query: (params) =>({
                url: `quiz/results/?category_id=${params.category_id}&date=${params.date}&page_size=${params.page_size}&page=${params.page}`,
                method: 'GET'
            })
        }),
        saveResult: builder.mutation({
            query: results =>({
                url: 'quiz/results/',
                method: 'PUT',
                body: { ...results }
            })
        }),
        modifyResult: builder.mutation({
            query: (params) =>({
                url: `quiz/result/${params.id}/`,
                method: 'PUT',
                body: { ...params.result_json }
            })
        }),
        deleteResult: builder.mutation({
            query: (id) =>({
                url: `quiz/result/${id}/`,
                method: 'DELETE'
            })
        }),
        getResult: builder.query({
            query: (id) => `quiz/result/${id}/`,
            keepUnusedDataFor: 5,
        }),
        getAssessmentSummaries: builder.mutation({
            query: (params) =>({
                url: `quiz/summaries/?category_id=${params.category_id}&date=${params.date}&page_size=${params.page_size}&page=${params.page}`,
                method: 'GET'
            })
        })
    })
})

export const {
    useGetCategoriesQuery, useGetCategoryQuery, useGetQuizFormQuery, useGetResultsMutation, useSaveResultMutation, useGetResultQuery, useModifyResultMutation, 
    useDeleteResultMutation, useGetAssessmentSummariesMutation
} = quizApiSlice 