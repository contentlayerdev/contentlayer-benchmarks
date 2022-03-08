import fs from "fs";
import glob from "glob";
import path from "path";

/**
 * Creates a directory in which to add markdown files.
 */
export const initDir = (dir: string): string => {
  const destDir = path.resolve(dir);
  // Create directory if it doesn't exist.
  fs.mkdirSync(destDir, { recursive: true });
  // Remove any markdown files from the directory.
  glob.sync(`${destDir}/*.md`).map((f) => fs.unlinkSync(f));
  // Return the path to the directory.
  return destDir;
};

/**
 * Removes all markdown files from specified directory.
 */
export const cleanDir = (dir: string): string[] => {
  const files = glob.sync(`${dir}/*.md`);
  files.map((f) => fs.unlinkSync(f));
  return files;
};
