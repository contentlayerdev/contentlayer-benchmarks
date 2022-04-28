# Contentlayer Build Benchmarks

This is a basic benchmarking tool that measures build performance of various front-end frameworks.

## ✔️ Subject Conditions

The content source for each project being tested are 1k local markdown files containing frontmatter with a `title` property, and four paragraphs of placeholder content.

The content files are generated randomly at the beginning of test runs, and all test subjects use the same files during the run.

The content within each site is nearly identical. There is a home page that lists every content item in the site, and individual pages for each item, totalling 1,001 pages.

Each subject is tested twice — first after deleting all relevant cache directories (cold), and then a second time with the build artifacts in place (warm). Before the warm build runs, we add an extra page to the content directory. This page is similar in structure and is always the same. It is used to simulate a slight change in content without removing the cache.

## 📋 Project List

This is the current list of subjects:

- Next.js (v12.1.0) + Contentlayer (v0.1.2)
- Next.js (v12.1.0) + Remark (v13.0.0)
- Gatsby (v4.9.2) + gatsby-transformer-remark (v5.9.0)

## 🏎 Test Runner

The tests are run as a GitHub action. Results are logged in the output of the workflow on GitHub.

### Running Locally

To run the project locally, install the dependencies using Yarn:

    yarn install

There is a shell script that handles running the tests: `bin/run.sh`. You can run this directly and the results will be printed to your console.

## 🥇 Latest results (see [action run](https://github.com/contentlayerdev/contentlayer-benchmarks/runs/6215848133?check_suite_focus=true#step:5:274))

```
┌────────────────────────┬────────────┬────────────┐
│                        │ Cold (sec) │ Warm (sec) │
├────────────────────────┼────────────┼────────────┤
│ Next.js + Contentlayer │ 28.72      │ 18.93      │
├────────────────────────┼────────────┼────────────┤
│ Next.js + Remark       │ 45.47      │ 39.00      │
├────────────────────────┼────────────┼────────────┤
│ Gatsby                 │ 40.08      │ 16.74      │
└────────────────────────┴────────────┴────────────┘
```
