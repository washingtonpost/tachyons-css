export default {
  project: {
    link: "https://github.com/washingtonpost/tachyons-css"
  },
  docsRepositoryBase: "https://github.com/washingtonpost/tachyons-css/blob/main",
  useNextSeoProps() {
    return {
      titleTemplate: '%s - WaPo Tachyons CSS'
    }
  },
  footer: {
    text: <span>
      MIT {new Date().getFullYear()} © <a href="https://washingtonpost.com" target="_blank">Washington Post</a>.
    </span>,
  },
  logo: (
    <span className="font-md font-light font--headline">
      WaPo Tachyons CSS
    </span>
  ),
  head: (
    <>
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
