import path from "path";

export type TestConfigItem = {
  /**
   * Name to report in the results table.
   */
  name: string;
  /**
   * Absolute path to the project directory.
   */
  path: string;
  /**
   * Array of directories (from the project's root path) that should be
   * destroyed before cold builds.
   */
  cache: string[];
};

export type TestConfig = {
  /**
   * The number of times to run each build. Reported score is the average value.
   */
  runs: number;
  /**
   * Configuration for each individual test.
   */
  tests: TestConfigItem[];
};

export function testsConfig(rootDir: string): TestConfig {
  return {
    runs: 5,
    tests: [
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
    ],
  };
}
