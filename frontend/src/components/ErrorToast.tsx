// components/ErrorToast.tsx
"use client"
import { useEffect } from "react";
import { toast } from "sonner";

export default function ErrorToast({ message }: { message: string | null }) {
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);
  //renders nothing visible, just a side-effect trigger
  return null; 
}