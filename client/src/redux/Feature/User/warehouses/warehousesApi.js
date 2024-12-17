import baseApi from "@/redux/Api/baseApi";
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const warehousesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add
    addWarehouses: builder.mutation({
      query: (data) => ({
        url: "/warehouses/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName("Warehouses"),
    }),

    // Get
    getWarehouses: builder.query({
      query: () => ({
        url: "/warehouses",
      }),
      providesTags: getTagsByModuleName("Warehouses"),
    }),

    // Update Warehouses
    updateWarehouses: builder.mutation({
      query: ({ id, data }) => ({
        url: `/warehouses/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName("Warehouses"),
    }),

    // Delete Warehouses
    deleteWarehouses: builder.mutation({
      query: (id) => ({
        url: `/warehouses/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName("Warehouses"),
    }),
  }),
});

export const {
  useAddWarehousesMutation,
  useGetWarehousesQuery,
  useUpdateWarehousesMutation,
  useDeleteWarehousesMutation,
} = warehousesApi;
