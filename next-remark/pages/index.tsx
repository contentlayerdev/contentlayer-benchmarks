import type { FC } from "react";

import type { Page } from "../types/Page";

import { allPages } from "../utils/page-utils";

export const getStaticProps = async () => {
  const pages = await allPages();
  return { props: { pages } };
};

const Page: FC<{ pages: Page[] }> = ({ pages }) => (
  <div>
    {pages.map((page) => (
      <a
        style={{ display: "block" }}
        key={page.__metadata.urlPath}
        href={page.__metadata.urlPath}>
        {page.title}
      </a>
    ))}
  </div>
);

export default Page;
