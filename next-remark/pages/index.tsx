import type { FC } from "react";

import type { Page } from "../types/Page";
import contentCache from "../.content-cache.json";

const allPages = contentCache as Page[];

export const getStaticProps = () => {
  return { props: { pages: allPages } };
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
