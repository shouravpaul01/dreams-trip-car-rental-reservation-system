import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAccount: build.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    updateAccount: build.mutation({
      query: (data) => ({
        url: "/users/update-user",
        method: "PATCH",
        body: data,
      }),
    }),
    getAllUsers: build.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg: { label: string; value: any }) => {
            if (arg.value !== "") {
              params.append(arg.label, arg.value);
            }
          });
        }
        return{
        url: "/users",
        method: "GET",
        params:params
      }},
      providesTags:["users"]
    }),
    updateUserRole: build.mutation({
      query: (data) => ({
        url: `/users/update-role?email=${data.email}&role=${data.role}`,
        method: "PATCH",
      }),
      invalidatesTags:["users"]
    }),
  }),
});

export const {useCreateAccountMutation,useUpdateAccountMutation,useGetAllUsersQuery,useUpdateUserRoleMutation}=userApi