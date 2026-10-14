import { Suspense } from "react";
import { PlantDetailClient } from "./plant-detail-client";

export default function PlantDetailPage() {
  return (
    <Suspense fallback={null}>
      <PlantDetailClient />
    </Suspense>
  );
}
