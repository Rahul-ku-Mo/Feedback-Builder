"use client";
import { useState } from "react";

import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { FormHelperText } from "@mui/material";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const SmileyRatingBlock = ({
  required,
  errorMessage,
  value,
  onChange,
}: {
  required: boolean;
  errorMessage: string;
  value: any;
  onChange: (value: any) => void;
}) => {
  const [rating, setRating] = useState<number | null>(value);

  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setRating(newValue);
    onChange(newValue);
  };

  return (
    <>
      <StyledRating
        name="highlight-selected-only"
        value={rating}
        onChange={handleRatingChange}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
        size="large"
      />
      {required && rating === null && (
        <FormHelperText
          error={required && rating === null}
          sx={{
            mx: 0,
            color: "red",
          }}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </>
  );
};

export default SmileyRatingBlock;