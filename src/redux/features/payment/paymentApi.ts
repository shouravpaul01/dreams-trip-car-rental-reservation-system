import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    paymentAfterReturningCar: build.mutation({
      query: (_id) => ({
        url: `/bookings/payment-after-returning-car/${_id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["bookings"],
    }),
  }),
});
export const { usePaymentAfterReturningCarMutation } = paymentApi;
