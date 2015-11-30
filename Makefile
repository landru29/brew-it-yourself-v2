NODE ?= node
NPM ?= npm
DEL = rm -rf
DIST = .dist
BUILD = build
GRUNT ?= grunt
ECHO = @echo
BOWER ?= bower
NODE_MODULES = node_modules
BOWER_COMPONENTS = bower_components
INSTALL_DEP = $(NODE_MODULES) $(BOWER_COMPONENTS)
CONFIG = src/assets/config.json

help:
	$(ECHO) "Builder for TAT UI client"
	$(ECHO) "make install       Install the dependancies and prepare environment"
	$(ECHO) "make bower         Update bower packages"
	$(ECHO) "make release       Generate the release in " $(DIST)
	$(ECHO) "make clean         Clean the project"

release: $(INSTALL_DEP)
	$(GRUNT)

install:
	$(NPM) install && $(MAKE_BOWER) && $(BOWER) install

bower:
	$(BOWER) install

clean:
	$(DEL) $(BUILD) && $(DEL) $(DIST) && $(DEL) $(NODE_MODULES) && $(DEL) $(BOWER_COMPONENTS)

copy-config-sample:
	cp $(CONFIG).sample $(CONFIG)

$(NODE_MODULES): install

$(BOWER_COMPONENTS): install
