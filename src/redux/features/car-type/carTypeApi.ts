import { baseApi } from "../../api/baseApi";

const carTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCarType: build.mutation({
      query: (data) => ({
        url: "/car-types/create-car-type",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["carTypes"],
    }),
    getAllCarType: build.query({
      query: (args) => {
        console.log(args,"arg")
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((arg: { label: string; value: any }) => {
            if (arg?.value) {
              params.append(arg.label, arg.value);
            }
          });
        }
        return {
          url: `/car-types`,
          method: "GET",
          params:params
        };
      },
      providesTags: ["carTypes"],
    }),
    getSingleCarType: build.query({
      query: (id) => {
        return {
          url: `/car-types/single-car-type/${id}`,
          method: "GET",
        };
      },
      providesTags: ["single-car-type"],
    }),
    updateCarType: build.mutation({
      query: (data) => ({
        url: `/car-types/${data._id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["carTypes"],
    }),
    updateCarTypeStatus: build.mutation({
      query: (data) => ({
        url: `/car-types/update-status/${data._id}?isActive=${data.isActive}`,
        method: "PATCH",
      }),
      invalidatesTags: ["carTypes"],
    }),
    getAllActiveCarTypes: build.query({
      query: () => ({
        url: `/car-types/active-car-types`,
        method: "GET",
      }),
      providesTags: ["carTypes"],
    }),
  }),
});
export const {
  useCreateCarTypeMutation,
  useGetAllCarTypeQuery,
  useGetSingleCarTypeQuery,
  useUpdateCarTypeMutation,
  useUpdateCarTypeStatusMutation,
  useGetAllActiveCarTypesQuery,
} = carTypeApi;
