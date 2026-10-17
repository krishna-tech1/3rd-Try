"use client";

import dynamic from "next/dynamic";

export const DynamicCanvas = dynamic(
  () => import("./SceneContainer").then((mod) => mod.SceneContainer),
  {
    ssr: false,
    loading: () => null,
  }
);
