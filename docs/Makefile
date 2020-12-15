# Minimal makefile for Sphinx documentation
#

VENV=.env
SHELL=/bin/bash

all: help

${VENV}: requirements.txt
	[ -d ${VENV} ] || python3 -m venv $@
	source ${VENV}/bin/activate && pip install -r $^

# You can set these variables from the command line, and also
# from the environment for the first two.
SPHINXOPTS    ?=
SPHINXBUILD   ?= sphinx-build
SOURCEDIR     = source
BUILDDIR      = build

.PHONY: help Makefile

# Put it first so that "make" without argument is like "make help".
help: ${VENV}
	source ${VENV}/bin/activate && $(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

distclean:
	${RM} -r ${VENV}

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
#%: Makefile
%: ${VENV}
	source ${VENV}/bin/activate && $(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
