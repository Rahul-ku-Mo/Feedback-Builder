"use client";

import {
  FormControlLabel,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ControlledSwitches from "../blocks/shared/switch-custom-btn";
import { useBlocksStore } from "@/providers/block-store-provider";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const LogicPanel = () => {
  const { changeLogic } = useBlocksStore((state) => state);

  const formId = useParams().formId as string;

  const { data, isPending } = useQuery({
    queryKey: ["form", "logicDetails", formId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/logic`
      );

      const data = await response.json();

      return data;
    },
  });

  const [showOnSpecificURL, setShowOnSpecificURL] = useState(false);
  const [showOnSpecificDate, setShowOnSpecificDate] = useState(false);
  const [showOnSpecificTime, setShowOnSpecificTime] = useState(false);

  const [specificURL, setSpecificURL] = useState("");
  const [specificDate, setSpecificDate] = useState("");
  const [specificTime, setSpecificTime] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (data) {
      setShowOnSpecificURL(data.showOnSpecificURL || false);
      setShowOnSpecificDate(data.showOnSpecificDate || false);
      setShowOnSpecificTime(data.showOnSpecificTime || false);

      setSpecificURL(data.specificURL || "");
      setSpecificDate(
        data.specificDate
          ? new Date(data.specificDate).toISOString().split("T")[0]
          : ""
      );
      setSpecificTime(
        data.specificTime ? dayjs(data.specificTime).utc() : null
      );
    }
  }, [data]);

  const handleShowOnSpecificURL = () => {
    const newValue = !showOnSpecificURL;
    setShowOnSpecificURL(newValue);
    changeLogic({ showOnSpecificURL: newValue });
  };

  const handleShowOnSpecificDate = () => {
    const newValue = !showOnSpecificDate;
    setShowOnSpecificDate(newValue);
    changeLogic({ showOnSpecificDate: newValue });
  };

  const handleShowOnSpecificTime = () => {
    const newValue = !showOnSpecificTime;
    setShowOnSpecificTime(newValue);
    changeLogic({ showOnSpecificTime: newValue });
  };

  const handleSpecificURL = (e: any) => {
    const newValue = e.target.value;
    setSpecificURL(newValue);
    changeLogic({ specificURL: newValue });
  };

  const handleSpecificDate = (e: any) => {
    const newValue = e.target.value;
    setSpecificDate(newValue);
    changeLogic({ specificDate: newValue });
  };

  const handleSpecificTime = (newValue: any) => {
    setSpecificTime(newValue);
    changeLogic({ specificTime: newValue });
  };

  return (
    <Stack spacing={1}>
      <Typography
        variant="h6"
        sx={{
          fontWeidht: 700,
          fontSize: "14",
          letterSpacing: "-0.2px",
        }}
      >
        Add Logic
      </Typography>
      {isPending ? (
        <Skeleton variant="rectangular" height={40} />
      ) : (
        <>
          <FormControlLabel
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            value="start"
            control={
              <ControlledSwitches
                checked={showOnSpecificURL}
                handleChange={handleShowOnSpecificURL}
              />
            }
            label="Show on URL conditions"
            labelPlacement="start"
          />
          {showOnSpecificURL && (
            <TextField
              id="url-condition"
              type="text"
              value={specificURL}
              onChange={handleSpecificURL}
              placeholder="Enter URL"
              variant="standard"
            />
          )}
          <FormControlLabel
            sx={{
              display: "flex",
              justifyContent: "space-between !important",
            }}
            value="start"
            control={
              <ControlledSwitches
                checked={showOnSpecificDate}
                handleChange={handleShowOnSpecificDate}
              />
            }
            label="Show on a specific date"
            labelPlacement="start"
          />
          {showOnSpecificDate && (
            <TextField
              id="date-picker"
              label="Start date"
              value={specificDate}
              onChange={handleSpecificDate}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
          <FormControlLabel
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            value="start"
            control={
              <ControlledSwitches
                checked={showOnSpecificTime}
                handleChange={handleShowOnSpecificTime}
              />
            }
            label="Show on a specific time"
            labelPlacement="start"
          />
          {showOnSpecificTime && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Select Time"
                value={specificTime}
                onChange={handleSpecificTime}
              />
            </LocalizationProvider>
          )}
        </>
      )}
    </Stack>
  );
};

export default LogicPanel;
