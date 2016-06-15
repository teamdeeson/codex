# Makefile for makedocs documentation

install:
	@pip install mkdocs

clean:
	rm -rf site

build:
	mkdocs build
	@echo
	@echo "Build finished. The HTML pages are in the site directory"

serve:
	mkdocs serve

deploy: build
	@deepub.sh publish codex site/
