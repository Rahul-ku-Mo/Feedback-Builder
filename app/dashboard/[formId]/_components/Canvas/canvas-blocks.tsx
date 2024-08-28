"use client";

import TextAreaBlock from "../blocks/text-area";
import NumericRatingBlock from "../blocks/numeric-rating";
import StarRatingBlock from "../blocks/star-rating";
import SmileyRatingBlock from "../blocks/smiley-rating";
import SingleLineBlock from "../blocks/single-line";
import RadioMultiSelectBlock from "../blocks/radio-group";
import CategoryBlock from "../blocks/categories";

import BlockWrapper from "../blocks/block-wrapper";
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useBlocksStore } from "@/providers/block-store-provider";

export const blockTypeMap: { [key: string]: React.ComponentType<any> } = {
  textArea: TextAreaBlock,
  numericRating: NumericRatingBlock,
  starRating: StarRatingBlock,
  smileyRating: SmileyRatingBlock,
  singleLine: SingleLineBlock,
  radioMultiSelect: RadioMultiSelectBlock,
  category: CategoryBlock,
};

const CanvasBlocks = () => {
  const { formId } = useParams();

  const { blocks, setBlocks } = useBlocksStore((state) => state);

  const { data, isPending } = useQuery({
    queryKey: ["blocks", formId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/fields`
      );

      const data = await response.json();

      setBlocks(data);

      return data;
    },
  });

  return (
    <>
      {blocks?.length !== 0 ? (
        <>
          {blocks?.map((block: any) => {
            const Block = blockTypeMap[block.type];
            return (
              <BlockWrapper key={block.id} id={block.id} label={block.label}>
                <Block
                  value={block.value}
                  required={block.required}
                  errorMessage={block.errorMessage}
                  options={block.options}
                />
              </BlockWrapper>
            );
          })}
        </>
      ) : (
        <Typography
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
          }}
          variant="h4"
        >
          Add Fields
        </Typography>
      )}
    </>
  );
};

export default CanvasBlocks;
