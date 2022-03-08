import Head from "next/head";
import type { FC } from "react";

import { allPages } from "contentlayer/generated";
import type { Page } from "contentlayer/generated";

export const getStaticPaths = () => {
  const paths = allPages.map((page) => page.url);
  return { paths, fallback: false };
};

export const getStaticProps = ({ params }) => {
  const page = allPages.find((page) => page.url === params.id.join("/"));
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
