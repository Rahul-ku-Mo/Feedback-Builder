"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type BlocksStore,
  createBlocksStore,
  defaultInitState,
} from "@/stores/block-store";

export type BlocksStoreApi = ReturnType<typeof createBlocksStore>;

export const BlocksStoreContext = createContext<BlocksStoreApi | undefined>(
  undefined
);

export interface BlocksStoreProviderProps {
  children: ReactNode;
}

export const BlocksStoreProvider = ({ children }: BlocksStoreProviderProps) => {
  const storeRef = useRef<BlocksStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createBlocksStore(defaultInitState);
  }

  return (
    <BlocksStoreContext.Provider value={storeRef.current}>
      {children}
    </BlocksStoreContext.Provider>
  );
};

export const useBlocksStore = <T,>(selector: (store: BlocksStore) => T): T => {
  const blocksStoreContext = useContext(BlocksStoreContext);

  if (!blocksStoreContext) {
    throw new Error(`useBlocksStore must be used within BlocksStoreProvider`);
  }

  return useStore(blocksStoreContext, selector);
};
