#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const rootDir = process.cwd();
const distRoot = resolve(rootDir, "dist");
const outputDir = join(distRoot, "luatools");
const outputZip = join(distRoot, "luatools.zip");
const zipRequested = process.argv.includes("--zip");

const includePaths = ["plugin.json", "backend", "public"];

function prepareOutputDir() {
  rmSync(outputDir, { recursive: true, force: true });
  mkdirSync(outputDir, { recursive: true });
}

function copyPluginFiles() {
  for (const relativePath of includePaths) {
    const sourcePath = join(rootDir, relativePath);
    const destinationPath = join(outputDir, relativePath);

    if (!existsSync(sourcePath)) {
      throw new Error(`Missing required path: ${relativePath}`);
    }

    cpSync(sourcePath, destinationPath, { recursive: true, force: true });
  }
}

function createZip() {
  if (process.platform !== "win32") {
    throw new Error(
      "Zip generation is supported only on Windows in this script.",
    );
  }

  const psCommand = `Compress-Archive -Path '${outputDir}\\*' -DestinationPath '${outputZip}' -Force`;
  execFileSync("powershell", ["-NoProfile", "-Command", psCommand], {
    stdio: "inherit",
  });
}

prepareOutputDir();
copyPluginFiles();

if (zipRequested) {
  createZip();
  console.log(`Created zip: ${outputZip}`);
} else {
  console.log(`Build ready at: ${outputDir}`);
}
