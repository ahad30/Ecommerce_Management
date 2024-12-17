import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Add User
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users/create",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('User')
    }),

    // Get Users
    getUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      providesTags: getTagsByModuleName('User')
    }),

    // Get User by ID
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/user/${id}`,
      }),
      providesTags: getTagsByModuleName('User'),
    }),

    // Update User
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/update/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('User')
    }),

    // Delete User
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('User')
    }),

  }),
});

export const { 
  useAddUserMutation,
  useGetUsersQuery, 
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
