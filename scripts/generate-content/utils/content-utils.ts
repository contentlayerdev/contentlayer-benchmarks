import path from "path";
import { LoremIpsum } from "lorem-ipsum";

import { writeFile } from "./file-utils";

/**
 * Convert a title to a filename-friendly slug.
 */
export const generateSlug = (title: string): string => {
  return title.toLowerCase().replace(/\ /gi, "-");
};

/**
 * Formats a title into frontmatter and a body in the main content area,
 * preparing it for use in a markdown file.
 */
export const formatMarkdown = (title: string, body: string): string => {
  return `
---
title: ${title}
---

${body}
  `.trim();
};

/**
 * Generates a markdown file from random content.
 */
export const generateFile = (dest: string) => {
  const lorem = new LoremIpsum();
  const title = lorem.generateWords(5);
  const body = lorem.generateParagraphs(3).replace(/\n/gi, "\n\n");
  const content = formatMarkdown(title, body);
  const outputFile = path.join(dest, `${generateSlug(title)}.md`);
  writeFile(outputFile, content);
  return outputFile;
};
