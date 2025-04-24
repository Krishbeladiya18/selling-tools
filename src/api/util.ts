import { CONSTANTS } from "@/utils/constants";
import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

export const commonBaseQuery = (
  baseUrl: string = "",
  additionalHeaders: Record<string, string> = {}
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${backendUrl}/${baseUrl}`,
    prepareHeaders: (headers) => {
      Object.entries(additionalHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });

     
      const token = localStorage.getItem(CONSTANTS.AUTH_TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token.replace(/['"]+/g, '')}`);
      }
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    // Handle specific error cases
    switch ((result.error as any)?.status) {
      case 401:
        localStorage.removeItem(CONSTANTS.AUTH_TOKEN);
        location.replace("/");
        break;
    }

    return result;
  };
};
