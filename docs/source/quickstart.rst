Quickstart
==========

Get the sources
---------------
Download and unpack the tarball artifact from the `automated builds <https://teamcity.ncbi.nlm.nih.gov/buildConfiguration/Blast_ElasticBlast_TestReleaseTarball?branch=&mode=builds>`_.

Configure it
------------

Edit one of the sample configuration files (e.g.: ``config/setenv-nr.sh``) and
load it in your environment (assumes ``bash`` shell):

``source config/my-elastic-blast-config.sh``.

See :ref:`configuration` for details on the configuration parameters.

Run it
------

Execute ``make run``.

Get results
-----------

Execute ``make test_asn_results`` (if you are at a NCBI workstation). This will
download the BLAST results to the local directory and perform a basic sanity
check on them.

If not at an NCBI workstation, execute ``make get_results``.

# Clean up

Execute ``make delete``.


