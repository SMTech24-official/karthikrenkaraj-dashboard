import baseApi from "@/redux/api/baseApi";

const causeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyDonetion: builder.query({
      query: (id) => {
        return {
          url: `/donation/admin/${id}`,
          method: "GET",
        };
      },
      // providesTags: ["Causes"],
    }),
  }),
});

export const { useGetMyDonetionQuery } = causeApi;
