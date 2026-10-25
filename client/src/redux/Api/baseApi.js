import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../Feature/auth/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQuery = async (args, api, extraOptions) => {
  const tokenAtRequest = api.getState()?.auth?.token;
  const result = await rawBaseQuery(args, api, extraOptions);
  // Only clear the session the request was sent with, not a newer login that happened meanwhile.
  if (
    result.error?.status === 401 &&
    tokenAtRequest &&
    api.getState()?.auth?.token === tokenAtRequest
  ) {
    api.dispatch(logout());
  }
  return result;
};

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    "categories",
    "brands",
    "users",
    "attributes",
    "sliders",
    "products",
    "customers",
    "subscriptions",
    "orders",
    "contact"
  ],
});

export default baseApi;
