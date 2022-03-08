import * as React from "react";
import { graphql } from "gatsby";

type ContextProps = {
  title: string;
  html: string;
};

const PageLayout = ({ pageContext }: { pageContext: ContextProps }) => {
  const { title, html } = pageContext;

  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
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

export default PageLayout;
