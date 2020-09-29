import { cache, resolve } from "./cache.ts";
import { assertEquals } from "https://deno.land/std@0.70.0/testing/asserts.ts";
import * as path from "https://deno.land/std@0.70.0/path/mod.ts";
import * as fs from "https://deno.land/std@0.70.0/fs/mod.ts";

Deno.test("cache resolve", async () => {
  const input = "https://deno.land/std@0.70.0/path/mod.ts";
  assertEquals(
    path.basename(resolve(input)),
    "19b929fe073c70f585b972cd5ad329ef4ffc4c961a57078c1dbd484c40959364",
  );
});

Deno.test("cache cache", async () => {
  const input =
    "https://raw.githubusercontent.com/timreichen/Bundler/master/_helpers.ts";
  const cachePath = resolve(input);
  if (fs.existsSync(cachePath)) {
    Deno.removeSync(cachePath);
  }
  await cache(input);

  assertEquals(fs.existsSync(cachePath), true);
});