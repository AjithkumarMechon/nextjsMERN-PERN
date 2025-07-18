// components/InitQueryClient.tsx
"use client";

import { useEffect } from "react";
import { queryClient } from "@/tanstack/store/ReactQueryProvider";

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__?: typeof queryClient;
  }
}

export function InitQueryClient() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__TANSTACK_QUERY_CLIENT__ = queryClient;
    }
  }, []);

  return null;
}
