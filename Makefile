BUILD_DIR ?= src/obj
SRC_DIR ?= docs

PYTHON := python3

SCRIPT_DIR ?= scripts
API_GENERATOR ?= $(SCRIPT_DIR)/genapi.py
MD_PARSER ?= $(SCRIPT_DIR)/parse.py
EXTRA_PARSER ?= $(SCRIPT_DIR)/parse_extra.py
TOML_PARSER ?= $(SCRIPT_DIR)/toml2json.py
GA_PARSER ?= $(SCRIPT_DIR)/ga.py

DESC := $(SRC_DIR)/desc.toml
CONFIG := $(SRC_DIR)/config.toml
SRCS := $(shell find $(SRC_DIR) -name "*.md" -not -name "README.md")

OBJS := $(SRCS:%.md=$(BUILD_DIR)/%.json)
CONFIG_OBJ := $(BUILD_DIR)/config.json
GA_OBJ := $(BUILD_DIR)/ga.json

.PHONY: install lint dev build clean all chmod

all: $(OBJS) $(API_GENERATOR) $(DESC) $(CONFIG_OBJ) $(CONFIG) $(GA_PARSER)
	$(PYTHON) $(EXTRA_PARSER) $(SRCS) --config $(DESC) --output $(BUILD_DIR)
	$(PYTHON) $(API_GENERATOR) --api-dir $(BUILD_DIR) --src-dir $(SRC_DIR) -o ${BUILD_DIR}/api.js
	$(PYTHON) $(GA_PARSER) --config $(CONFIG) -o $(GA_OBJ)

$(CONFIG_OBJ): $(CONFIG) $(TOML_PARSER)
	@$(MKDIR_P) $(dir $@)
	cat $< | $(PYTHON) $(TOML_PARSER) > $@

$(BUILD_DIR)/%.json: %.md $(MD_PARSER)
	@$(MKDIR_P) $(dir $@)
	$(PYTHON) $(MD_PARSER) $< -o $@

install:
	$(PYTHON) -m pip install -r scripts/requirements.txt
	$(PYTHON) -m pip install flake8 pytest
	npm install

lint:
	flake8 $(SCRIPT_DIR)/*.py --count --show-source --statistics
	npm run lint

dev: all
	npm run serve -- --port 8089

build: all
	npm run build

chmod:
	chmod 644 $(SRCS)
	
clean:
	$(RM) -r $(BUILD_DIR)

MKDIR_P ?= mkdir -p
