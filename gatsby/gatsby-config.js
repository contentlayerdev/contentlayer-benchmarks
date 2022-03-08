/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: ``,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "../content/",
      },
      __key: "pages",
    },
  ],
};
