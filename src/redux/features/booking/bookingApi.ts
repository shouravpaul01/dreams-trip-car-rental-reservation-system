import { baseApi } from "../../api/baseApi";

const bookingApi=baseApi.injectEndpoints({
    endpoints:(build)=>({
      confirmBooking:build.mutation({
        query:(data)=>({
            url:"/bookings/create-booking",
            method:"POST",
            body:data
        }),
        invalidatesTags:["bookings"]
      })  ,
      getAllBookings:build.query({
        query:(data)=>({
            url:"/bookings",
            method:"GET",
        }),
        providesTags:["bookings"]
      })  ,
      updateApprovalStatus:build.mutation({
        query:(data)=>({
            url:`/bookings/update-approval-status/${data._id}?isApproved=${data.isApproved}`,
            method:"PATCH",
        }),
        invalidatesTags:["bookings"]
      })  
    })
})
export const {useConfirmBookingMutation,useGetAllBookingsQuery,useUpdateApprovalStatusMutation}=bookingApi