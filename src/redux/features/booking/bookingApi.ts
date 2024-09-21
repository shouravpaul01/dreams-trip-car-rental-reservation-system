import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    confirmBooking: build.mutation({
      query: (data) => ({
        url: "/bookings/create-booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
    getAllBookings: build.query({
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
          url: "/bookings",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["bookings"],
    }),
    updateApprovalStatus: build.mutation({
      query: (data) => ({
        url: `/bookings/update-approval-status/${data._id}?isApproved=${data.isApproved}`,
        method: "PATCH",
      }),
      invalidatesTags: ["bookings"],
    }),
    getAllMyBookings: build.query({
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
          url: `/bookings/my-bookings`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["bookings"],
    }),
  }),
});
export const {
  useConfirmBookingMutation,
  useGetAllBookingsQuery,
  useUpdateApprovalStatusMutation,
  useGetAllMyBookingsQuery,
} = bookingApi;
