"use client";

import { useEffect } from "react";
import { initSession } from "@/lib/session";

export default function SessionTracker() {
  useEffect(() => {
    initSession();
  }, []);

  return null;
}