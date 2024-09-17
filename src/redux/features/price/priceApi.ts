import { baseApi } from "../../api/baseApi";

const priceApi=baseApi.injectEndpoints({
    endpoints:(build)=>({
        createPrice:build.mutation({
            query:(data)=>({
                url:"/prices/create-price",
                method:"POST",
                body:data
            }),
            invalidatesTags:["prices"]
        }),
        getAllPrices:build.query({
            query:(args)=>{
                return {
                    url:`/prices?search=${args.search || ""}&page=${args.page || ""}`,
                    method:"GET",
                }
            },
            providesTags:["prices"]
        }),
        getSinglePrice: build.query({
            query: (_id) => {
              return {
                url: `/prices/single-price/${_id}`,
                method: "GET",
              };
            },
            providesTags: ["cars"],
          }),
        updatePrice:build.mutation({
            query:(data)=>({
                url:`/prices/${data._id}`,
                method:"PATCH",
                body:data.data
            }),
            invalidatesTags:["prices"]
        }),
        updatePriceStatus:build.mutation({
            query:(data)=>({
                url:`/prices/update-status/${data._id}?isActive=${data.isActive}`,
                method:"PATCH",
            }),
            invalidatesTags:["prices"]
        }),
        getAllActivePrices:build.query({
            query:(data)=>({
                url:`/prices/active-prices`,
                method:"GET",

            }),
            providesTags:["prices"]
        }),
    })
})
export const {useCreatePriceMutation,useGetAllPricesQuery,useGetSinglePriceQuery,useUpdatePriceMutation,useUpdatePriceStatusMutation,useGetAllActivePricesQuery}=priceApi