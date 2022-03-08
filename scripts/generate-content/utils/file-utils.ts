import fs from "fs";
import path from "path";

import { generateFile } from "./content-utils";

/**
 * Writes a file to the file system, after checking for a duplicate.
 */
export const writeFile = (dest: string, content: string) => {
  // Check for duplicates and re-run if one was found.
  if (fs.existsSync(dest)) {
    console.log(`Duplicate page for ${path.basename(dest)}. Regenerating ...`);
    return generateFile(path.dirname(dest));
  }
  // Otherwise, create the file.
  return fs.writeFileSync(dest, content);
};
