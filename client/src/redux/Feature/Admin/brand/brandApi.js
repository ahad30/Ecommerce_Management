import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Brand
    addBrand: builder.mutation({
      query: (data) => ({
        url: "/brands/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Brand')
    }),

    // Get Brands
    getBrand: builder.query({
      query: () => ({
        url: "/brands",
      }),
      providesTags: getTagsByModuleName('Brand')
    }),

    // Update Brand
    updateBrand: builder.mutation({
      query: ({ id, data }) => ({
        url: `/brands/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Brand')
    }),

    // Delete Brand mutation in RTK Query
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brands/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Brand')
    }),
  }),
});

export const {
  useAddBrandMutation,
  useGetBrandQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
