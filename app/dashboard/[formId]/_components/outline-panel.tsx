"use client";

import { useBlocksStore } from "@/providers/block-store-provider";
import SidePanel from "./SidePanel/side-panel";
import EditFieldPanel from "./SidePanel/edit-field-panel";

const OutlinePanel = () => {
  const { selectedBlock } = useBlocksStore((state) => state);
  

  return (
    <aside>
      {selectedBlock === null ? (
        <SidePanel />
      ) : (
        <EditFieldPanel key={selectedBlock.id} />
      )}
    </aside>
  );
};

export default OutlinePanel;
