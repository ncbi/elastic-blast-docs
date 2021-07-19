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


.. _configuration:

Configuration variables
=======================

Cloud provider configuration
----------------------------

.. _elb_gcp_project:

``GCP project``
^^^^^^^^^^^^^^^

    GCP project ID to use.

    * Default: None
    * Values: String, see `Identifying projects <https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects>`_
    * Applies to: GCP

    Also supported via the environment variable: ``ELB_GCP_PROJECT``.

.. code-block::

    [cloud-provider]
    gcp-project = my-gcp-project

.. _elb_gcp_region:

``GCP region``
^^^^^^^^^^^^^^

    Name of the GCP region to use. Recommended value: ``us-east4``.

    * Default: None
    * Values: String, see `GCP region/zone documentation <https://cloud.google.com/compute/docs/regions-zones#available>`_
    * Applies to: GCP

    Also supported via the environment variable: ``ELB_GCP_REGION``.

.. code-block::

    [cloud-provider]
    gcp-region = us-east4

.. _elb_gcp_zone:

``GCP zone`` 
^^^^^^^^^^^^

    Name of the GCP zone to use. Recommended value: ``us-east4-b``.

    * Default: None
    * Values: String, see `GCP region/zone documentation <https://cloud.google.com/compute/docs/regions-zones#available>`_
    * Applies to: GCP

    Also supported via the environment variable: ``ELB_GCP_ZONE``.

.. code-block::

    [cloud-provider]
    gcp-zone = us-east4-b

.. _elb_aws_region:

``AWS Region``
^^^^^^^^^^^^^^

    Name of the AWS region to use. Recommended value: ``us-east-1``.

    * Default: None
    * Values: String, any region that supports Batch, see `AWS documentation for details <https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/>`_
    * Applies to: AWS

    For background information about AWS regions, please see the `AWS
    documentation
    <https://aws.amazon.com/about-aws/global-infrastructure/regions_az/>`_.

.. code-block::

    [cloud-provider]
    aws-region = us-east-1

.. _elb_aws_vpc:

``AWS VPC``
^^^^^^^^^^^

    Optional: AWS VPC ID to use (must exist in the chosen :ref:`AWS region
    <elb_aws_region>`) or keyword ``none``.

    * Default: 

      * For AWS Accounts that support ``EC2-VPC``, the `default VPC <https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html>`_ will be used.
      * For AWS accounts without default VPCs or if ``none`` is specified, a new VPC will be created with as many subnets as there are availability zones in the region.
    * Values: String
    * Applies to: AWS

.. _elb_aws_subnet:

``AWS Subnet``
^^^^^^^^^^^^^^

    Optional: A comma-separated list of AWS Subnet IDs to use; must exist in the chosen :ref:`AWS region
    <elb_aws_region>` and :ref:`AWS VPC <elb_aws_vpc>`.

    * Default:

      * For AWS Accounts that support ``EC2-VPC``, the `default subnets <https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html>`_ will be used.
      * For AWS accounts without default VPCs or if left unspecified, as many subnets as there are availability zones in the region will be created.
    * Values: String
    * Applies to: AWS

.. code-block::

    [cloud-provider]
    aws-subnet = subnet-SOME-RANDOM-STRING

.. _elb_aws_security_group:

``AWS Security Group``
^^^^^^^^^^^^^^^^^^^^^^

    Optional: Name of the AWS security group to use; must exist in the chosen :ref:`AWS region
    <elb_aws_region>`.

    * Default: None
    * Values: String
    * Applies to: AWS

.. code-block::

    [cloud-provider]
    aws-security-group = sg-SOME-RANDOM-STRING

.. _elb_aws_key_pair:

``AWS Key Pair``
^^^^^^^^^^^^^^^^

    Optional: Name of the AWS key pair to use to login to EC2 instances; must exist in the chosen :ref:`AWS region <elb_aws_region>`.

    * Default: None
    * Values: String
    * Applies to: AWS

.. code-block::

    [cloud-provider]
    aws-key-pair = my-aws-key-name



Cluster configuration
---------------------

.. _elb_cluster_name:

``Cluster name``
^^^^^^^^^^^^^^^^

    Name of the GKE cluster created or the AWS CloudFormation stack (and related resources).  

    The name may contain only lowercase alphanumerics and ‘-’, must start with a letter and end with an alphanumeric, and must be no longer than 40 characters.

    * Default: ``elasticblast-${USER}``
    * Values: String

    Also supported via the environment variable: ``ELB_CLUSTER_NAME``.

.. code-block::

    [cluster]
    name = my-cluster

.. _elb_num_nodes:

``Number of worker nodes``
^^^^^^^^^^^^^^^^^^^^^^^^^^

    Specifies the maximum number of worker nodes of the configured :ref:`machine type <elb_machine_type>` to use.

    * Default: ``1``
    * Values: Positive integer

.. code-block::

    [cluster]
    num-nodes = 4

.. _elb_use_preemptible:

``Use preemptible nodes``
^^^^^^^^^^^^^^^^^^^^^^^^^

    Use `spot instances <https://aws.amazon.com/ec2/spot/>`_ and `preemptible nodes <https://cloud.google.com/kubernetes-engine/docs/how-to/preemptible-vms>`_ to run ElasticBLAST.  This may lead to reduced costs, but longer runtimes."

    **Note**: This is an *experimental* feature in AWS. Turning this on bids on instance prices up to the full price, which is almost guaranteed to save you money.

    **Note**: Pre-emptible nodes are rebooted after 24 hours (by GCP).  This is
    fine in most cases as Kubernetes will restart the node and resubmit the
    search (i.e., batch) that was interrupted.  The batches that have already
    been processed are not lost.  The only issue is if a single batch takes
    longer than 24 hours. We expect the overwhelming majority of
    Elastic-BLAST searches to take at most several hours, so this should not be
    an issue at all.

    * Default: ``no``
    * Values: Any string. Set to ``yes`` enable.

    Also supported via the environment variable: ``ELB_USE_PREEMPTIBLE``.

.. code-block::

    [cluster]
    use-preemptible = yes

.. _elb_machine_type:

``Machine type``
^^^^^^^^^^^^^^^^

    Type of GCP or AWS machine to start as worker node(s). 

    **NOTE**: The machine's available RAM should be large enough to contain the sequences in the database (one byte per residue or one byte per four bases) plus ~20%.

    * Default: ``n1-standard-32`` for GCP, ``m5.8xlarge`` for AWS.
    * The default machines have 32 cores and about 120GB of RAM.
    * Values: String, see `GCP machine types <https://cloud.google.com/compute/docs/machine-types>`_ or `AWS instance types <https://aws.amazon.com/ec2/instance-types>`_ accordingly.

    **Note**: ElasticBLAST on AWS supports the specification of an ``optimal``
    instance type. 

    * This is an *experimental* feature. 
    * **Requires** the specification of the :ref:`memory limit <elb_mem_limit>` to use per BLAST job.
    * Benefits include: greater breadth of available AWS instance types
      (beneficial for getting spot instances) and freeing the end user from
      having to match instance types to their BLAST search. 
    * Potential downside: AWS Batch does not guarantee optimal performance of
      the instances it selects.

.. code-block::

    [cluster]
    machine-type = n1-standard-32

.. _elb_num_cpus:

``Number of CPUs`` 
^^^^^^^^^^^^^^^^^^

    Number of CPUs to use per BLAST execution in a kubernetes or AWS Batch job. 

    Must be less than the number of CPUs for the chosen :ref:`machine type <elb_machine_type>`.

    * Default: 16 or as many CPUs as are available on the selected :ref:`machine type <elb_machine_type>`, whichever is smaller.
    * Values: Positive integer

.. code-block::

    [cluster]
    num-cpus = 16

.. _elb_pd_size:

``Persistent disk size``
^^^^^^^^^^^^^^^^^^^^^^^^

    Size of the persistent disk attached to the cluster (GCP) or individual instances (AWS). 
    This should be large enough to store the BLAST database, query sequence data and the BLAST
    results.

    Format as <number> immediately followed by G for gigabytes, M for megabytes.

    **Note**: Smaller disks than ``1000G`` result in performance degradation in GCP.

    * Default: ``3000G``
    * Values: String

.. code-block::

    [cluster]
    pd-size = 1000G

.. _elb_labels:

``Cloud resource labels``
^^^^^^^^^^^^^^^^^^^^^^^^^

    Specifies the labels to attach to cloud resources created by ElasticBLAST in GCP.

    * Default: ``cluster-name={cluster_name},client-hostname={hostname},created={create_date},owner={username},project=elastic-blast,creator={username},program={blast_program},db={db}``
    * Values: String of key-value pairs separated by commas. See `GCP documentation on labels <https://cloud.google.com/compute/docs/labeling-resources>`_ for details.

.. code-block::

    [cluster]
    labels = key1=value1,key2=value2

.. _blast_config_options:

BLAST configuration options
---------------------------

.. _elb_blast_program:

``BLAST program`` 
^^^^^^^^^^^^^^^^^

    BLAST program to run.

    * Default: None
    * Values: One of: ``blastp``, ``blastn``, ``megablast``, ``blastx``, ``tblastn``, ``tblastx``, ``psiblast``, ``rpsblast``, ``rpstblastn``

.. NOTE: keep these values in sync with get_query_batch_size

.. code-block::

    [blast]
    program = blastp

.. _elb_blast_options:

``BLAST options`` 
^^^^^^^^^^^^^^^^^

    BLAST options to customize BLAST invocation.

    *Note*: the default output format in ElasticBLAST is 11 (BLAST archive). 

    If you do not specify an output format (with -outfmt), you can use `blast_formatter <https://www.ncbi.nlm.nih.gov/books/NBK569843/>`_ to format the results in any desired output format.  

    Below, we have specified "-outfmt 7" for the BLAST tabular format and requested blastp-fast mode.

    * Default: None
    * Values: String, see `BLAST+ options <https://www.ncbi.nlm.nih.gov/books/NBK279684/#appendices.Options_for_the_commandline_a>`_

.. code-block::

    [blast]
    options = -task blastp-fast -outfmt 7

.. _elb_db:

``BLAST database`` 
^^^^^^^^^^^^^^^^^^

    BLAST database name to search. 

    To search a `database provided in the cloud by the NCBI <https://github.com/ncbi/blast_plus_docs/blob/master/README.md#blast-databases>`_, simply use its name.

    To search your own custom database, upload the database files to a cloud
    storage bucket and provide the bucket's universal resource identifier (URI)
    plus the database name (see example and tip below).

    * Default: None
    * Values: String. 

.. code-block::
    :caption: Sample BLAST database configuration

    [blast]
    db = nr

.. code-block::
    :caption: Sample custom BLAST database configuration

    [blast]
    db = gs://my-database-bucket/mydatabase

**Tip**: to upload your BLAST database to a cloud bucket, please refer to the
cloud vendor documentation (`AWS <https://docs.aws.amazon.com/AmazonS3/latest/user-guide/upload-objects.html>`_
or `GCP <https://cloud.google.com/storage/docs/uploading-objects>`_).

If you have BLAST+ available in your machine, you can run the command below to
get a list of BLAST databases provided by NCBI:

.. code-block:: bash
    :caption: When working on AWS

    update_blastdb.pl --source aws --showall pretty

.. code-block:: bash
    :caption: When working on GCP

    update_blastdb.pl --source gcp --showall pretty

.. _elb_batch_len:

``Batch length`` 
^^^^^^^^^^^^^^^^

    Number of bases/residues per query batch.

    **NOTE**: this value should change with `BLAST program`_. 

    * Default: `Auto-configured for supported programs`.
    * Values: Positive integer

    Also supported via the environment variable: ``ELB_BATCH_LEN``.

.. code-block::

    [blast]
    batch-len = 10000

.. _elb_mem_request:

``Memory request for BLAST search`` 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    Minimum amount of RAM to allocate to a BLAST search.

    Format as <number> immediately followed by G for gigabytes, M for megabytes.

    Must be less than available RAM for the chosen :ref:`machine type <elb_machine_type>`.

    * Default: `Auto-configured based on database choice`. Minimal value is ``0.5G``.
    * Values: String
    * Applies to: GCP

    See also: 

    * `Motivation for memory requests and limits <https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/#motivation-for-memory-requests-and-limits>`_
    * `Exceed a container's memory limit <https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/#exceed-a-container-s-memory-limit>`_

.. code-block::

    [blast]
    mem-request = 95G

.. _elb_mem_limit:

``Memory limit for BLAST search`` 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    Maximum amount of RAM that a BLAST search can use.

    Format as <number> immediately followed by G for gigabytes, M for megabytes.

    Must be less than available RAM for the chosen :ref:`machine type <elb_machine_type>`.

    * Default: `Auto-configured based on database choice`. Maximal value is ``0.95`` of the RAM available in the :ref:`machine type <elb_machine_type>`.
    * Values: String

    See also: 

    * `Motivation for memory requests and limits <https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/#motivation-for-memory-requests-and-limits>`_
    * `Exceed a container's memory limit <https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/#exceed-a-container-s-memory-limit>`_

.. code-block::

    [blast]
    mem-limit = 115G

.. _elb_usage_reporting:

``BLAST_USAGE_REPORT`` 
^^^^^^^^^^^^^^^^^^^^^^

    Controls the usage reporting via the environment variable ``BLAST_USAGE_REPORT``.

    For additional details, please see the `BLAST+ privacy statement <https://www.ncbi.nlm.nih.gov/books/NBK569851/>`_.

    * Default: ``true``
    * Values: ``true`` or ``false``


Input/output configuration options
----------------------------------

.. _elb_queries:

``Query sequence data`` 
^^^^^^^^^^^^^^^^^^^^^^^

    Query sequence data for BLAST. 

    Can be provided as a local path or GCS or AWS bucket URI to a file/tarball. Multiple files can be provided as as space-separated list or in "list files". Any file with the file extension ``.query-list`` is considered a "list file", where each line contains a local path or a cloud bucket URI.

    * Default: None
    * Values: String 

.. code-block::

    [blast]
    queries = /home/${USER}/blast-queries.tar.gz

.. _elb_results:

``Results`` 
^^^^^^^^^^^

    GCS or AWS S3 bucket URI where to save the results from ElasticBLAST. 

    **This value uniquely identifies a single ElasticBLAST search - please keep track of this**.

    **Note**: This bucket *must* exist prior to invoking ElasticBLAST and it
    *must* include the ``gs://`` or ``s3://`` prefix.

    * Default: None
    * Values: String

.. code-block::

    [blast]
    results = ${YOUR_RESULTS_BUCKET}

.. _elb_logfile:

``Log file`` 
^^^^^^^^^^^^

    File name to save logging output. Can only be set via the command line argument ``--logfile``.

    * Default: ``elastic-blast.log``
    * Values: String

.. _elb_loglevel:

``Log level`` 
^^^^^^^^^^^^^

    Sets the logging threshold. Can only be set via the command line argument ``--loglevel``.

    * Default: ``INFO``
    * Values: One of ``DEBUG``, ``INFO``, ``WARNING``, ``ERROR``, ``CRITICAL``


Timeout configuration options
-----------------------------

.. _elb_blast_timeout:

``BLAST timeout`` 
^^^^^^^^^^^^^^^^^

    Timeout in minutes after which kubernetes will terminate a single BLAST job (i.e.: that corresponds to one of the query batches).

    * Default: ``10080``     (1 week)
    * Values: Positive integer
    * Applies to: GCP

.. code-block::

    [timeouts]
    blast-k8s-job = 10080

.. _elb_init_blastdb_timeout:

``BLASTDB initialization timeout`` 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    Timeout in minutes to wait for the :ref:`persistent disk <elb_pd_size>` to be initialized with the selected :ref:`elb_db`.

    * Default: ``45``
    * Values: Positive integer
    * Applies to: GCP

.. code-block::

    [timeouts]
    init-pv = 45

Developer configuration options
-------------------------------

.. _elb_dont_delete_setup_jobs:

``ELB_DONT_DELETE_SETUP_JOBS``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    **Set via an environment variable, applies to GCP only**.

    * Default: Disabled
    * Values: Any string. Set to any value to enable.
    * Applies to: GCP

    Do not delete the kubernetes setup jobs after they complete.

.. _elb_pause_after_init_pv:

``ELB_PAUSE_AFTER_INIT_PV``
^^^^^^^^^^^^^^^^^^^^^^^^^^^

    **Set via an environment variable, applies to GCP only**.

    * Default: 120
    * Values: Positive integer.
    * Applies to: GCP

    Time in seconds to wait after persistent volume gets initialized to prevent
    mount errors on BLAST kubernetes jobs.

.. .. _elb_enable_stackdriver_k8s:
.. 
.. ``ELB_ENABLE_STACKDRIVER_K8S``
.. ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. 
..     * Default: Disabled
..     * Values: Any string. Set to any value to enable.
.. 
..     Enable stackdriver logging/monitoring for kubernetes.
.. 
..     Please see `GCP stackdriver documentation for associated pricing <https://cloud.google.com/stackdriver/pricing>_`.
