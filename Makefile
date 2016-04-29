# Makefile for makedocs documentation

help:
	@echo "Hello world"

clean:
	rm -rf _build

build:
	mkdocs build
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

serve:
	mkdocs serve
