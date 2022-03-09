import Head from "next/head";
import type { FC } from "react";

import type { Page } from "../types/Page";
import { pageByUrlPath, allPagePaths } from "../utils/page-utils";

export const getStaticPaths = async () => {
  const paths = await allPagePaths();
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const page = await pageByUrlPath(`/${params.id.join("/")}`);
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
