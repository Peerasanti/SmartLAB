"use client";

import { createContext, useContext, useState } from "react";

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  return (
    <TransitionContext.Provider value={{ clickPosition, setClickPosition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}