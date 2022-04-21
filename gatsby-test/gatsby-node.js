const path = require("path");

const contentDir = path.join(__dirname, "../content");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node?.internal?.type !== "MarkdownRemark") return;

  const relFilePath = node.fileAbsolutePath.replace(contentDir, "");
  const urlPath = relFilePath.replace(/\.md$/, "");
  createNodeField({ node, name: `url`, value: urlPath });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const PageLayout = path.resolve(`src/layouts/PageLayout.tsx`);

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
            }
            html
            fields {
              url
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    result.data.allMarkdownRemark.edges.forEach((edge) => {
      const page = edge.node;
      createPage({
        path: `${page.fields.url}`,
        component: PageLayout,
        context: {
          ...page,
          ...page.frontmatter,
          ...page.fields,
        },
      });
    });
  });
};
