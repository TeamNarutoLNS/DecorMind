"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function GenerateButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/generated")}>
      Generate
    </Button>
  );
}
