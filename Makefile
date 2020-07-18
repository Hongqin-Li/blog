BUILD_DIR ?= src/obj
SRC_DIR ?= docs

SCRIPT_DIR ?= scripts
API_GENERATOR ?= $(SCRIPT_DIR)/genapi.py
MD_PARSER ?= $(SCRIPT_DIR)/parse.py
EXTRA_PARSER ?= $(SCRIPT_DIR)/parse_extra.py

CONFIG := $(SRC_DIR)/config.toml
SRCS := $(shell find $(SRC_DIR) -name "*.md" -not -name "README.md")
OBJS := $(SRCS:%.md=$(BUILD_DIR)/%.json)

.PHONY: install lint dev build clean all

all: $(OBJS) $(API_GENERATOR) $(CONFIG)
	@$(MKDIR_P) $(dir $@)
	python $(EXTRA_PARSER) $(SRCS) --config $(CONFIG) --output $(BUILD_DIR)
	python $(API_GENERATOR) --api-dir $(BUILD_DIR) --src-dir $(SRC_DIR) -o ${BUILD_DIR}/api.js

$(BUILD_DIR)/%.json: %.md $(MD_PARSER)
	@$(MKDIR_P) $(dir $@)
	echo -n $< | python $(MD_PARSER) > $@

install:
	pip install -r scripts/requirements.txt
	pip install flake8 pytest
	npm install

lint:
	flake8 $(SCRIPT_DIR)/*.py --count --show-source --statistics
	npm run lint

dev: all
	npm run serve -- --port 8089

build: all
	npm run build

clean:
	$(RM) -r $(BUILD_DIR)

MKDIR_P ?= mkdir -p
