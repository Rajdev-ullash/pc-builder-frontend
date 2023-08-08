// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    //get category
    getCategories: builder.query({
      query: () => `/api/categories`,
      providesTags: ["category"],
    }),
  }),
});

export const { useGetCategoriesQuery } = api;
