"use client";

import {
  usePublishForm,
  useFormUpdate,
} from "@/app/dashboard/hooks/useFormActions";
import { useBlocksStore } from "@/providers/block-store-provider";
import { Button } from "@mui/material";

export const SaveButton = ({ form }: { form: any }) => {
  const { blocks, logic } = useBlocksStore((state) => state);

  const saveForm = useFormUpdate(form.id);

  const updateFormFields = (form: any) => {
    form.fields = blocks;
    form.showOnSpecificURL = logic.showOnSpecificURL;
    form.showOnSpecificDate = logic.showOnSpecificDate;
    form.showOnSpecificTime = logic.showOnSpecificTime;
    form.specificURL = logic.specificURL;
    form.specificDate = logic.specificDate;
    form.specificTime = logic.specificTime;
  };

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ textTransform: "uppercase" }}
      onClick={() => {
        updateFormFields(form);
        console.log(form);
        saveForm.mutate(form);
      }}
      disabled={blocks.length === 0 || blocks.length > 7}
    >
      Save
    </Button>
  );
};

export const PublishButton = ({
  isPublished,
  formId,
}: {
  isPublished: boolean;
  formId: string;
}) => {
  const publishForm = usePublishForm(formId);
  const { blocks } = useBlocksStore((state) => state);

  return (
    <>
      {!isPublished && (
        <Button
          variant="contained"
          disabled={blocks.length === 0 || blocks.length > 7}
          color="success"
          sx={{ textTransform: "uppercase" }}
          onClick={() => {
            if (blocks.length === 0 || blocks.length > 7) {
              return;
            }

            publishForm.mutate();
          }}
        >
          Publish
        </Button>
      )}
    </>
  );
};
