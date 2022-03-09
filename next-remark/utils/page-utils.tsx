import fs from "fs";
import glob from "glob";
import path from "path";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";

import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import type { Page } from "../types/Page";

export async function allPages(): Promise<Page[]> {
  const contentDir = path.join(process.cwd(), "../content");
  const contentFilePaths = glob.sync(path.join(contentDir, "**/*.md"));

  let pages = [];

  for (const filePath of contentFilePaths) {
    const rawContent = fs.readFileSync(filePath).toString();

    const { data, content } = matter(rawContent);

    const body = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(content);

    const relFilePath = filePath.replace(contentDir, "");
    const urlPath = relFilePath.replace(/\.md$/, "");

    pages.push({
      ...data,
      __metadata: {
        relFilePath,
        urlPath,
      },
      body: {
        raw: content,
        html: String(body),
      },
    });
  }

  return pages;
}

export async function allPagePaths(): Promise<string[]> {
  const pages = await allPages();
  return pages.map((page) => page.__metadata.urlPath);
}

export async function pageByUrlPath(urlPath: string): Promise<Page> {
  const pages = await allPages();
  return pages.find((page) => page.__metadata.urlPath === urlPath);
}
