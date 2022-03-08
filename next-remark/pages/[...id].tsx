import Head from "next/head";
import type { FC } from "react";

import type { Page } from "../types/Page";
import contentCache from "../.content-cache.json";

const allPages = contentCache as Page[];

export const getStaticPaths = () => {
  const paths = allPages.map((page) => page.__metadata.urlPath);
  return { paths, fallback: false };
};

export const getStaticProps = ({ params }) => {
  const currentPath = `/${params.id.join("/")}`;
  const page = allPages.find((page) => page.__metadata.urlPath === currentPath);
  return { props: { page } };
};

const Page: FC<{ page: Page }> = ({ page }) => (
  <>
    <Head>
      <title>{page.title}</title>
    </Head>
    <h1>{page.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: page.body.html }} />
  </>
);

export default Page;
