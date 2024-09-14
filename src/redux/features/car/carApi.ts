import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCar: build.mutation({
      query: (data) => ({
        url: "/cars/create-car",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cars"],
    }),
    getAllCars: build.query({
      query: (args) => {
        return {
          url: `/cars`,
          method: "GET",
        };
      },
      providesTags: ["cars"],
    }),
    getSingleCar: build.query({
      query: (_id) => {
        return {
          url: `/cars/single-car/${_id}`,
          method: "GET",
        };
      },
      providesTags: ["cars"],
    }),
    updateCar: build.mutation({
      query: (data) => {
        return {
          url: `/cars/${data._id}`,
          method: "PATCH",
          body: data.data,
        };
      },
      invalidatesTags: ["cars"],
    }),
    updateCarStatus: build.mutation({
      query: (data) => ({
        url: `/cars/update-status/${data._id}?isActive=${data.isActive}`,
        method: "PATCH",
      }),
      invalidatesTags: ["cars"],
    }),
    getAllActiveCar: build.query({
      query: (data) => ({
        url: `/cars/active-car`,
        method: "GET",
      }),
      providesTags: ["cars"],
    }),
  }),
});
export const {
  useCreateCarMutation,
  useGetAllCarsQuery,
  useGetSingleCarQuery,
  useUpdateCarMutation,
  useUpdateCarStatusMutation,
} = carApi;
