import React from "react";
import { AppBar, Container } from "@mui/material";
import Link from "next/link";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Container
          sx={{
            py: 2,
            backgroundColor: "#f5f5f5", // Light background color for the container
            borderRadius: 2, // Rounded corners
            boxShadow: 3,
          }}
        >
          <AppBar
            position="static"
            sx={{
              background: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexDirection: "row",
              alignItems: "center",
              padding: 1, // Padding inside the AppBar
              boxShadow: "none", // Remove default AppBar shadow
            }}
          >
            <Link href="/" style={{ color: "#333", textDecoration: "none" }}>
              Home
            </Link>
            <Link
              href="/about"
              style={{ color: "#333", textDecoration: "none" }}
            >
              About
            </Link>
            <Link
              href="/team"
              style={{ color: "#333", textDecoration: "none" }}
            >
              Team
            </Link>
            <Link
              href="/dashboard"
              style={{ color: "#333", textDecoration: "none" }}
            >
              Dashboard
            </Link>
          </AppBar>
        </Container>
      </header>
      {children}
    </>
  );
}
