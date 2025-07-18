import { HTTP } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";

// GET productsList
export const useProductsList = () => {
  return useQuery({
    queryKey: ["productsList"],
    queryFn: async () => {
      try {
        const response = await HTTP.doGet("/api/productsList");
        return response.data;
      } catch (error) {
        throw new Error((error as Error)?.message);
      }
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};

//GET for selected show
export const usefetchSelectedProduct = (payload: string) => {
  return useQuery({
    queryKey: ["selectedProduct", payload],
    queryFn: async ({ queryKey }) => {
      const [_key, showId] = queryKey;
      try {
        const responseData = await HTTP.doGet(`/api/selectedProduct/${showId}`);
        return responseData.data;
      } catch (error: any) {
        throw new Error(error?.message || "Failed to fetch show");
      }
    },
    enabled: !!payload, // optional: only run when payload is truthy
  });
};
