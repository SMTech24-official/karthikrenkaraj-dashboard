import baseApi from "@/redux/api/baseApi";

import { TQueryParams } from "@/types/globalType";

const causeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCause: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/causes",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Causes"],
    }),

    addCause: builder.mutation({
      query: (data) => ({
        url: `/causes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Causes"],
    }),

    getSingleCause: builder.query({
      query: (args) => ({
        url: `/causes/${args}`,
        method: "GET",
      }),
      providesTags: ["Causes"],
    }),

    updateCause: builder.mutation({
      query: (args) => ({
        url: `/causes/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["Causes"],
    }),

    templeFundingCauses: builder.query({
      query: (args) => {
        return {
          url: `/suggest/open-founding/${args}`,
          method: "GET",
        };
      },
    }),

    templeCompleteCauses: builder.query({
      query: (args) => {
        return {
          url: `/suggest/complete/${args}`,
          method: "GET",
        };
      },
    }),

    deleteCause: builder.mutation({
      query: (id) => ({
        url: `/causes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Causes"],
    }),

    causeCategory: builder.query({
      query: () => {
        return {
          url: `/type`,
          method: "GET",
        };
      },
      providesTags: ["Category"],
    }),

    addCauseCategory: builder.mutation({
      query: (data) => {
        return {
          url: `/type`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Category"],
    }),

    deleteCauseCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/type/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Category"],
    }),

    allCausesForAdmin: builder.query({
      query: () => {
        return {
          url: `/suggest/admin/all`,
          method: "GET",
        };
      },
      providesTags: ["Causes"],
    }),

    updateSuggestCauses: builder.mutation({
      query: (arg) => {
        return {
          url: `/suggest/admin/update-price/${arg.id}`,
          method: "PUT",
          body: arg.data,
        };
      },
      invalidatesTags: ["Causes"],
    }),

    addLinksToSgussedCaues: builder.mutation({
      query: (arg) => {
        return {
          url: `/suggest/admin/add/link/${arg.id}`,
          method: "PUT",
          body: arg.data,
        };
      },
      invalidatesTags: ["Causes"],
    }),

    getAllDonation: builder.query({
      query: () => {
        return {
          url: `/donation/get-list-donation`,
          method: "GET",
        };
      },
      providesTags: ["Donation"],
    }),

    addProfOfDelivery: builder.mutation({
      query: (arg) => {
        return {
          url: `/donation/admin/add/prof/${arg.id}`,
          method: "POST",
          body: arg.data,
        };
      },
      invalidatesTags: ["Donation"],
    }),
  }),
});

export const {
  useGetAllCauseQuery,
  useGetSingleCauseQuery,
  useAddCauseMutation,
  useUpdateCauseMutation,
  useTempleFundingCausesQuery,
  useTempleCompleteCausesQuery,
  useDeleteCauseMutation,
  useCauseCategoryQuery,
  useDeleteCauseCategoryMutation,
  useAddCauseCategoryMutation,
  useAllCausesForAdminQuery,
  useUpdateSuggestCausesMutation,
  useAddLinksToSgussedCauesMutation,
  useGetAllDonationQuery,
  useAddProfOfDeliveryMutation,
} = causeApi;
