import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  // prepareHeaders: (headers) => {
  //   const token = localStorage.get("authToken");
  //   if (token) {
  //     headers.set("Authorization", `Bearer ${token}`);
  //   }
  //   return headers;
  // },
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const token = state?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});


const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    "categories",
    // "permissions",
    // "roles",
    "brands",
    "users",
    "attributes",
    "sliders",
    "products",
    "customers",
    "subscriptions",
  ],
});

export default baseApi;

