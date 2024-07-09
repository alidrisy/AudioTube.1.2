/* eslint-disable react/prop-types */
"use client";

import { useState } from "react";
import { Drawer } from "vaul";

export function MyDrawer({ children,  }) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open}>
      <Drawer.Portal>
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
          { children }
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
