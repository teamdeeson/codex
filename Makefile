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

run: serve
serve:
	(sleep 1 && open http://127.0.0.1:8000) & mkdocs serve

deploy:
	@echo 'Just commit into master and push, the code is built and deployed to http://handbook.deeson.co.uk'
