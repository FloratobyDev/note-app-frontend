import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const settingsApi = createApi({
    reducerPath: "settings",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200',
        credentials: 'include',
    }),
    endpoints(builder) {
        return {
            updateProfileImage: builder.mutation({
                invalidatesTags: () => {
                    return ['Settings']
                },
                query: (fileInfo) => {
                    const formData = new FormData()
                    formData.append('image', fileInfo)
                    return {
                        url: "/settings/upload/profile-image",
                        method: "POST",
                        body: formData

                    }
                }
            }),
            updateUserInfo: builder.mutation({
                invalidatesTags: () => {
                    return ['Settings']
                },
                query: (newInfo) => {
                    return {
                        url: "/settings/update/userinfo",
                        method: "PATCH",
                        body: newInfo
                    }
                }
            }),
            updateSecureUserInfo: builder.mutation({
                query: (newInfo) => {
                    return {
                        url: "/settings/update/password",
                        method: "PATCH",
                        body: newInfo
                    }
                }
            }),
            fetchProfileImage: builder.query({
                providesTags: () => {
                    return ['Settings']
                },
                query: () => {
                    return {
                        url: "/settings/fetch",
                        method: "GET"
                    }
                }
            }),
            removeAccount: builder.mutation({
                query: (info) => {
                    return {
                        url: "/settings/annihilation",
                        method: "DELETE",
                        body: {
                            deleteWord: info
                        }
                    }
                }
            })
        }
    }
})

export const { useRemoveAccountMutation, useFetchProfileImageQuery, useUpdateProfileImageMutation, useUpdateUserInfoMutation, useUpdateSecureUserInfoMutation } = settingsApi;

export { settingsApi };