.. _taxid-filtering:

Limiting search by taxonomy
===========================

To limit a BLAST search by taxonomy, one needs to provide the `NCBI taxonomy ID(s) (taxid) <https://www.ncbi.nlm.nih.gov/books/NBK53758/#_taxonomyqs_Data_Model_>`_ for given taxonomic group(s). A taxid is simply a number that specifies a node in the taxonomic tree.

Taxids can be provided to ElasticBLAST using BLAST command-line options (see :ref:`BLAST options <elb_blast_options>`):

1. ``-taxids`` with comma-separated list of taxids, or
2. ``-taxidlist`` with a path to a file that contains a list of taxids, one per line. This file must be present in the local file system where ElasticBLAST is run. Cloud storage locations, like ``s3://`` or ``gs://`` will not work. 

ElasticBLAST accepts taxids of any rank.

You can read more about limiting search by taxonomy in command line BLAST+ tools `here <https://www.ncbi.nlm.nih.gov/books/NBK546209/>`_.

Example:
--------

Below is an example ElasticBLAST configuration file that limits search results by taxonomy.

.. code-block::
    :name: taxid-filtering-example
    :linenos:

    [cloud-provider]
    aws-region = us-east-1

    [cluster]
    machine-type = m5.8xlarge
    num-nodes = 1

    [blast]
    program = blastn
    db = pdbnt
    queries = s3://elasticblast-test/queries/RFQT01.1.fsa_nt.gz
    results-bucket = ${YOUR_RESULTS_BUCKET}
    options = -outfmt 7 -taxids 1866885,1804623
