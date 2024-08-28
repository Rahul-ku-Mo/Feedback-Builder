"use client";

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/lib/query-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useFormTitle = (id: string) => {
  return useMutation({
    mutationFn: async (value: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: value }),
        }
      );

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms", id],
      });

      toast.success("Form title updated successfully");
    },
  });
};

export const useFormUpdate = (id: string) => {
  return useMutation({
    mutationFn: async (value: any) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms", id],
      });

      toast.success("Form updated successfully");
    },
  });
};

export const usePublishForm = (id: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isPublished: true }),
        }
      );

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms", id],
      });

      toast.success("Form published successfully");
    },
  });
};

export const useFormCreate = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (value: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: value }),
      });

      const data = await response.json();

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });

      toast.success("Form created successfully");
      
      router.push(`/dashboard/${data.id}`);
    },
  });
};
