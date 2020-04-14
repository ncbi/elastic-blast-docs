.. _quickstart:

Quickstart
==========

Get the sources
---------------
Download and unpack the tarball artifact from the `automated builds <https://teamcity.ncbi.nlm.nih.gov/buildConfiguration/Blast_ElasticBlast_TestReleaseTarball?branch=&mode=builds>`_.

.. code-block:: bash

    mkdir elastic-blast
    cd elastic-blast
    tar axvf elb-${VERSION}.tgz


Configure it
------------

Edit one of the sample configuration files (e.g.: ``config/setenv-nr.sh``) and
load it in your environment (assumes ``bash`` shell):

The minimal set of configuration variables you *must* set are:

#. ``ELB_GCP_PROJECT``
#. ``ELB_GCP_REGION``
#. ``ELB_GCP_ZONE``
#. ``ELB_PROGRAM``
#. ``ELB_DB``
#. ``ELB_NUM_NODES``

Please modify one of the configuration files provided to configure your
ElasticBLAST search:

.. code-block:: bash

    cp config/setenv-nt.sh config/my-elastic-blast-config.sh
    vim config/my-elastic-blast-config.sh
    source config/my-elastic-blast-config.sh

See :ref:`configuration` for details on the configuration parameters.

Run it!
-------

.. code-block:: bash

    make run

**NOTE**: currently you can only have **one** ElasticBLAST search running at a time.

To monitor its progress, run the commands:

.. code-block:: bash

    make monitor 
    make progress

Problems? Search taking too long? Please see :ref:`support`.

Get results
-----------

Run the command below to download the 

.. code-block:: bash

    make get_results

If you are working at an NCBI workstation, you can optionally run the command
below to perform basic sanity checks on the result files.

.. code-block:: bash

    make test_asn_results

Clean up
--------
This step is **critical**, please do not omit it, even if you ran Ctrl-C when
starting ElasticBLAST: 

.. code-block:: bash

    make delete


