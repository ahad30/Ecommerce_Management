import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";


const branchesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Add Branch
    addBranch: builder.mutation({
      query: (data) => ({
        url: "/branches/create",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Branch')
    }),

    // Get Branches
    getBranches: builder.query({
      query: () => ({
        url: "/branches",
      }),
      providesTags: getTagsByModuleName('Branch')
    }),

    // Get Branch by ID
    // getBranchById: builder.query({
    //   query: (id) => ({
    //     url: `/branches/${id}`,
    //   }),
    //   providesTags: getTagsByModuleName('Branch'),
    // }),

    // Update Branch
    updateBranch: builder.mutation({
      query: ({ id, data }) => ({
        url: `/branches/update/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Branch')
    }),

    // Delete Branch
    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/branches/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Branch')
    }),

  }),
});

export const { 
  useAddBranchMutation,
  useGetBranchesQuery, 
  // useGetBranchByIdQuery,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchesApi;
