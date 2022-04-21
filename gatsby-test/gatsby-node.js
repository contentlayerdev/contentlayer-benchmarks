const path = require("path");

const contentDir = path.join(__dirname, "../content");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node?.internal?.type !== "MarkdownRemark") return;

  const relFilePath = node.fileAbsolutePath.replace(contentDir, "");
  const urlPath = relFilePath.replace(/\.md$/, "");
  createNodeField({ node, name: `url`, value: urlPath });
};
