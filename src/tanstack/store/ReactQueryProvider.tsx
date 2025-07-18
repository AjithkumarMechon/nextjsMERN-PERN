"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { InitQueryClient } from "@/tanstack/store/InitQueryClient";

const queryClient = new QueryClient();

const ReactQueryClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <InitQueryClient />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
export { queryClient };
