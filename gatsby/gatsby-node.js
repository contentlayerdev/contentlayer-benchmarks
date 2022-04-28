exports.createSchemaCustomization = ({ actions }) => {
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
