import baseApi from '../../Api/baseApi';


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: "/system-admin/login",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
    }),

    userLogin: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/users/create",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
      // invalidatesTags:getTagsByModuleName('users')
    }),
  }),
});

export const { 
  useLoginMutation, 
  useUserLoginMutation,
  useRegisterMutation
} = authApi;
