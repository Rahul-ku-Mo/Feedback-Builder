"use client";

import { Container, Typography, Box, AppBar } from "@mui/material";
import Link from "next/link";
import FeedbackFormModal from "./feedback/[feedbackId]/_components/feedback-form";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function Home() {
  const [open, setOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["formSubmit"],
    queryFn: async () => {
      const currentURL = window.location.href;
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/submit?specificURL=${encodeURIComponent(currentURL)}`
      );

      const data = await response.json();

      return data;
    },
  });

  useEffect(() => {
    if (data) {
      const feedbackShown = localStorage.getItem("feedbackShown");
      if (!feedbackShown) {
        setOpen(true);
      }
    }
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("feedbackShown", "true");
  };

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
      <main style={{ background: "transparent" }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "6rem",
                fontWeight: "bold",
                color: "primary.main",
                mt: 4,
              }}
            >
              Welcome to my website
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "500",
                color: "primary.main",
              }}
            >
              This is a Next.js website with TypeScript, ESLint, Prettier, and
              Material UI
            </Typography>
          </Box>
        </Container>
      </main>
      {data !== null && (
        <FeedbackFormModal
          open={open}
          handleClose={handleClose}
          formId={data?.id}
          formTitle={data?.title}
        />
      )}
    </>
  );
}
