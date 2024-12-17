import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const productTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Product Type
    addProductType: builder.mutation({
      query: (data) => ({
        url: "/product-types/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('ProductType')
    }),

    // Get Product Types
    getProductTypes: builder.query({
      query: () => ({
        url: "/product-types",
      }),
      providesTags: getTagsByModuleName('ProductType')
    }),

    // Get Single Product Type by ID
    getProductTypeById: builder.query({
      query: (id) => ({
        url: `/product-types/${id}`,
      }),
      providesTags: getTagsByModuleName('ProductType')
    }),

    // Update Product Type
    updateProductType: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product-types/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('ProductType')

    }),

    // Delete Product Type
    deleteProductType: builder.mutation({
      query: (id) => ({
        url: `/product-types/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('ProductType')

    }),
  }),
});

export const {
  useAddProductTypeMutation,
  useGetProductTypesQuery,
  useGetProductTypeByIdQuery, 
  useUpdateProductTypeMutation,
  useDeleteProductTypeMutation,
} = productTypeApi;

export default productTypeApi;
