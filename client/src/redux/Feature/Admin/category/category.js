import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";



const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Category
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/sys-categories/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags:getTagsByModuleName('Category')
    }),

    // Get Categories
    getCategory: builder.query({
      query: () => ({
        url: "/sys-categories",
      }),
      providesTags:getTagsByModuleName('Category')
  
    }),

    // Update Category
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sys-categories/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:getTagsByModuleName('Category')
     
    }),

    // Delete Category mutation in RTK Query
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/sys-categories/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Category')
      
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
