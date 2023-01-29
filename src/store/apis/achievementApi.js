import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const achievementApi = createApi({
    reducerPath: "achievement",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200',
        credentials: 'include',
    }),
    endpoints(builder) {
        return {
            fetchAchievements: builder.query({
                providesTags: () => {
                    return ['Achievement']
                },
                query: () => {
                    return {
                        url: "/achievement",
                        method: "GET"
                    }
                }
            }),
            addAchievementInfo: builder.mutation({
                invalidatesTags: () => {
                    return ['Achievement']
                },
                query: (newAchievement) => {
                    return {
                        url: "/achievement/info/add",
                        method: "POST",
                        body: newAchievement
                    }
                }
            })
        }
    }
})

export const { useFetchAchievementsQuery, useAddAchievementInfoMutation } = achievementApi;

export { achievementApi };