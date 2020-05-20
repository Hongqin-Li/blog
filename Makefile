BUILD_DIR ?= src/obj
SRC_DIRS ?= docs

API_GENERATOR ?= genapi.py
MD_PARSER ?= parse.py

SRCS := $(shell find $(SRC_DIRS) -name "*.md" -not -name "README.md")
OBJS := $(SRCS:%.md=$(BUILD_DIR)/%.json)

$(BUILD_DIR)/api.js: $(OBJS) $(API_GENERATOR)
	@$(MKDIR_P) $(dir $@)
	echo -n $(SRCS) | python $(API_GENERATOR) > $@

$(BUILD_DIR)/%.json: %.md $(MD_PARSER)
	@$(MKDIR_P) $(dir $@)
	echo -n $< | python $(MD_PARSER) > $@

.PHONY: clean dev build

dev:
	npm run serve -- --port 8089

build:
	npm run build

clean:
	$(RM) -r $(BUILD_DIR)

-include $(DEPS)

MKDIR_P ?= mkdir -p
