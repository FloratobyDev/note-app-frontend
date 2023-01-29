import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { achievementApi } from "./apis/achievementApi";
import { authApi } from "./apis/authApi";
import { calendarApi } from "./apis/calendarApi";
import { categoryApi } from "./apis/categoryApi";
import { profileApi } from "./apis/profileApi";
import { settingsApi } from "./apis/settingsApi";
import { tasksApi } from "./apis/tasksApi";
import { userApi } from "./apis/userApi";

export const store = configureStore({
    reducer: {
        [tasksApi.reducerPath]: tasksApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [calendarApi.reducerPath]: calendarApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [achievementApi.reducerPath]: achievementApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [settingsApi.reducerPath]: settingsApi.reducer
    },
    middleware: (defaultMiddleware) => {
        return defaultMiddleware()
            .concat(calendarApi.middleware)
            .concat(tasksApi.middleware)
            .concat(userApi.middleware)
            .concat(categoryApi.middleware)
            .concat(authApi.middleware)
            .concat(achievementApi.middleware)
            .concat(profileApi.middleware)
            .concat(settingsApi.middleware)
    }
})

setupListeners(store.dispatch)

export { useAddTaskMutation, useUpdateTaskMutation, useFetchTaskQuery, useRemoveTaskMutation } from './apis/tasksApi'
export { useAddCategoryMutation, useRemoveCategoryMutation, useFetchCategoryQuery } from './apis/categoryApi'
export { useAddUserMutation, useValidateUserMutation, useAddAdminMutation, useUpdateUserAboutMutation } from './apis/userApi'
export { useFetchCalendarQuery, useLazyFetchCalendarQuery } from './apis/calendarApi'
export { useAuthenticateAdminQuery, useAuthenticateUserQuery, useAuthenticateRemoveCookiesMutation } from './apis/authApi'
export { useFetchAchievementsQuery, useAddAchievementInfoMutation } from './apis/achievementApi'
export { useFetchProfileQuery } from './apis/profileApi'
export { useFetchProfileImageQuery, useUpdateProfileImageMutation, useUpdateSecureUserInfoMutation, useUpdateUserInfoMutation, useRemoveAccountMutation } from './apis/settingsApi'