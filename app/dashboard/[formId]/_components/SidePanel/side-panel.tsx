"use client";

import {
  Stack,
  Typography,
  List,
  ListItemText,
  ListItem,
  Paper,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CategoryIcon from "@mui/icons-material/Category";
import EighteenUpRatingIcon from "@mui/icons-material/EighteenUpRating";
import ShortTextIcon from "@mui/icons-material/ShortText";
import AddIcon from "@mui/icons-material/Add";

import { customField } from "@/types";
import { useBlocksStore } from "@/providers/block-store-provider";
import LogicPanel from "./logic-pane";
import { ObjectKeyGenerator } from "@/lib/object-key-generator";

const CoreBlocks = [
  { id: 1, icon: <StarIcon />, name: "Star Rating", type: "starRating" },
  {
    id: 2,
    icon: <EmojiEmotionsIcon />,
    name: "Smile Rating",
    type: "smileyRating",
  },
  { id: 3, icon: <TextFieldsIcon />, name: "Text Area", type: "textArea" },
  {
    id: 4,
    icon: <RadioButtonCheckedIcon />,
    name: "Radio Buttons",
    type: "radioMultiSelect",
  },
  { id: 5, icon: <CategoryIcon />, name: "Categories", type: "category" },
  {
    id: 6,
    icon: <EighteenUpRatingIcon />,
    name: "Numerical Rating",
    type: "numericRating",
  },
  {
    id: 7,
    icon: <ShortTextIcon />,
    name: "Single Line Input",
    type: "singleLine",
  },
];

function SidePanel() {
  const { addBlocks } = useBlocksStore((state) => state);

  const handleAddField = (type: string) => {
    const newField: customField = {
      id: ObjectKeyGenerator()(),
      type,
      label: `Write your own Question`,
      required: false,
      errorMessage: "Please do not leave this field empty",
      options: ["radio 1", "radio 2", "radio 3"],
    };

    addBlocks(newField);
  };

  return (
    <Paper
      elevation={8}
      sx={{
        pt: 8,
        position: "fixed",
        right: 0,
        px: 4,
        width: 320,
        height: "100%",
        overflowY: "auto",
        pb: 4,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        Add fields
      </Typography>
      <List>
        {CoreBlocks.map((block: any) => (
          <ListItem
            key={block.id}
            draggable
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 0.5,
              cursor: "grab",
              borderRadius: 2,
              transition: "background 0.3s ease-in-out",
              ":hover": {
                background: "lightgray",
              },
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              {block.icon}
              <ListItemText primary={block.name} />
            </Stack>
            <AddIcon
              sx={{
                fontWeight: 800,
                fontSize: 26,
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                borderRadius: "9999px",
                p: "px",
                ":hover": {
                  background: "lightgray",
                  color: "blue",
                  transform: "scale(1.1)",
                },
              }}
              color="primary"
              onClick={() => handleAddField(block.type)}
            />
          </ListItem>
        ))}
      </List>
      <LogicPanel />
    </Paper>
  );
}

export default SidePanel;
