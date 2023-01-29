import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const levelApi = createApi({
    reducerPath: "level",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200',
        credentials: 'include',
    }),
    endpoints(builder) {
        return {
            fetchLevel: builder.query({
                providesTags: () => {
                    return ['Level']
                },
                query: () => {
                    return {
                        url: "/level/info/fetch",
                        method: "GET"
                    }
                }
            })
        }
    }
})

export const { useFetchLevelQuery } = levelApi;

export { levelApi };