"use client";

import { useState, useEffect } from "react";

export default function Loading() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(true);
      }, 1000);

      return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;


    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h1>Loading...</h1>
      </div>
    );
  }