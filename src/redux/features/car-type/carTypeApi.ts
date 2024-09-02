import { baseApi } from "../../api/baseApi";

const carTypeApi=baseApi.injectEndpoints({
    endpoints:(build)=>({
        createCarType:build.mutation({
            query:(data)=>({
                url:"/car-types/create-car-type",
                method:"POST",
                body:data
            }),
            invalidatesTags:["carTypes"]
        }),
        getAllCarType:build.query({
            query:(args)=>{
                return {
                    url:`/car-types?search=${args.search || ""}&page=${args.page || ""}`,
                    method:"GET",
                }
            },
            providesTags:["carTypes"]
        }),
        updateCarType:build.mutation({
            query:(data)=>({
                url:`/car-types/${data._id}`,
                method:"PATCH",
                body:data
            }),
            invalidatesTags:["carTypes"]
        }),
        updateCarTypeStatus:build.mutation({
            query:(data)=>({
                url:`/car-types/update-status/${data._id}?isActive=${data.isActive}`,
                method:"PATCH",
            }),
            invalidatesTags:["carTypes"]
        }),
        getAllActiveCarTypes:build.query({
            query:(data)=>({
                url:`/car-types/active-car-types`,
                method:"GET",

            }),
            providesTags:["carTypes"]
        }),
    })
})
export const {useCreateCarTypeMutation,useGetAllCarTypeQuery,useUpdateCarTypeMutation,useUpdateCarTypeStatusMutation,useGetAllActiveCarTypesQuery}=carTypeApi