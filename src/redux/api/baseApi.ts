// Need to use the React-specific entry point to import createApi
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithVerifyToken = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status == 401) {
    api.dispatch(logout());
    toast.error((result.error.data as any).message )
  }
  return result;
};
// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithVerifyToken,
  tagTypes: ["carTypes","prices", "cars","bookings"],
  endpoints: () => ({}),
});
