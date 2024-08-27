"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/lib/query-client";

export const useFormTitle = (id: string) => {
  return useMutation({
    mutationFn: async (value: string) => {
      const response = await fetch(`http://localhost:3000/api/forms/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: value }),
      });

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms", id],
      });
    },
  });
};

export const useFormUpdate = (id: string) => {
  return useMutation({
    mutationFn: async (value: any) => {
      const response = await fetch(`http://localhost:3000/api/forms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms", id],
      });
    },
  });
};

export const usePublishForm = (id: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/api/forms/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPublished: true }),
      });

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms", id],
      });
    },
  });
};

export const useFormCreate = () => {
  return useMutation({
    mutationFn: async (value: string) => {
      const response = await fetch(`http://localhost:3000/api/forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: value }),
      });

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
    },
  });
};
