.. _quickstart-gcp:

Quickstart for GCP
==================

Overview of ElasticBLAST on GCP
-------------------------------

.. figure:: persistent-disk-architecture.png
   :alt: Overview of ElasticBLAST at GCP
   :class: with-border


Get ElasticBLAST
----------------

.. code-block:: shell

    curl -sO https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast
    curl -sO https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast.md5
    md5sum -c elastic-blast.md5
    chmod +x elastic-blast
    # Optional: move elastic-blast to the desired installation path


The code examples below assume that ElasticBLAST was installed in the current
working directory and that the :ref:`requirements <requirements>` have been met.


Set up an output bucket (if one doesn't exist)
----------------------------------------------

.. code-block:: shell

    gsutil ls gs://elasticblast-${USER} >& /dev/null || gsutil mb gs://elasticblast-${USER}


See :ref:`configuration` for details on all the configuration parameters.

Run it!
-------

ElasticBLAST requires the following parameters to submit a search:

#. Cloud service provider configuration (see :ref:`GCP configuration <gcp_conf>` for details),
#. :ref:`query sequences <elb_queries>`, 
#. a :ref:`cloud storage bucket for results <elb_results>`. This value must start with ``gs://`` and _uniquely_ identifies your ElasticBLAST search. **Please keep track of this**.
#. basic BLAST parameters (:ref:`program <elb_blast_program>` and :ref:`database <elb_db>`), and
#. :ref:`elb_num_nodes` to start.

In addition to these, an ini-style configuration file can be provided for additional configuration options.
Please see :ref:`configuration` for details on all the configuration parameters.

.. code-block:: bash

    ./elastic-blast submit \
        --program blastp \
        --query gs://elastic-blast-samples/queries/protein/BDQE01.1.fsa_aa \
        --db nr \
        --results gs://${YOUR_RESULTS_BUCKET} \
        --gcp-project ${YOUR_GCP_PROJECT_ID} \
        --gcp-region us-east4 \
        --gcp-zone us-east4-b
        --num-nodes 2 \
        --loglevel DEBUG
        -- -task blastp-fast -evalue 0.01 -outfmt 7 

In addition to the minimal parameters, the configuration file above includes some BLAST options after the `--` argument.
The search took about 30 minutes to run and cost less than $3 in GCP in July 2020.  Using :ref:`preemptible nodes<ELB_USE_PREEMPTIBLE>` can make it less expensive.

The submit command can take several minutes as it brings up cloud resources and downloads the BLAST database.

For helpful demos associated with ElasticBLAST, please visit https://github.com/ncbi/elastic-blast-demos

Monitor progress
----------------
To check on the progress of the search, inspect the logfile
(``elastic-blast.log`` by default) and/or run the command below:

.. code-block:: bash
    :name: status

    ./elastic-blast status --results gs://${YOUR_RESULTS_BUCKET} --loglevel DEBUG

The status command will not return proper results until the submit command has finished.

An alternate way to monitor the progress is to inspect the kubernetes pods/nodes activity:

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

Run the command below to download the results:

.. code-block:: bash

    gsutil -qm cp ${YOUR_RESULTS_BUCKET}/*.out.gz .

Clean up
--------
This step is **critical**, please do not omit it, even if you ran Ctrl-C when
starting ElasticBLAST. If you do not clean up your cloud resources, you may accrue charges from
your cloud service provider or you may end up running out of available quota.
It is also recommended each time you start a new ElasticBLAST search. 

.. code-block:: bash

    ./elastic-blast delete --results gs://${YOUR_RESULTS_BUCKET} --loglevel DEBUG


The delete command will take a few minutes to run as it needs to manage multiple cloud resources.

You may verify that your cloud resources have been deleted by running: 

.. code-block:: bash

  gcloud container clusters list --project <your-gcp-project-id>
  gcloud compute disks list --project <your-gcp-project-id>

This will show all clusters and disks in your project (even from other users).
If nothing is returned, then no clusters are running and no disks are being
used. Please see :ref:`PD_LEAK` if your cluster or disk are not properly
deleted for instructions on deleting them.

.. _gcp_conf:

GCP Configuration
-----------------

The minimum required configuration parameters for running ElasticBLAST in GCP include:

* :ref:`project <elb_gcp_project>`
* :ref:`region <elb_gcp_region>`
* :ref:`zone <elb_gcp_zone>`

In addition, you must be authenticated with the GCP project in the environment you are working on.
A convenient way to accomplish this is to work on the `GCP cloud shell <https://console.cloud.google.com/?cloudshell=true>`_.
