import { baseApi } from "../api/baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBanner: build.mutation({
      query: (payload) => ({
        url: "/banner/create-banner",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["banner"],
    }),
    getAllBanners: build.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach((arg: { label: string; value: any }) => {
            if (arg?.value) {
              params.append(arg.label, arg.value);
            }
          });
        }
        return {
          url: `/banner`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["banner"],
    }),
    getSingleBanner: build.query({
      query: (_id) => {
        return {
          url: `/banner/single-banner/${_id}`,
          method: "GET",
        };
      },
      providesTags: ["cars"],
    }),
    updateBanner: build.mutation({
      query: (data) => {
        return {
          url: `/banner/update-banner/${data._id}`,
          method: "PATCH",
          body: data.payload,
        };
      },
      invalidatesTags: ["banner"],
    }),
    updateBannerStatus: build.mutation({
      query: (data) => ({
        url: `/banner/update-status/${data._id}?isActive=${data.isActive}`,
        method: "PATCH",
      }),
      invalidatesTags: ["banner"],
    }),
    
  }),
});

export const {useCreateBannerMutation,useGetAllBannersQuery,useGetSingleBannerQuery,useUpdateBannerMutation,useUpdateBannerStatusMutation}=bannerApi
