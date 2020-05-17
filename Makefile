PARSER := ./docs/parse.py

BUILD_DIR ?= ./src/obj
SRC_DIRS ?= ./docs

ROUTE := route.js

SRCS := $(shell find $(SRC_DIRS) -name *.md)
OBJS := $(SRCS:%.md=$(BUILD_DIR)/%.vue)

$(BUILD_DIR)/$(ROUTE): $(OBJS)
	echo $^ | python $(ROUTE_GENERATOR) > $@

$(BUILD_DIR)/%.vue: %.md $(PARSER)
	$(MKDIR_P) $(dir $@)
	cat $< | python $(PARSER) > $@

.PHONY: clean dev build

dev:
	npm run serve -- --port 8089

build:
	npm run build

clean:
	$(RM) -r $(BUILD_DIR)

-include $(DEPS)

MKDIR_P ?= mkdir -p
