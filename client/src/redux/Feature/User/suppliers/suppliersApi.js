import baseApi from "@/redux/Api/baseApi";
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const suppliersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Add Supplier
    addSupplier: builder.mutation({
      query: (data) => ({
        url: "/suppliers/create",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Supplier')
    }),

    // Get Suppliers
    getSuppliers: builder.query({
      query: () => ({
        url: "/suppliers",
      }),
      providesTags: getTagsByModuleName('Supplier')
    }),

    // Update Supplier
    updateSupplier: builder.mutation({
      query: ({ id, data }) => ({
        url: `/suppliers/update/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Supplier')
    }),

    // Delete Supplier
    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `/suppliers/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Supplier')
    }),

  }),
});

export const { 
  useAddSupplierMutation,
  useGetSuppliersQuery,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = suppliersApi;

export default suppliersApi;
