import fs from "fs";
import glob from "glob";
import path from "path";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";

import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const contentDir = path.join(process.cwd(), "../content");
const contentFilePaths = glob.sync(path.join(contentDir, "**/*.md"));

let contentCache = [];

for (let filePath of contentFilePaths) {
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

  contentCache.push({
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

const cacheFilePath = path.join(process.cwd(), ".content-cache.json");
fs.writeFileSync(cacheFilePath, JSON.stringify(contentCache, null, 2));

export default {};
