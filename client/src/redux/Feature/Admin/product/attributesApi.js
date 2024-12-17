import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const attributesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Add Attributes
    addAttributes: builder.mutation({
      query: (data) => ({
        url: "/attributes/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Attributes'),
    }),

    addAttributesValue: builder.mutation({
      query: (data) => ({
        url: "/attributes-value/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      // invalidatesTags: getTagsByModuleName('Attributes'),
    }),



    // Get Attributes
    getAttributes: builder.query({
      query: () => ({
        url: "/attributes",
      }),
      providesTags: getTagsByModuleName('Attributes'),
    }),

    // Update Attributes
    updateAttributes: builder.mutation({
      query: ({ id, data }) => ({
        url: `/attributes/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Attributes'),
    }),

    updateAttributesValue: builder.mutation({
      query: ({ id, data }) => ({
        url: `/attributes-value/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      // invalidatesTags: getTagsByModuleName('Attributes'),
    }),





    // Delete Attributes
    deleteAttributes: builder.mutation({
      query: (id) => ({
        url: `/attributes/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Attributes'),
    }),

    // Delete Attributes Values
    deleteAttributesValues: builder.mutation({
      query: (id) => ({
        url: `/attributes-value/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Attributes'),
    }),
  }),
});

export const {
  useAddAttributesMutation,
  useAddAttributesValueMutation,
  useGetAttributesQuery,
  useUpdateAttributesMutation,
  useUpdateAttributesValueMutation,
  useDeleteAttributesMutation,
  useDeleteAttributesValuesMutation,

} = attributesApi;
