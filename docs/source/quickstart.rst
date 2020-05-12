.. _quickstart:

Quickstart
==========

Get ElasticBlast
----------------

.. code-block:: shell

    cp -p /panfs/pan1.be-md.ncbi.nlm.nih.gov/blastprojects/releases/elastic-blast/{VERSION}/elastic-blast . 
    md5sum -c /panfs/pan1.be-md.ncbi.nlm.nih.gov/blastprojects/releases/elastic-blast/{VERSION}/elastic-blast.md5

Configure it
------------

The minimal configuration requires: 

#. Google Cloud Platform (GCP) parameters: 

   #. :ref:`GCP Project`
   #. :ref:`GCP Region`
   #. :ref:`GCP Zone`

#. Query input, results bucket,

   #. :ref:`Queries`
   #. :ref:`Results Bucket`

#. Basic BLAST parameters, and
 
   #. :ref:`BLAST Program`
   #. :ref:`DB`

#. Number of nodes to start
 
   #. :ref:`Num nodes`
 

They can be provided on a standard ini configuration file, e.g.:

.. code-block::
    :name: minimal-config
    :linenos:

    [cloud-provider]
    gcp-project = ${YOUR_GCP_PROJECT}
    gcp-region = us-east4   # recommended value
    gcp-zone = us-east4-b   # Any zone in us-east4 should work equally well

    [cluster]
    num-nodes = 10

    [blast]
    program = blastp
    db = nr
    queries = gs://elastic-blast-samples/queries/protein/dark-matter-500000.faa.gz
    results-bucket = gs://my-test-bucket



See :ref:`configuration` for details on all the configuration parameters.

Run it!
-------

.. code-block:: bash

    ./elastic-blast submit --cfg ${CONFIG_FILE} --loglevel DEBUG

**NOTE**: currently you can only have **one** ElasticBLAST search running at a time.


Monitor progress
----------------
To check on the progress of the search, run the command below:

.. code-block:: bash
    :name: status

    ./elastic-blast status --cfg ${CONFIG_FILE} --loglevel DEBUG


An alternate way to monitor the progress is to inspect the kubernetes
pods/nodes activity:

.. code-block:: bash
    :name: kubectl-monitor

    kubectl get pods -o wide
    kubectl top pods --containers
    kubectl top nodes

The `GCP web console <https://console.cloud.google.com/kubernetes/list>`_
provides a graphical user interface to monitor your kubernetes cluster.

Problems? Search taking too long? Please see :ref:`support`.

Get results
-----------

Run the command below to download the results

.. code-block:: bash

    gsutil -qm cp ${YOUR_RESULTS_BUCKET}/*.out.gz .

If you are working at an NCBI workstation, you can optionally run the command
below to perform basic sanity checks on the result files.

.. code-block:: bash

    find . -name "batch*.out.gz" -type f -print0 | \
        xargs -0 -P8 -I{} -t gzip -t {}
    find . -name "batch*.out.gz" -type f -print0 | \
        xargs -0 -P8 -I{} -t bash -c "zcat {} |
        datatool -m /netopt/ncbi_tools64/c++.metastable/src/objects/blast/blast.asn -M /am/ncbiapdata/asn/asn.all -v - -e /dev/null"

Clean up
--------
This step is **critical**, please do not omit it, even if you ran Ctrl-C when
starting ElasticBLAST. It is also recommended each time you start a new
ElasticBLAST search. 

.. code-block:: bash

    ./elastic-blast delete --cfg ${CONFIG_FILE}


