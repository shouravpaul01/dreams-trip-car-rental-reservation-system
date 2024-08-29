import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (data) => ({
        url: "/auth/signin",
        method: "POST",
        body:data
      }),
    }),
  }),
});

export const {useSignInMutation}=authApi
