"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export function useApi<T = unknown>(path: string): UseQueryResult<T, Error> {
  return useQuery<T, Error>({
    queryKey: [path],
    queryFn: async () => {
      const { data } = await axiosInstance.get<T>(path);
      return data;
    }
  });
}
