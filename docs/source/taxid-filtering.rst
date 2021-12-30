..                           PUBLIC DOMAIN NOTICE
..              National Center for Biotechnology Information
..  
.. This software is a "United States Government Work" under the
.. terms of the United States Copyright Act.  It was written as part of
.. the authors' official duties as United States Government employees and
.. thus cannot be copyrighted.  This software is freely available
.. to the public for use.  The National Library of Medicine and the U.S.
.. Government have not placed any restriction on its use or reproduction.
..   
.. Although all reasonable efforts have been taken to ensure the accuracy
.. and reliability of the software and data, the NLM and the U.S.
.. Government do not and cannot warrant the performance or results that
.. may be obtained by using this software or data.  The NLM and the U.S.
.. Government disclaim all warranties, express or implied, including
.. warranties of performance, merchantability or fitness for any particular
.. purpose.
..   
.. Please cite NCBI in any work or product based on this material.

.. _taxid-filtering:

Limiting search by taxonomy
===========================

To limit a BLAST search by taxonomy, one needs to provide the `NCBI taxonomy ID(s) (taxid) <https://www.ncbi.nlm.nih.gov/books/NBK53758/#_taxonomyqs_Data_Model_>`_ for given taxonomic group(s). A taxid is simply a number that specifies a node in the taxonomic tree.

Taxids can be provided to ElasticBLAST using BLAST command-line options (see :ref:`BLAST options <elb_blast_options>`):

1. ``-taxids`` with comma-separated list of taxids, or
2. ``-taxidlist`` with a path to a file that contains a list of taxids, one per line. This file must be present in the local file system where ElasticBLAST is run. Cloud storage locations, like ``s3://`` or ``gs://`` will not work. 

ElasticBLAST accepts taxids of any rank.

You can read more about limiting search by taxonomy in command line BLAST+ tools `here <https://www.ncbi.nlm.nih.gov/books/NBK569846/>`_.

Example:
--------

Below is an example ElasticBLAST configuration file that limits search results by taxonomy.

.. code-block::
    :name: taxid-filtering-example
    :linenos:

    [cloud-provider]
    aws-region = us-east-1

    [cluster]
    num-nodes = 1

    [blast]
    program = blastn
    db = pdbnt
    queries = s3://elasticblast-test/queries/RFQT01.1.fsa_nt.gz
    results = ${YOUR_RESULTS_BUCKET}
    options = -outfmt 7 -taxids 1866885,1804623
