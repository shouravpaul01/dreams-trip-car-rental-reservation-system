import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAccount: build.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    createUserByAdmin: build.mutation({
      query: (data) => ({
        url: "/users/create-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `/users/update-user/${data._id}`,
        method: "PATCH",
        body: data.payload,
      }),
      invalidatesTags: ["users", "single-user"],
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
        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
    }),
    getSingleUser: build.query({
      query: (email) => ({
        url: `/users/single-user/${email}`,
        headers: { "Cache-Control": "no-cache" },
        method: "GET",
      }),
      providesTags: ( email) => [
        { type: "single-user", email: email },
      ],

      keepUnusedDataFor: 0,
    }),

    updateUserRole: build.mutation({
      query: (data) => ({
        url: `/users/update-role?email=${data.email}&role=${data.role}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
    updateUserStatus: build.mutation({
      query: (data) => ({
        url: `/users/update-status?email=${data.email}&isBlocked=${data.isBlocked}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useCreateUserByAdminMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} = userApi;
