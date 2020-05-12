.. _configuration:

Configuration variables
=======================

Cloud provider configuration
----------------------------

.. _gcp project:

``GCP Project``
^^^^^^^^^^^^^^^

    Name of the GCP project to use.

    * Default: None
    * Values: String

    Also supported via the environment variable: ``ELB_GCP_PROJECT``.

.. code-block::

    [cloud-provider]
    gcp-project = my-gcp-project

.. _gcp region:

``GCP Region``
^^^^^^^^^^^^^^

    Name of the GCP region to use. Recommended value: ``us-east4``.

    * Default: None
    * Values: String, see `GCP region/zone documentation <https://cloud.google.com/compute/docs/regions-zones#available>`_

.. code-block::

    [cloud-provider]
    gcp-region = us-east4

.. _gcp zone:

``GCP Zone`` 
^^^^^^^^^^^^^^^^^^^^^^^^^^^

    Name of the GCP zone to use. Recommended value: ``us-east4-b``.

    * Default: None
    * Values: String, see `GCP region/zone documentation <https://cloud.google.com/compute/docs/regions-zones#available>`_

.. code-block::

    [cloud-provider]
    gcp-zone = us-east4-b


Cluster configuration
---------------------

.. _elb_cluster_name:

``Cluster Name``
^^^^^^^^^^^^^^^^

    Name of the GKE cluster created. 

    * Default: ``${USER}-elastic-blast``.
    * Values: String

.. code-block::

    [cluster]
    name = my-cluster

.. _elb_machine_type:

``Machine Type``
^^^^^^^^^^^^^^^^

    Type of GCP machine to start as kubernetes worker. 

    **NOTE**: The machine's available RAM must be as large as the size of the BLASTDB specified by `DB`_.

    We recommend that you choose a machine with at least 50% more RAM than the BLASTDB size.

    * Default: ``n1-standard-32``.
    * Values: String, see `GCP machine types <https://cloud.google.com/compute/docs/machine-types#general_purpose>`_

.. code-block::

    [cluster]
    machine-type = n1-standard-32

.. _num nodes:

``Number of nodes``
^^^^^^^^^^^^^^^^^^^

    * Default: ``1``
    * Values: Positive integer

    Number of nodes to start in the kubernetes cluster.

.. _elb_use_preemptible:

``ELB_USE_PREEMPTIBLE``
^^^^^^^^^^^^^^^^^^^^^^^

    * Default: Disabled
    * Values: Any string. Set to any value to enable.

    Use `preemptible nodes <https://cloud.google.com/kubernetes-engine/docs/how-to/preemptible-vms>`_ in the kubernetes cluster.

    **Note**: This is only recommended if your ElasticBLAST search will take a few hours (less than 24).

.. _elb_pd_size:

``ELB_PD_SIZE``
^^^^^^^^^^^^^^^

    * Default: ``500G``
    * Values: String

    Size of the persistent disk attached to the cluster. 

    Format as <number> immediately followed by G for gigabytes, M for megabytes.

    **Note**: Smaller disks than ``500G`` result in performance degradation.

.. _elb_labels:

``ELB_LABELS``
^^^^^^^^^^^^^^

    * Default: ``program=$ELB_BLAST_PROGRAM,db=$ELB_DB``
    * Values: String, see `GCP label format documentation <https://cloud.google.com/compute/docs/labeling-resources#label_format>`_

    Labels for cloud resources, must be in the form ``key1=value1,key2=value2,...``. 
    They are handy for tracking costs in GCP. 

BLAST configuration options
---------------------------

.. _blast program:

``BLAST Program`` 
^^^^^^^^^^^^^^^^^

    BLAST program to run.

    * Default: ``blastn``
    * Values: One of: ``blastp``, ``blastn``

.. * Values: One of: ``blastp``, ``blastn``, ``blastx``, ``tblastn``, ``tblastx``, ``rpstblastn``

.. _elb_blast_options:

``ELB_BLAST_OPTIONS`` 
^^^^^^^^^^^^^^^^^^^^^

    * Default: None
    * Values: String, see `BLAST+ options <https://www.ncbi.nlm.nih.gov/books/NBK279684/#appendices.Options_for_the_commandline_a>`_

    BLAST options to customize BLAST invocation.

.. _elb_outfmt:

``ELB_OUTFMT``
^^^^^^^^^^^^^^

    * Default: ``11``
    * Values: String, see `BLAST+ options <https://www.ncbi.nlm.nih.gov/books/NBK279684/#appendices.Options_for_the_commandline_a>`_

    `BLAST output format <https://www.ncbi.nlm.nih.gov/books/NBK279684/#appendices.Options_for_the_commandline_a>`_ to use.

.. _db:

``BLAST database`` 
^^^^^^^^^^^^^^^^^^

    * Default: None
    * Values: String

    BLAST database name to search. Run the command below to get a list of available options:

.. code-block:: bash

    update_blastdb.pl --source gcp --showall pretty

.. _elb_batch_len:

``ELB_BATCH_LEN`` 
^^^^^^^^^^^^^^^^^

    * Default: ``5000000``
    * Values: Positive integer

    Number of bases/residues per query batch.

    **NOTE**: this value should change along with `BLAST PROGRAM`_. 

    Please use ``100000`` for ``blastp`` and ``rpstblastn`` and consult with the
    development team for other programs.

.. _elb_num_cpus:

``ELB_NUM_CPUS`` 
^^^^^^^^^^^^^^^^

    * Default: ``30``
    * Values: Positive integer

    Number of CPUs to use per BLAST execution in a kubernetes job. 

    Must be less than the number of CPUs for the chosen `ELB_MACHINE_TYPE`_.

    For smaller BLAST databases (e.g.: ``swissprot``, ``pdbnt``) a smaller value (e.g.: 4) results in faster runtimes. For ``nt``, consider using a value of 30.

.. _elb_mem_request:

``ELB_MEM_REQUEST`` 
^^^^^^^^^^^^^^^^^^^

    * Default: None
    * Values: String

    Minimum amount of RAM to allocate to a BLAST job.

    Format as <number> immediately followed by G for gigabytes, M for megabytes.

    Must be less than available RAM for the chosen `ELB_MACHINE_TYPE`_.

.. _elb_mem_limit:

``ELB_MEM_LIMIT`` 
^^^^^^^^^^^^^^^^^

    * Default: None
    * Values: String

    Maximum amount of RAM that a BLAST job can use.

    Format as <number> immediately followed by G for gigabytes, M for megabytes.

    Must be less than available RAM for the chosen `ELB_MACHINE_TYPE`_.

Input/output configuration options
----------------------------------

.. _queries:

``QUERIES`` 
^^^^^^^^^^^^^^^

    * Default: None
    * Values: String 

    Query sequence data for BLAST. 

    Can be provided as a local path or GCS bucket URI to a single file/tarball.

.. _results bucket:

``RESULTS BUCKET`` 
^^^^^^^^^^^^^^^^^^^^^^

    * Default: None
    * Values: String

    GCS bucket URI where to save the output from ElasticBLAST.

Timeout configuration options
-----------------------------

.. _elb_blast_timeout:

``ELB_BLAST_TIMEOUT`` 
^^^^^^^^^^^^^^^^^^^^^

    * Default: ``3600``
    * Values: Positive integer

    Timeout in seconds after which kubernetes will terminate a single BLAST job (i.e.: that corresponds to one of the query batches).

.. _elb_job_timeout:

``ELB_JOB_TIMEOUT`` 
^^^^^^^^^^^^^^^^^^^

    * Default: 2m
    * Values: String

    **Applicable only** if ``make timed_run`` is used. 

    Timeout for the **entire** ElasticBLAST run.

    Format as <number> immediately followed by s for seconds, m for minutes, h
    for hours (see `timeout flag in kubectl wait documetation
    <https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#wait>`_).

.. _elb_init_blastdb_timeout:

``ELB_INIT_BLASTDB_TIMEOUT`` 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    * Default: 1 week
    * Values: String

    Timeout to wait for the persistent disk to be initialized with the BLASTDB.

    Format as <number> immediately followed by s for seconds, m for minutes, h
    for hours (see `timeout flag in kubectl wait documetation
    <https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#wait>`_).

.. _elb_copy_queries_timeout:

``ELB_COPY_QUERIES_TIMEOUT`` 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    * Default: 1 week
    * Values: String

    Timeout to wait for the query splits to be copied onto the persistent disk.

    Format as <number> immediately followed by s for seconds, m for minutes, h
    for hours (see `timeout flag in kubectl wait documetation
    <https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#wait>`_).

Developer configuration options
-------------------------------

.. _elb_job_path:

``ELB_JOB_PATH`` 
^^^^^^^^^^^^^^^^

    * Default: ``jobs``
    * Values: String

    Path/GCS bucket URI to save batch job files.

.. _elb_min_nodes:

``ELB_MIN_NODES``
^^^^^^^^^^^^^^^^^

    * Default: ``1``
    * Values: Positive integer

    *Applies to autoscaling only*: specifies the minimum number of nodes to keep in the kubernetes cluster.

.. _elb_max_nodes:

``ELB_MAX_NODES``
^^^^^^^^^^^^^^^^^

    * Default: ``8``
    * Values: Positive integer

    *Applies to autoscaling only*: specifies the maximum number of nodes to grow the kubernetes cluster to.

.. _elb_enable_stackdriver_k8s:

``ELB_ENABLE_STACKDRIVER_K8S``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    * Default: Disabled
    * Values: Any string. Set to any value to enable.

    Enable stackdriver logging/monitoring for kubernetes.

    Please see `GCP stackdriver documentation for associated pricing <https://cloud.google.com/stackdriver/pricing>_`.
