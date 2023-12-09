"use client";

import { useUIStore } from "@/store";

export const MenuButton = () => {
  const openSideMenu = useUIStore(state => state.openSideMenu)

  const handleOpenSideMenu = () => {
    openSideMenu()
  }

  return (
    <button
      className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
      onClick={handleOpenSideMenu}
    >
      Menú
    </button>
  );
};
