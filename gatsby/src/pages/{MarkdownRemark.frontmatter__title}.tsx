import * as React from "react";
import { graphql, PageProps } from "gatsby";

type ContextProps = {
  markdownRemark: {
    frontmatter: {
      title: string;
    };
    html: string;
  };
};

const PageLayout = ({ data }: PageProps<ContextProps>) => {
  const title = data.markdownRemark.frontmatter.title;
  const html = data.markdownRemark.html;
  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export const query = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      html
    }
  }
`;

export default PageLayout;
