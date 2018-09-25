# Makefile for makedocs documentation

clean:
	rm -rf site
	rm -rf deeson-theme/node_modules

# Build the theme assets
build-frontend:
	cd deeson-theme && \
	  npm i && \
	  npm run prod

build: build-frontend
	mkdocs build --clean
	@echo
	@echo "Build finished. The HTML pages are in the site directory"

start: serve
run: serve
serve:
	docker run -it --rm -p 80:8000 -v ${PWD}:/docs --name deeson-codex teamdeeson/mkdocs:0.15.3

docker-build:
	docker run -it --rm -v ${PWD}:/app -w /app --name deeson-codex-node node:7 make build-frontend
	docker run -it --rm -v ${PWD}:/docs --name deeson-codex-build teamdeeson/mkdocs:0.15.3 build --clean

deploy:
	@echo 'Just commit into master and push, the code is built and deployed to http://handbook.deeson.co.uk'
