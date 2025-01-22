import baseApi from '../../../Api/baseApi';


const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Product
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['products']
    }),

    // Get Products
    getProducts: builder.query({
      query: () => ({
        url: "/product",
      }),
      providesTags: ['products']
    }),


     // Get Products by Id
     getProductsById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: ['products']
    }),

    // Update Product
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['products']
    }),

    // Delete Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['products']
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

export default productApi;
