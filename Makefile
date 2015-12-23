PROJECT = brew-it-yourself
NPM ?= npm
DEL = rm -rf
DIST = dist
BUILD = build
DOCKER = docker
GRUNT ?= grunt
ECHO = @echo
BOWER ?= bower
NODE_MODULES = node_modules
BOWER_COMPONENTS = bower_components
INSTALL_DEP = $(NODE_MODULES) $(BOWER_COMPONENTS)

help:
	$(ECHO) "Builder"
	$(ECHO) "make install       Install the dependancies and prepare environment"
	$(ECHO) "make release       Generate the release in " $(DIST)
	$(ECHO) "make clean         Clean the project"

release: install
	$(GRUNT)

install:
	$(NPM) install && $(BOWER) install

clean:
	$(DEL) $(BUILD) && $(DEL) $(DIST) && $(DEL) $(NODE_MODULES) && $(DEL) $(BOWER_COMPONENTS)

docker: release
	$(DOCKER) build -t $(PROJECT) .