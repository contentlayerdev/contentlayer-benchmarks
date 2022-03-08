export type PageMetadata = {
  relFilePath: string;
  urlPath: string;
};

export type ParsedMarkdown = {
  raw: string;
  html: string;
};

export type Page = {
  title: string;
  __metadata: PageMetadata;
  body: ParsedMarkdown;
};
