import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { BlocksStoreProvider } from "@/providers/block-store-provider";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feedback Builder",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <BlocksStoreProvider>
        <html lang="en">
          <body className={inter.className}>
            {children} 
            <Toaster />
          </body>
        </html>
      </BlocksStoreProvider>
    </QueryClientProvider>
  );
}
