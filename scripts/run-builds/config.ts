import path from "path";

export type TestConfigItem = {
  name: string;
  path: string;
  cache: string[];
};

export type TestConfig = TestConfigItem[];

export function testsConfig(rootDir: string): TestConfig {
  return [
    {
      name: "Next.js + Contentlayer",
      path: path.join(rootDir, "next-contentlayer"),
      cache: [".next", ".contentlayer"],
    },
    {
      name: "Next.js + Remark",
      path: path.join(rootDir, "next-remark"),
      cache: [".next"],
    },
    {
      name: "Gatsby",
      path: path.join(rootDir, "gatsby"),
      cache: [".cache", "public"],
    },
    {
      name: "Gatsby Test",
      path: path.join(rootDir, "gatsby-test"),
      cache: [".cache", "public"],
    },
  ];
}
