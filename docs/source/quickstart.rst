.. _quickstart:

Quickstart
==========

Overview of ElasticBLAST usage
------------------------------

.. figure:: ElasticBlastOperations.png
   :alt: Overview of ElasticBLAST usage
   :class: with-border



Get ElasticBLAST
----------------

.. code-block:: shell

    curl -sO https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast
    curl -sO https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast.md5
    md5sum -c elastic-blast.md5
    chmod +x elastic-blast
    # Optional: move elastic-blast to the desired installation path


The code examples below assume that ElasticBLAST was installed in the current working directory.


See version and help
--------------------

To see the version of ``elastic-blast`` you are using:

.. code-block:: shell

   ./elastic-blast --version

To see the help message:

.. code-block:: shell

   ./elastic-blast --help


Configure it
------------

The minimal configuration requires: 

#. Cloud service provider configuration (see :ref:`GCP <gcp>` or :ref:`AWS <aws>` for details),

#. :ref:`query sequences <elb_queries>` in a single file or tarball, 

#. a :ref:`cloud storage bucket for results <elb_results_bucket>`. This value must start with ``gs://`` or ``s3://``.

#. basic BLAST parameters (:ref:`program <elb_blast_program>` and :ref:`database <elb_db>`), and

#. :ref:`elb_num_nodes` to start.



They can be provided on a standard ini configuration file, e.g.:

.. code-block::
    :name: minimal-config
    :linenos:

    [cloud-provider]
    gcp-project = ${YOUR_GCP_PROJECT_ID}
    gcp-region = us-east4   
    gcp-zone = us-east4-b

    [cluster]
    num-nodes = 3

    [blast]
    program = blastp
    db = nr
    queries = gs://elastic-blast-samples/queries/protein/BDQE01.1.fsa_aa
    results-bucket = ${YOUR_RESULTS_BUCKET}
    options = -task blastp-fast -evalue 0.01 -outfmt 7 

In addition to the minimal parameters, the configuration file above includes some BLAST options.
The search above should take about 30 minutes to run and cost less than $3 in GCP in July 2020.  Using :ref:`preemptible nodes<ELB_USE_PREEMPTIBLE>` can make it less expensive.

See :ref:`configuration` for details on all the configuration parameters.

Run it!
-------

.. code-block:: bash

    ./elastic-blast submit --cfg ${CONFIG_FILE} --loglevel DEBUG

The submit command can take several minutes as it brings up cloud resources and downloads the BLAST database.
**NOTE: currently you can only have one ElasticBLAST search running at a time**.

You can also add ``--sync`` to the above command-line, in which case ``elastic-blast`` will aim to shut 
down cloud resources when it is done.  In this case, it is important that your computer stays powered up and connected 
to the internet, so that ``elastic-blast`` can properly manage resources.
However, because ``elastic-blast`` is still in active development, it is
**required** that you run ``elastic-blast delete`` after every ElasticBLAST
invocation.

If you are running ``elastic-blast --sync`` in a remote/shared linux server,
please consider using ``nohup`` or a terminal multiplexer (e.g.: ``screen`` or
``tmux``) to keep the process alive in the event of network disconnection or log
out.


Monitor progress
----------------
To check on the progress of the search, inspect the logfile
(``elastic-blast.log`` by default) and/or run the command below:

.. code-block:: bash
    :name: status

    ./elastic-blast status --cfg ${CONFIG_FILE} --loglevel DEBUG

The status command will not return proper results until the submit command has finished.

**If you are running ElasticBLAST on GCP**, an alternate way to monitor the
progress is to inspect the kubernetes pods/nodes activity:

.. code-block:: bash
    :name: kubectl-monitor

    kubectl get pods -o wide
    kubectl top pods --containers
    kubectl top nodes

The `GCP web console <https://console.cloud.google.com/kubernetes/list>`_
provides a graphical user interface to monitor your kubernetes cluster.

**If you are running ElasticBLAST on AWS**, you can visit the web intefaces for 
`CloudFormation <https://console.aws.amazon.com/cloudformation/>`_ and
`Batch <https://console.aws.amazon.com/batch/>`_ 
to monitor the progress of your cloud resource creation and jobs respectively.

Problems? Search taking too long? Please see :ref:`support`.

Get results
-----------

Run one of the commands (depending on which cloud service provider you used) below to download the results:

.. code-block:: bash

    # For GCP
    gsutil -qm cp ${YOUR_RESULTS_BUCKET}/*.out.gz .
    # For AWS, requires AWS CLI SDK
    aws s3 cp ${YOUR_RESULTS_BUCKET}/*.out.gz . 

Clean up
--------
This step is **critical**, please do not omit it, even if you ran Ctrl-C when
starting ElasticBLAST. If you do not clean up your cloud resources, you will accrue charges from
your cloud service provider.  It is also recommended each time you start a new
ElasticBLAST search. 

.. code-block:: bash

    ./elastic-blast delete --cfg ${CONFIG_FILE} --loglevel DEBUG


The delete command will take a few minutes to run as it needs to manage multiple cloud resources.

**If you are running ElasticBLAST on GCP**, you may verify that your cloud resources have been deleted by running: 

.. code-block:: bash

  gcloud container clusters list --project <your-gcp-project-id>
  gcloud compute disks list --project <your-gcp-project-id>

This will show all clusters and disks in your project (even from other users).
If nothing is returned, then no clusters are running and no disks are being
used. Please see :ref:`PD_LEAK` if your cluster or disk are not properly
deleted for instructions on deleting them.

**If you are running ElasticBLAST on AWS**, you may verify that your cloud resources have been deleted by running: 

.. code-block:: bash

  aws cloudformation describe-stacks --stack-name elasticblast-${USER} --output text 
  aws ec2 describe-instances --filter Name=tag:billingcode,Values=elastic-blast Name=tag:Owner,Values=${USER} --query "Reservations[*].Instances[*].InstanceId" --output text 

These commands will show the CloudFormation stack created by ElasticBLAST by
default as well as the instance IDs of the EC2 instances it created. If you run into difficulty, please
contact us via the information provided in :ref:`support`.
