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
SAIL_REGISTRY = sailabove.io
SAIL_TAG = $(account)/$(PROJECT)
SAIL = sail

help:
	$(ECHO) "Builder"
	$(ECHO) "make install                  Install the dependancies and prepare environment"
	$(ECHO) "make release                  Generate the release in " $(DIST)
	$(ECHO) "make clean                    Clean the project"
	$(ECHO) "make sail account=xx          Create a service on Sailabove.io"
	$(ECHO) "make sail-redeploy account=xx redeploy a service on Sailabove.io"

release: install
	$(GRUNT)

$(NODE_MODULES):
	$(NPM) install

$(BOWER_COMPONENTS):
	$(BOWER) install

install: $(NODE_MODULES) $(BOWER_COMPONENTS)

clean:
	$(DEL) $(BUILD) && $(DEL) $(DIST) && $(DEL) $(NODE_MODULES) && $(DEL) $(BOWER_COMPONENTS)

dist: release

docker: dist
	$(DOCKER) build -t $(PROJECT) .

sail_send: docker
	$(DOCKER) tag -f $(PROJECT) $(SAIL_REGISTRY)/$(SAIL_TAG)
	$(DOCKER) push $(SAIL_REGISTRY)/$(SAIL_TAG)

sail: sail_send
	$(SAIL) service add $(SAIL_TAG) --publish 80:9000 --network predictor $(PROJECT)
	$(SAIL) service start $(SAIL_TAG)

sail-redeploy: sail_send
	$(SAIL) service redeploy $(SAIL_TAG)
