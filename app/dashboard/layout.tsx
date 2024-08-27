import { FormStoreProvider } from "@/providers/form-store-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FormStoreProvider>{children}</FormStoreProvider>
      </QueryClientProvider>
    </>
  );
}
