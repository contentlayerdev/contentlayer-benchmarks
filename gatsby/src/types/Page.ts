export type PageFrontmatter = {
  title: string;
};

export type Page = {
  frontmatter: PageFrontmatter;
  html: string;
  fields: {
    url: string;
  };
};
