NPM_MOD_DIR := $(CURDIR)/node_modules
NPM_BIN_DIR := $(NPM_MOD_DIR)/.bin

.PHONY: xpi install_dependency lint format

all: xpi

install_dependency:
	npm install

lint:
	$(NPM_BIN_DIR)/eslint . --ext=.js –report-unused-disable-directives

format:
	$(NPM_BIN_DIR)/eslint . --ext=.js –report-unused-disable-directives --fix

xpi: lint extlib/webextensions-lib-l10n/l10n.js
	rm -f ./*.xpi
	git submodule update
	cp extlib/webextensions-lib-l10n/l10n.js options/
	zip -r -0 keyboard-input-freeze-counter.xpi manifest.json content.js background.js options _locales >/dev/null 2>/dev/null

extlib/webextensions-lib-l10n/l10n.js:
	git submodule update --init

