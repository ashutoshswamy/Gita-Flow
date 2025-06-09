"use client";

import { useState, useEffect, type ReactElement } from "react";

export default function CurrentYear(): ReactElement | null {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // Set the year only on the client-side after hydration
    setYear(new Date().getFullYear());
  }, []);

  if (year === null) {
    // Render nothing on the server and on the initial client render for this dynamic part
    // This ensures the server and client initial HTML match for this slot.
    // The year will be filled in after client-side hydration and effect execution.
    return null;
  }

  return <>{year}</>;
}
