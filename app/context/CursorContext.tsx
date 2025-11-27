"use client";
import React, { createContext, useContext, useState } from "react";

type CursorType = "default" | "hover" | "text";

interface CursorContextProps {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}

const CursorContext = createContext<CursorContextProps>({
  cursorType: "default",
  setCursorType: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursorType, setCursorType] = useState<CursorType>("default");

  return (
    <CursorContext.Provider value={{ cursorType, setCursorType }}>
      {children}
    </CursorContext.Provider>
  );
};