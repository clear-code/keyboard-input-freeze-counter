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

xpi: lint extlib/webextensions-lib-configs/Configs.js extlib/webextensions-lib-l10n/l10n.js extlib/webextensions-lib-options/Options.js
	rm -f ./*.xpi
	git submodule update
	cp extlib/webextensions-lib-configs/Configs.js common/
	cp extlib/webextensions-lib-l10n/l10n.js options/
	cp extlib/webextensions-lib-options/Options.js options/
	zip -r -0 keyboard-input-freeze-counter.xpi manifest.json content.js background.js common options _locales >/dev/null 2>/dev/null

extlib/webextensions-lib-configs/Configs.js:
	git submodule update --init

extlib/webextensions-lib-l10n/l10n.js:
	git submodule update --init

extlib/webextensions-lib-options/Options.js:
	git submodule update --init

