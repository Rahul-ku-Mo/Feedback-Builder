import { customField } from "@/types";
import { createStore } from "zustand/vanilla";
import { Dayjs } from "dayjs";

export type BlocksState = {
  blocks: any[];
  selectedBlock: customField | null;
  logic: {
    showOnSpecificURL: boolean;
    specificURL?: string;
    showOnSpecificTime: boolean;
    specificTime?: Dayjs;
    showOnSpecificDate: boolean;
    specificDate?: Date;
  };
};

export type BlocksActions = {
  addBlocks: (field: customField) => void;
  editBlocks: (field: any) => void;
  setBlocks: (blocks: any) => void;
  deleteBlock: (id: string) => void;
  selectBlock: (id: string) => void;
  changeLogic: (newLogic: Partial<BlocksState["logic"]>) => void;
};

export type BlocksStore = BlocksState & BlocksActions;

export const defaultInitState: BlocksState = {
  blocks: [],
  selectedBlock: null,
  logic: {
    showOnSpecificURL: false,
    specificURL: undefined,
    showOnSpecificTime: false,
    specificTime: undefined,
    showOnSpecificDate: false,
    specificDate: undefined,
  },
};

export const createBlocksStore = (
  initState: BlocksState = defaultInitState
) => {
  return createStore<BlocksStore>()((set) => ({
    ...initState,
    addBlocks: (field) =>
      set((state) => ({ blocks: [...state.blocks, field] })),
    setBlocks: (blocks) => set({ blocks }),
    deleteBlock: (id) =>
      set((state) => ({
        blocks: state.blocks.filter((block) => block.id !== id),
      })),
    selectBlock: (id) =>
      set((state) => ({
        selectedBlock: state.blocks.find((block) => block.id === id) || null,
      })),
    editBlocks: (field) =>
      set((state) => ({
        blocks: state.blocks.map((block) =>
          block.id === field.id ? field : block
        ),
      })),
    changeLogic: (newLogic) =>
      set((state) => ({
        logic: { ...state.logic, ...newLogic },
      })),
  }));
};
