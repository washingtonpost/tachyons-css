// theme.config.js
export default {
  darkMode: true,
  projectLink: "https://github.com/WPMedia/wapo-tachyons-css", // GitHub link in the navbar
  docsRepositoryBase: "https://github.com/WPMedia/wapo-tachyons-css/blob/main", // base URL for the docs repository
  titleSuffix: " - WaPo Tachyons", // title suffix for the page
  nextLinks: true,
  prevLinks: true,
  search: true,
  darkMode: true,
  footer: true,
  footerText: `MIT ${new Date().getFullYear()} © Washington Post.`,
  footerEditLink: `Edit this page on GitHub`,
  logo: (
    <span className="font-sm font-light font--headline">
      Tachyons from WaPo
    </span>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="WaPo Tachyons – Washington Post CSS Framework"
      />
      <meta
        name="og:title"
        content="WaPo Tachyons – Washington Post CSS Framework"
      />
    </>
  )
};
