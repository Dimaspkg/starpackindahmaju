"use client";

import React, { createContext, useContext, useState } from "react";

interface UIContextType {
  isNotFound: boolean;
  setIsNotFound: (value: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNotFound, setIsNotFound] = useState(false);

  return (
    <UIContext.Provider value={{ isNotFound, setIsNotFound }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
