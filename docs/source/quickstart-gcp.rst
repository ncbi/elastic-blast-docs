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

.. _quickstart-gcp:

Quickstart for GCP
==================


.. figure:: persistent-disk-architecture.png
   :alt: Overview of ElasticBLAST at GCP
   :class: with-border


Overview 
--------

In this quickstart, you will run a BLASTP (protein-protein) search with ElasticBLAST, producing tabular output that also lists taxonomic information about your matches.  

You will use Google Cloud Shell for this first ElasticBLAST run.  The Cloud Shell already has some of the needed software installed and is easy to start up.  

To start up the Cloud Shell, follow these `instructions <https://cloud.google.com/shell/docs/using-cloud-shell>`_.

In order to complete this quickstart, you will need to be familiar with the GCP console, have an account at GCP, be comfortable with the command-line and editing files with a text editor.  

As you work through this quickstart, you may occasionally see a message from the Cloud Shell asking you to authorize use of GCP API's.  Simply select the "Authorize" button. 


Get ElasticBLAST
----------------

Copy and paste the commands below at the Cloud Shell prompt to install ElasticBLAST.

.. code-block:: shell

    curl -sO https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast
    curl -sO https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast.md5
    md5sum -c elastic-blast.md5
    chmod +x elastic-blast

The instructions in this quickstart assume that you are working from the directory where you installed ElasticBLAST.

Run the two ElasticBLAST commands listed below.  If ElasticBLAST is properly installed, the first one will report the version of ElasticBLAST installed and the second one will give you the help message.

.. code-block:: bash

    ./elastic-blast --version
    ./elastic-blast --help


Set up an output bucket (if one doesn't exist)
----------------------------------------------

.. code-block:: shell

    gsutil ls gs://elasticblast-${USER} >& /dev/null || gsutil mb gs://elasticblast-${USER}


Configure ElasticBLAST
----------------------

You will use a configuration file to specify your input to ElasticBLAST.  Once you have written the configuration file, you'll just need to tell ElasticBLAST about it when invoked.

Start by copying the configuration file shown below.  Using an editor, write this text to a new file called "BDQE.ini".  Both nano and vi are available on the Cloud Shell.

.. code-block::
    :name: minimal-config
    :linenos:

    [cloud-provider]
    gcp-project = ${YOUR_GCP_PROJECT_ID}
    gcp-region = us-east4   
    gcp-zone = us-east4-b

    [cluster]
    num-nodes = 2

    [blast]
    program = blastp
    db = swissprot
    queries = gs://elastic-blast-samples/queries/protein/BDQE01.1.fsa_aa
    results = gs://elasticblast-${USER}/results/BDQE
    options = -task blastp-fast -evalue 0.01 -outfmt "7 std sskingdoms ssciname" 

You will need to edit the file to provide a GCP Project ID and your results bucket. Read about how to identify your `GCP project <https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects>`_.  For your results bucket, you should append "/results/BDQE" to your output bucket.  If you created it with the gsutil command above, it would be as shown in the configuration file above.  

ElasticBLAST will place your results at gs://elasticblast-${USER}/results/BDQE.  For your next search, you should use a different token than BDQE, otherwise your new results will be placed at the same location, possibly overwriting your first set of results.

This configuration file specifies two GCP instances, specified by "num-nodes", for your search.  The BLASTP program searches proteins from the BDQE WGS project (obtained from a cloud bucket) against the swissprot database.

In addition to the minimal parameters, the configuration file above includes some BLAST options.

There is no need to change any lines in the configuration file (BDQE.ini) other than the gcp-project and the results.  

This search should take about 30 minutes to run and cost less than $3.  

See :ref:`configuration` for details on all the configuration parameters.


Run ElasticBLAST
----------------

.. code-block:: bash

    ./elastic-blast submit --cfg BDQE.ini --loglevel DEBUG

The submit command can take several minutes as it brings up cloud resources and downloads the BLAST database.
Once it returns, you can move on to the next step.

Monitor progress
----------------
To check on the progress of the search, inspect the logfile
(``elastic-blast.log`` by default) and/or run the command below:

.. code-block:: bash
    :name: status

    ./elastic-blast status --cfg BDQE.ini --loglevel DEBUG

The status command will not return proper results until the submit command has finished.
Once it returns, it will list the number of batches "Pending" (waiting), "Running" (searches ongoing), "Succeeded" (finished successfully), and "Failed".

An alternate way to monitor the progress is to inspect the kubernetes pods/nodes activity:

.. code-block:: bash
    :name: kubectl-monitor

    kubectl get pods -o wide
    kubectl top pods --containers
    kubectl top nodes

The `GCP web console <https://console.cloud.google.com/kubernetes/list>`_
provides a graphical user interface to monitor your kubernetes cluster.

Once all batches have finished, you can download results as shown below.

Download results
----------------

At this point you will find it convenient to set an environment variable for the location of your results.  You'll need to modify the command below to use the same path listed in BDQE.ini.

.. code-block:: bash

   export YOUR_RESULTS_BUCKET=s3://elasticblast-YOURNAME/results/BDQE


Now, use the command below to download your results from your results bucket. This command assumes you have set ${YOUR_RESULTS_BUCKET}.  If you haven't done this, simply replace ${YOUR_RESULTS_BUCKET} by the path.

.. code-block:: bash

    gsutil -qm cp ${YOUR_RESULTS_BUCKET}/*.out.gz .

ElasticBLAST breaks your set of queries into multiple batches and runs one search per batch.  Your results are returned with the results of each batch in a separate file. 

Running "ls" in the Cloud Shell should list 10 files named something like "batch_000-blastp-swissprot.out.gz".  

Use the commands below to decompress the first batch and then view with "less".  

.. code-block:: bash

    gunzip batch_000-blastp-swissprot.out.gz 
    less batch_000-blastp-swissprot.out

`BDQE <https://www.ncbi.nlm.nih.gov/Traces/wgs/BDQE01>`_ is a WGS study of viral metagenomes.  You will see tabular output with matches to the swissprot database.  The output also includes the Kingdom and scientific name of the database sequence found, so you can check whether it is viral or not.  Note that many of the queries have no matches.  A more comprehensive database might find more matches.


Clean up cloud resources
------------------------
This step is **critical**, please do not omit it, even if you ran Ctrl-C when
starting ElasticBLAST. If you do not clean up your cloud resources, you may accrue charges from
your cloud service provider or you may end up running out of available quota.
It is also recommended each time you start a new ElasticBLAST search. 

.. code-block:: bash

    ./elastic-blast delete --cfg BDQE.ini --loglevel DEBUG


The delete command will take a few minutes to run as it needs to manage multiple cloud resources.

You may verify that your cloud resources have been deleted by running: 

.. code-block:: bash

  gcloud container clusters list --project <your-gcp-project-id>
  gcloud compute disks list --project <your-gcp-project-id>

This will show all clusters and disks in your project (even from other users).
If nothing is returned, then no clusters are running and no disks are being
used. Please see :ref:`PD_LEAK` if your cluster or disk are not properly
deleted for instructions on deleting them.


Summary
-------

You have run a BLASTP (protein-protein) search with ElasticBLAST, producing tabular output that also lists taxonomic information about your matches.  The BLAST search was selected to be quick and inexpensive to run with a query set of only 171 proteins and the relatively small swissprot database.  

You used the Cloud Shell to launch your search.  The Cloud Shell has the advantage that it is easy to start up and already has the GCP SDK, python, and kubectl (used by elastic-blast to submit searches) installed.  The Cloud Shell has `limitations <https://cloud.google.com/shell/docs/limitations>`_ and you may want to consider other environments for further work.  ElasticBLAST can also be started from your own machine or a cloud instance you have brought up.  In that case, you will need to make sure that the :ref:`requirements <requirements>` have been met.  You should also look at :ref:`GCP Configuration <gcp_conf>` (below).

The :ref:`tutorials` page provides more details on ElasticBLAST as well as examples. 

.. _gcp_conf:

GCP Configuration
-----------------

The minimum required configuration parameters for running ElasticBLAST in GCP include:

* :ref:`project <elb_gcp_project>`
* :ref:`region <elb_gcp_region>`
* :ref:`zone <elb_gcp_zone>`

In addition, you must be authenticated with the GCP project in the environment you are working on.
