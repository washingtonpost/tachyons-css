clean:
	@echo "clean those node_modules. make them shiny!"
	npx lerna clean --yes
	rm -rf node_modules

beta-publish:
	@echo "publish beta version"
	npx lerna publish from-git --canary --preid beta --pre-dist-tag beta --npm-tag beta --yes

beta-version:
	@echo "set beta version"
	npx lerna version --conventional-prerelease --preid=beta --sign-git-tag=beta --conventional-commits --no-changelog --yes

main-publish:
	@echo "publish main version"
	npx lerna publish from-git --yes --no-git-reset

main-version:
	@echo "set main version"
	npx lerna version --conventional-commits --yes --force-publish --create-release github

production-release:
	make main-version
	npm run build
	git checkout .
	make main-publish

# use tabs please
build: spacers-tachyons typography-tachyons color-tachyons bundle next-build

spacers-tachyons:
	@echo "Building spacers-tachyons"
	node ./build/build-spacers.js
	npx prettier --loglevel silent --write src/spacers/spacers.css

typography-tachyons:
	@echo "Building typography-tachyons"
	node ./build/build-typography-classes.js
	npx prettier --loglevel silent --write src/typography

color-tachyons:
	@echo "Building color-tachyons"
	node ./build/tachyons.js

bundle:
	@echo "Building bundle"
	npx postcss --config config/postcss.config.js src/index.css -o dist/index.css

next-build:
	npx next build