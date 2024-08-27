import { FormStoreProvider } from "@/providers/form-store-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { AppBar } from "@mui/material";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppBar
          position="fixed"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            backgroundColor: "#ffff",
            color: "black",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <h3>User Feedback</h3>
          </Link>
        </AppBar>
        {children}
      </QueryClientProvider>
    </>
  );
}
