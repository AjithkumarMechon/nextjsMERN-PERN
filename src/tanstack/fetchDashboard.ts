import { HTTP } from "@/utils/http";
import { useMutation, useQuery } from "@tanstack/react-query";

//GET for selected show
export const useDashboard = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await HTTP.doGet("/api/dashboard");
        return response.data;
      } catch (error) {
        throw new Error((error as Error)?.message);
      }
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};

// POST, PUT and DELETE we use useMutation
export const useCreateDashboard = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await HTTP.doPost("/api/dashboard", payload);
      return response.data;
    },
    onError: (error: any) => {
      console.error("Create dashboard failed:", error?.message);
    },
    onSuccess: (data) => {
      console.log("Dashboard created successfully:", data);
      // Optionally refetch related queries or show a toast here
    },
  });
};
