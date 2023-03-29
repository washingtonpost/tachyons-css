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