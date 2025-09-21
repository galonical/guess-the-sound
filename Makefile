PROJECT := guess-the-sound

.DEFAULT_GOAL := switch-to-mise

# user and repo
USER        = $$(whoami)
CURRENT_DIR = $(notdir $(shell pwd))

# terminal colors
RED     = \033[0;31m
GREEN   = \033[0;32m
YELLOW  = \033[0;33m
BLUE    = \033[0;34m
MAGENTA = \033[0;35m
BOLD    = \033[1m
RESET   = \033[0m

define ANNOUNCE
echo "$(2)$(1)${NC}"
endef

.PHONY: switch-to-mise
switch-to-mise:
	@brew --version >> /dev/null || \
		{ echo "${RED}❌ Couldn't detect Homebrew${NC}"; exit 1; }
	@$(call ANNOUNCE,"✅ homebrew ready to brew bundle",${GREEN})
	@bash -c "command -v mise" >> /dev/null || \
		{ echo "let's install mise"; brew install mise; }
	@mise version >> /dev/null && \
		$(call ANNOUNCE,"✅ mise",${GREEN})
	@mise run
	@echo "\n\t${YELLOW}type ${GREEN}mise${YELLOW} to run commands\n"

.PHONY: build
build:
	mise run build
