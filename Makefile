# Makefile for makedocs documentation

install:
	@pip install mkdocs

clean:
	rm -rf site

# Build the theme assets
build-frontend:
	cd deeson-theme && \
	  npm i && \
	  npm run prod

build: build-frontend
	mkdocs build --clean
	@echo
	@echo "Build finished. The HTML pages are in the site directory"

serve:
	mkdocs serve

deploy: build
	@deepub.sh publish handbook site/
