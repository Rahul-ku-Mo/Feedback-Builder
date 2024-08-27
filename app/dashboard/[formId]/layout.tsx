import { BlocksStoreProvider } from "@/providers/block-store-provider";
import { AppBar, Box, Button } from "@mui/material";
import { PublishButton, SaveButton } from "./_components/Appbar/action-button";
import CustomAppBar from "./_components/Appbar/app-bar";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { formId: string };
}) {
  return (
    <>
      <BlocksStoreProvider>
        <CustomAppBar formId={params.formId} />
        {children}
      </BlocksStoreProvider>
    </>
  );
}
