import type { GatsbyNode } from "gatsby";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    actions.createTypes(`
    type MarkdownRemark implements Node @dontInfer {
      frontmatter: Frontmatter
      html: String!
    }
    type Frontmatter {
      title: String!
    }
  `);
  };
