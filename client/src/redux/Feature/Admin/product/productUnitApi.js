import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const productUnitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Product Unit
    addProductUnit: builder.mutation({
      query: (data) => ({
        url: "/product-unites/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('ProductUnit')
    }),

    // Get Product Units
    getProductUnits: builder.query({
      query: () => ({
        url: "/product-unites",
      }),
      providesTags: getTagsByModuleName('ProductUnit')
    }),

    // Get Single Product Unit by ID
    getProductUnitById: builder.query({
      query: (id) => ({
        url: `/product-unites/${id}`,
      }),
      providesTags: getTagsByModuleName('ProductUnit')

    }),

    // Update Product Unit
    updateProductUnit: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product-unites/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('ProductUnit')

    }),

    // Delete Product Unit
    deleteProductUnit: builder.mutation({
      query: (id) => ({
        url: `/product-unites/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('ProductUnit')

    }),
  }),
});

export const {
  useAddProductUnitMutation,
  useGetProductUnitsQuery,
  useGetProductUnitByIdQuery, 
  useUpdateProductUnitMutation,
  useDeleteProductUnitMutation,
} = productUnitApi;

export default productUnitApi;
