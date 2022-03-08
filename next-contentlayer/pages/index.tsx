import type { FC } from "react";

import { allPages } from "contentlayer/generated";
import type { Page } from "contentlayer/generated";

export const getStaticProps = () => {
  return { props: { pages: allPages } };
};

const Page: FC<{ pages: Page[] }> = ({ pages }) => (
  <div>
    {pages.map((page) => (
      <a style={{ display: "block" }} key={page.url} href={page.url}>
        {page.title}
      </a>
    ))}
  </div>
);

export default Page;
