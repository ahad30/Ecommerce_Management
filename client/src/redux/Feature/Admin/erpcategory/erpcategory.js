import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";


const erpcategory = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Category
    addErpCategory: builder.mutation({
      query: (data) => ({
        url: "/erp-categories/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags:getTagsByModuleName('ErpCategory')
      // tags.filter(tag => tag.name === 'Category').map(tag => tag.tag), 
    }),

    // Get Categories
    getErpCategory: builder.query({
      query: () => ({
        url: "/erp-categories",
      }),
      providesTags:getTagsByModuleName('ErpCategory')
      // tags.filter(tag => tag.name === 'Category').map(tag => tag.tag), // 
    }),

    // Update Category
    updateErpCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/erp-categories/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:getTagsByModuleName('ErpCategory')
      //  tags.filter(tag => tag.name === 'Category').map(tag => tag.tag) 
    }),

    // Delete Category mutation in RTK Query
    deleteErpCategory: builder.mutation({
      query: (id) => ({
        url: `/erp-categories/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('ErpCategory')
      // tags.filter(tag => tag.name === 'Category').map(tag => tag.tag) 
    }),
  }),
});

export const {
  useAddErpCategoryMutation,
  useGetErpCategoryQuery,
  useUpdateErpCategoryMutation,
  useDeleteErpCategoryMutation,
} = erpcategory;
