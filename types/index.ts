export type customField = {
  id: string;
  type: any;
  label: string;
  value?: string;
  required?: boolean;
  errorMessage?: string;
  options?: string[];
};

export type fieldConfig = {
  id: string;
  label: string;
  required: boolean;
  errorMessage?: string;
};

export type formConfig = {
  id: string;
  title: string;
  fields: customField[];
  submissions?: number;
  views?: number;
  isPublished?: boolean;
  publishedAt?: Date;
  showOnSpecificURL: boolean;
  specificURL?: string;
  showOnSpecificTime: boolean;
  specificTime?: Date;
  showOnSpecificDate: boolean;
  specificDate?: Date;
};

export type OUTLINE = "ADDFIELD" | "EDITFIELD";
