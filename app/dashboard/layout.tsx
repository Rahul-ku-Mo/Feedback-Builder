import { FormStoreProvider } from "@/providers/form-store-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
             <FormStoreProvider>{children}</FormStoreProvider>

    </>
  );
}
