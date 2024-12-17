import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Product
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Product')
    }),

    // Get Products
    getProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
      providesTags: getTagsByModuleName('Product')
    }),

    // Update Product
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Product')
    }),

    // Delete Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Product')
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

export default productApi;
