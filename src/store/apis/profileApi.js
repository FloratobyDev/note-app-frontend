import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const profileApi = createApi({
    reducerPath: "profile",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200',
        credentials: 'include',
    }),
    endpoints(builder) {
        return {
            fetchProfile: builder.query({
                providesTags: () => {
                    return ['Profile']
                },
                query: () => {
                    return {
                        url: "/profile/info/fetch",
                        method: "GET"
                    }
                }
            })
        }
    }
})

export const { useFetchProfileQuery } = profileApi;

export { profileApi };