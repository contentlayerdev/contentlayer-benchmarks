import * as React from "react";
import { graphql, PageProps } from "gatsby";

import type { Page } from "../types/Page";

type RemarkNode = { node: Page };

type DataProps = {
  allMarkdownRemark: {
    edges: RemarkNode[];
  };
};

const IndexPage = ({ data }: PageProps<DataProps>) => {
  const pages = data.allMarkdownRemark.edges.map((_: any) => _.node);

  return (
    <div>
      {pages.map((page) => (
        <a
          style={{ display: "block" }}
          key={page.fields.url}
          href={page.fields.url}>
          {page.frontmatter.title}
        </a>
      ))}
    </div>
  );
};

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            url
          }
        }
      }
    }
  }
`;

export default IndexPage;
