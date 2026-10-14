"use client";

import type { LightNeed } from "@/lib/garden/types";

export type PlantAiResult =
  | { cutoutUrl: string | null }
  | { images: string[] }
  | {
      species: string;
      latinName: string;
      nickname: string;
      waterIntervalDays: number;
      fertilizeIntervalDays: number;
      lightNeed: LightNeed;
      tempRange: string;
    };

const DEMO_PLANTS = [
  {
    image: "/plants/cell-1.png",
    species: "龟背竹",
    latinName: "Monstera deliciosa",
    nickname: "小龟背",
    waterIntervalDays: 7,
    fertilizeIntervalDays: 30,
    lightNeed: "indirect" as const,
    tempRange: "18–28°C",
  },
  {
    image: "/plants/cell-2.png",
    species: "薄荷",
    latinName: "Mentha spicata",
    nickname: "小薄荷",
    waterIntervalDays: 3,
    fertilizeIntervalDays: 30,
    lightNeed: "full" as const,
    tempRange: "15–25°C",
  },
  {
    image: "/plants/cell-3.png",
    species: "迷迭香",
    latinName: "Salvia rosmarinus",
    nickname: "迷迭香",
    waterIntervalDays: 6,
    fertilizeIntervalDays: 35,
    lightNeed: "full" as const,
    tempRange: "15–28°C",
  },
  {
    image: "/plants/cell-4.png",
    species: "玉露",
    latinName: "Haworthia cooperi",
    nickname: "小玉露",
    waterIntervalDays: 12,
    fertilizeIntervalDays: 45,
    lightNeed: "indirect" as const,
    tempRange: "12–26°C",
  },
] satisfies Array<{
  image: string;
  species: string;
  latinName: string;
  nickname: string;
  waterIntervalDays: number;
  fertilizeIntervalDays: number;
  lightNeed: LightNeed;
  tempRange: string;
}>;

function hash(value: string) {
  let result = 0;
  const step = Math.max(1, Math.floor(value.length / 97));
  for (let index = 0; index < value.length; index += step) {
    result = (result * 31 + value.charCodeAt(index)) >>> 0;
  }
  return result;
}

function wait(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

/**
 * Frontend-only demo of the original AI workflow. No request leaves the
 * browser: identification is deterministic and illustrations are bundled.
 */
export async function runPlantAi(
  photoUrl: string,
  step: "cutout" | "identify" | "illustrate",
  count = 3,
): Promise<PlantAiResult> {
  await wait(step === "cutout" ? 320 : 760);
  const selected = hash(photoUrl) % DEMO_PLANTS.length;

  if (step === "cutout") return { cutoutUrl: photoUrl };
  if (step === "identify") {
    const { image: _image, ...identification } = DEMO_PLANTS[selected];
    void _image;
    return identification;
  }

  const images = Array.from(
    { length: Math.min(Math.max(count, 1), DEMO_PLANTS.length) },
    (_, offset) => DEMO_PLANTS[(selected + offset) % DEMO_PLANTS.length].image,
  );
  return { images };
}

export async function uploadPlantPhoto(file: File): Promise<{ key: string; url: string }> {
  const url = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("photo_read_failed"));
    reader.readAsDataURL(file);
  });
  return { key: `local/${file.name}`, url };
}
