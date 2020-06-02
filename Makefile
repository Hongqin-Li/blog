BUILD_DIR ?= src/obj
SRC_DIRS ?= docs

SCRIPT_DIR ?= scripts
API_GENERATOR ?= $(SCRIPT_DIR)/genapi.py
MD_PARSER ?= $(SCRIPT_DIR)/parse.py

SRCS := $(shell find $(SRC_DIRS) -name "*.md" -not -name "README.md")
OBJS := $(SRCS:%.md=$(BUILD_DIR)/%.json)

$(BUILD_DIR)/api.js: $(OBJS) $(API_GENERATOR)
	@$(MKDIR_P) $(dir $@)
	echo -n $(SRCS) | python $(API_GENERATOR) > $@

$(BUILD_DIR)/%.json: %.md $(MD_PARSER)
	@$(MKDIR_P) $(dir $@)
	echo -n $< | python $(MD_PARSER) > $@

.PHONY: install lint dev build clean

install:
	pip install -r scripts/requirements.txt
	pip install flake8
	npm install

lint:
	flake8 $(SCRIPT_DIR)/*.py --count --show-source --statistics
	flake8 $(SCRIPT_DIR)/*.py --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
	npm run lint

dev: $(BUILD_DIR)/api.js
	npm run serve -- --port 8089

build: $(BUILD_DIR)/api.js
	npm run build

clean:
	$(RM) -r $(BUILD_DIR)

-include $(DEPS)

MKDIR_P ?= mkdir -p
