"use client";

import { useMutation } from "@tanstack/react-query";

export const useFormSubmit = (formId: string) => {
  return useMutation({
    mutationFn: async (value: any) => {
      const response = await fetch(
        `http://localhost:3000/api/submissions/${formId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );

      const data = await response.json();

      return data;
    },
  });
};

export const useFormView = (formId: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/forms/${formId}?views=true`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const data = await response.json();

      return data;
    },
  });
};
