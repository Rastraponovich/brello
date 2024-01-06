import { createEffect } from "effector";

import { client } from "../client";

export const uploadFileFx = createEffect<{ file: File }, string>(async ({ file }) => {
  const fileName = await calculateFileHash(file);

  const { data, error } = await client.storage
    .from("avatars")
    .upload(fileName, file, { upsert: true });

  if (error !== null) {
    throw error.message;
  }

  return data.path;
});

async function calculateFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");

  return hashHex;
}
