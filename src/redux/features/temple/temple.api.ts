import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/types/globalType";

const templeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTemple: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/temples",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Temple"],
    }),

    addTemple: builder.mutation({
      query: (data) => ({
        url: `/temples`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Temple"],
    }),

    getSingleTemple: builder.query({
      query: (args) => ({
        url: `/temples/${args}`,
        method: "GET",
      }),
      providesTags: ["Temple"],
    }),

    updateTemple: builder.mutation({
      query: (args) => ({
        url: `/temples/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["Temple"],
    }),

    deleteTemple: builder.mutation({
      query: (id) => ({
        url: `/temples/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Temple"],
    }),
  }),
});

export const {
  useGetAllTempleQuery,
  useAddTempleMutation,
  useGetSingleTempleQuery,
  useUpdateTempleMutation,
  useDeleteTempleMutation,
} = templeApi;
