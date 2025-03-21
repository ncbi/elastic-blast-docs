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

# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = 'ElasticBLAST'
html_show_copyright = False
author = 'Christiam Camacho'

# The full version, including alpha/beta/rc tags
release = '1.4.0'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'recommonmark',
    'sphinx_copybutton'
]

source_suffix = ['.rst', '.md']

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []

# https://www.sphinx-doc.org/en/master/usage/configuration.html?highlight=linkcheck#options-for-the-linkcheck-builder
#linkcheck_ignore = [r'blast_plus_docs']
linkcheck_ignore = [r'https://github.com/ncbi/blast_plus_docs/blob/master/README.md#blast-databases',
                    r'https://www.ncbi.nlm.nih.gov/books/NBK131777/#Blast_ReleaseNotes.BLAST_2_13_0_March_11',
                    r'https://www.ncbi.nlm.nih.gov/books/NBK279684/#appendices.Options_for_the_commandline_a',
                    r'https://www.ncbi.nlm.nih.gov/books/NBK53758/#_taxonomyqs_Data_Model_',
                    r'https://www.ncbi.nlm.nih.gov/books/NBK569839/#usrman_BLAST_feat.BLAST_database_metadat',
                    r'https://www.ncbi.nlm.nih.gov/books/NBK279690/',
                    r'https://www.ncbi.nlm.nih.gov/books/NBK569851/#intro_Privacy.Optout_of_Usage_Reporting',
                    r'https://www.ncbi.nlm.nih.gov/books/NBK569843/',
                    r'https://www.ncbi.nlm.nih.gov/books/NBK569846/',
                    r'https://www.ncbi.nlm.nih.gov/books/NBK569851/'
                    ]

# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'alabaster'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

html_css_files = ['uswds/uswds.css',
                  'nwds/css/nwds.css',
                  'nwds/css/header.css',
                  'nwds/css/footer.css',
                  'nwds/css/form.css',
                  'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
                  'styles.css'
                ]

html_js_files = [
                  'jquery-3.5.0.min.js',
                  'init.js'
                ]

html_theme_options = {
    'sidebar_link' : 'rgb(0, 113, 188)' ,
}


html_sidebars = {
    '**': [
        'navigation.html',
    ]
}





# CopyButton configuration
copybutton_prompt_text = ">>> "

# From https://github.com/sphinx-doc/sphinx/issues/4054
def ultimateReplace(app, docname, source):
    result = source[0]
    for key in app.config.ultimate_replacements:
        result = result.replace(key, app.config.ultimate_replacements[key])
    source[0] = result

ultimate_replacements = {
    "{VERSION}" : release
}

def setup(app):
   app.add_config_value('ultimate_replacements', {}, True)
   app.connect('source-read', ultimateReplace)
