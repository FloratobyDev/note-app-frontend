import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200',
        credentials: 'include'
    }),
    endpoints(builder) {
        return {
            addUser: builder.mutation({
                query: (user) => {

                    return {
                        url: "/register",
                        method: "POST",
                        body: user,

                    }
                }
            }),
            addAdmin: builder.mutation({
                query: (user) => {
                    return {
                        url: "/register/admin",
                        method: "POST",
                        body: user,

                    }
                }
            }),
            validateUser: builder.mutation({
                query: (user) => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: user
                    }
                }
            }),
            updateUserAbout: builder.mutation({
                query: (about) => {
                    return {
                        url: "/about",
                        method: "PATCH",
                        body: {
                            newAbout: about
                        }
                    }
                }
            })
        }
    }
})

export const { useUpdateUserAboutMutation, useValidateUserMutation, useAddAdminMutation, useAddUserMutation } = userApi
export { userApi }