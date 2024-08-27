"use client";

import * as React from "react";
import Switch from "@mui/material/Switch";
import { useBlocksStore } from "@/providers/block-store-provider";

export default function ControlledSwitches({
  checked,
  handleChange,
  color = "primary",
}: {
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color?: string;
}) {
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
     
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
