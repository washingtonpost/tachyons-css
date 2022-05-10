# WaPo Tachyons CSS Framework

WaPo offers a CSS framework for rapid development with our design system standards in mind! Inspired by [tachyons](https://tachyons.io/) the framework is a utility class-based approach to writing minimal CSS. Check out the [docs](https://build.washingtonpost.com/tachyons) or the source code for sample usage.

## Usage

Import the global framework:

```jsx
import "@washingtonpost/tachyons-css/dist/index.css";
```

Use to your heart's content ❤️:

```html
<a href="bold blue hover-underline">CSS is awesome</a>
```

## Contributing

1. Create a new branch from `main`.
1. Make your changes.
1. Please use conventional commits for commit messages. https://www.conventionalcommits.org/en/v1.0.0/. We use this to create the correct version for our package. Thank you.
1. Submit your changes as a pull request or a fork.
1. Ask for a review from a team mate and one person from the "@WPMedia/wpds-core" team.
1. A core team member will merge your code.
1. A core team member will help you create a release.

## Releasing to NPM Production/Latest Channel

Push or merge your change into the "main" git branch. We have a Github actions workflow that takes care of releasing your code to NPM.
