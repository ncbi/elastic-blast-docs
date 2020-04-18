.. _quickstart:

Quickstart
==========

Get the sources
---------------

.. code-block:: shell

    mkdir elastic-blast
    cd elastic-blast
    gzip -cd /panfs/pan1.be-md.ncbi.nlm.nih.gov/blastprojects/releases/elastic-blast/elb-${VERSION}.tgz | tar xvf -

Configure it
------------

Edit one of the sample configuration files (e.g.: ``share/config/setenv-nr.sh``), providing
at least the following configuration variables:

#. :ref:`ELB_GCP_PROJECT`
#. :ref:`ELB_GCP_REGION`
#. :ref:`ELB_GCP_ZONE`
#. :ref:`ELB_BLAST_PROGRAM`
#. :ref:`ELB_DB`
#. :ref:`ELB_QUERIES`
#. :ref:`ELB_RESULTS_BUCKET`
#. :ref:`ELB_NUM_NODES`


Then load that file in your environment (assumes ``bash`` shell) with the command below:

.. code-block:: bash

    source share/config/setenv-nr.sh

See :ref:`configuration` for details on the configuration parameters.

Run it!
-------

.. code-block:: bash

    make all 
    make run

**NOTE**: currently you can only have **one** ElasticBLAST search running at a time.

To monitor its progress, run the commands:

.. code-block:: bash

    make monitor 
    make progress

The `GCP web console <https://console.cloud.google.com/kubernetes/list>`_
provides a graphical user interface to monitor your kubernetes cluster.

Problems? Search taking too long? Please see :ref:`support`.

Get results
-----------

Run the command below to download the results

.. code-block:: bash

    make get_results

If you are working at an NCBI workstation, you can optionally run the command
below to perform basic sanity checks on the result files.

.. code-block:: bash

    make test_asn_results

Clean up
--------
This step is **critical**, please do not omit it, even if you ran Ctrl-C when
starting ElasticBLAST. It is also recommended each time you start a new
ElasticBLAST search. 

.. code-block:: bash

    make clean


