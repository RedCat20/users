import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery(
        {baseUrl: 'http://localhost:3001/users'}
    ),
    refetchOnFocus: true,
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: `http://localhost:3001/users`,
            }),
        })
    })
})

export const {useGetAllUsersQuery} = usersApi;
export default usersApi;