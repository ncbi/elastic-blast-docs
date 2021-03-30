#                           PUBLIC DOMAIN NOTICE
#              National Center for Biotechnology Information
#  
# This software is a "United States Government Work" under the
# terms of the United States Copyright Act.  It was written as part of
# the authors' official duties as United States Government employees and
# thus cannot be copyrighted.  This software is freely available
# to the public for use.  The National Library of Medicine and the U.S.
# Government have not placed any restriction on its use or reproduction.
#   
# Although all reasonable efforts have been taken to ensure the accuracy
# and reliability of the software and data, the NLM and the U.S.
# Government do not and cannot warrant the performance or results that
# may be obtained by using this software or data.  The NLM and the U.S.
# Government disclaim all warranties, express or implied, including
# warranties of performance, merchantability or fitness for any particular
# purpose.
#   
# Please cite NCBI in any work or product based on this material.

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

elastic-blast-docs.tar.bz2: html
	${RM} -r build/elastic-blast
	mv build/html build/elastic-blast
	tar -acf $@ -C build elastic-blast

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
#%: Makefile
%: ${VENV}
	source ${VENV}/bin/activate && $(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
