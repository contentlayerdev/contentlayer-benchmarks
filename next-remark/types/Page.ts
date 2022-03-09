export type PageFrontmatter = {
  title: string;
};

export type Page = PageFrontmatter & {
  urlPath: string;
  body: {
    raw: string;
    html: string;
  };
};
