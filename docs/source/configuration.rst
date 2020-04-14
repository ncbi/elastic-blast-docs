.. _configuration:

Configuration variables
=======================

Cloud provider configuration
----------------------------

``ELB_GCP_PROJECT``
^^^^^^^^^^^^^^^^^^^

    * Default: None
    * Values: String

    Name of the GCP project to use.

``ELB_GCP_REGION``
^^^^^^^^^^^^^^^^^^

    * Default: None
    * Values: String, see `GCP region/zone documentation <https://cloud.google.com/compute/docs/regions-zones#available>`_

    Name of the GCP region to use. Recommended value: ``us-east4``.

``ELB_GCP_ZONE`` 
^^^^^^^^^^^^^^^^

    * Default: None
    * Values: String, see `GCP region/zone documentation <https://cloud.google.com/compute/docs/regions-zones#available>`_

    Name of the GCP zone to use. Recommended value: ``us-east4-b``.

Cluster configuration
---------------------

``ELB_CLUSTER_NAME``
^^^^^^^^^^^^^^^^^^^^

    * Default: ``${USER}-elastic-blast``.
    * Values: String

    Name of the GKE cluster created. 

``ELB_MACHINE_TYPE``
^^^^^^^^^^^^^^^^^^^^

    * Default: ``n1-standard-32``.
    * Values: String, see `GCP machine types <https://cloud.google.com/compute/docs/machine-types#general_purpose>`_

    Type of GCP machine to start as kubernetes worker. 

    **NOTE**: The machine's available RAM must be as large as the size of the BLASTDB specified by `ELB_DB`_.

    We recommend that you choose a machine with at least 50% more RAM than the BLASTDB size.

``ELB_NUM_NODES``
^^^^^^^^^^^^^^^^^

    * Default: ``1``
    * Values: Positive integer

    Number of nodes to start in the kubernetes cluster.

``ELB_USE_PREEMPTIBLE``
^^^^^^^^^^^^^^^^^^^^^^^

    * Default: Disabled
    * Values: Any string. Set to any value to enable.

    Use `pre-emptible nodes <https://cloud.google.com/kubernetes-engine/docs/how-to/preemptible-vms>`_ in the kubernetes cluster.

``ELB_PD_SIZE``
^^^^^^^^^^^^^^^

    * Default: ``500G``
    * Values: String

    Size of the persistent disk attached to the cluster. 

    Format as <number> immediately followed by G for gigabytes, M for megabytes.

    **Note**: Smaller disks than ``500G`` result in performance degradation.

``ELB_LABELS``
^^^^^^^^^^^^^^

    * Default: ``program=$ELB_BLAST_PROGRAM,db=$ELB_DB``
    * Values: String, see `GCP label format documentation <https://cloud.google.com/compute/docs/labeling-resources#label_format>`_

    Labels for cloud resources, must be in the form ``key1=value1,key2=value2,...``. 
    They are handy for tracking costs in GCP. 

BLAST configuration options
---------------------------

``ELB_BLAST_PROGRAM`` 
^^^^^^^^^^^^^^^^^^^^^

    * Default: ``blastn``
    * Values: One of: ``blastp``, ``blastn``, ``blastx``, ``tblastn``, ``tblastx``, ``rpstblastn``

    BLAST program to run.

``ELB_BLAST_OPTIONS`` 
^^^^^^^^^^^^^^^^^^^^^

    * Default: None
    * Values: String, see `BLAST+ options <https://www.ncbi.nlm.nih.gov/books/NBK279684/#appendices.Options_for_the_commandline_a>`_

    BLAST options to customize BLAST invocation.

``ELB_OUTFMT``
^^^^^^^^^^^^^^

    * Default: ``11``
    * Values: String, see `BLAST+ options <https://www.ncbi.nlm.nih.gov/books/NBK279684/#appendices.Options_for_the_commandline_a>`_

    `BLAST output format <https://www.ncbi.nlm.nih.gov/books/NBK279684/#appendices.Options_for_the_commandline_a>`_ to use.

``ELB_DB`` 
^^^^^^^^^^

    * Default: None
    * Values: String

    BLAST database name to search. Run the command below to get a list of available options:

.. code-block:: bash

    update_blastdb.pl --source gcp --showall pretty

``ELB_BATCH_LEN`` 
^^^^^^^^^^^^^^^^^

    * Default: ``5000000``
    * Values: Positive integer

    Number of bases/residues per query batch.

    **NOTE**: this value should change along with `ELB_BLAST_PROGRAM`_. 

    Please use ``100000`` for ``blastp`` and ``rpstblastn`` and consult with the
    development team for other programs.

``ELB_NUM_CPUS`` 
^^^^^^^^^^^^^^^^

    * Default: ``30``
    * Values: Positive integer

    Number of CPUs to use per BLAST execution in a kubernetes job. 

    Must be less than the number of CPUs for the chosen `ELB_MACHINE_TYPE`_.

    For smaller BLAST databases (e.g.: ``swissprot``, ``pdbnt``) a smaller value (e.g.: 4) results in faster runtimes. For ``nt``, consider using a value of 30.

``ELB_MEM_REQUEST`` 
^^^^^^^^^^^^^^^^^^^

    * Default: None
    * Values: String

    Minimum amount of RAM to allocate to a BLAST job.

    Format as <number> immediately followed by G for gigabytes, M for megabytes.

    Must be less than available RAM for the chosen `ELB_MACHINE_TYPE`_.

``ELB_MEM_LIMIT`` 
^^^^^^^^^^^^^^^^^

    * Default: None
    * Values: String

    Maximum amount of RAM that a BLAST job can use.

    Format as <number> immediately followed by G for gigabytes, M for megabytes.

    Must be less than available RAM for the chosen `ELB_MACHINE_TYPE`_.

Input/output configuration options
----------------------------------

``ELB_QUERIES`` 
^^^^^^^^^^^^^^^

    * Default: None
    * Values: String 

    Query sequence data for BLAST. 

    Can be provided as a local path or GCS bucket URI to a single file/tarball.

``ELB_RESULTS_BUCKET`` 
^^^^^^^^^^^^^^^^^^^^^^

    * Default: None
    * Values: String

    GCS bucket URI where to save the output from ElasticBLAST.

Timeout configuration options
-----------------------------

``ELB_BLAST_TIMEOUT`` 
^^^^^^^^^^^^^^^^^^^^^

    * Default: ``3600``
    * Values: Positive integer

    Timeout in seconds after which kubernetes will terminate a single BLAST job (i.e.: that corresponds to one of the query batches).

``ELB_JOB_TIMEOUT`` 
^^^^^^^^^^^^^^^^^^^

    * Default: 2m
    * Values: String

    **Applicable only** if ``make timed_run`` is used. 

    Timeout for the **entire** ElasticBLAST run.

    Format as <number> immediately followed by s for seconds, m for minutes, h
    for hours (see `timeout flag in kubectl wait documetation
    <https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#wait>`_).

``ELB_INIT_BLASTDB_TIMEOUT`` 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    * Default: 1 week
    * Values: String

    Timeout to wait for the persistent disk to be initialized with the BLASTDB.

    Format as <number> immediately followed by s for seconds, m for minutes, h
    for hours (see `timeout flag in kubectl wait documetation
    <https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#wait>`_).

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

``ELB_JOB_PATH`` 
^^^^^^^^^^^^^^^^

    * Default: ``jobs``
    * Values: String

    Path/GCS bucket URI to save batch job files.

``ELB_MIN_NODES``
^^^^^^^^^^^^^^^^^

    * Default: ``1``
    * Values: Positive integer

    *Applies to autoscaling only*: specifies the minimum number of nodes to keep in the kubernetes cluster.

``ELB_MAX_NODES``
^^^^^^^^^^^^^^^^^

    * Default: ``8``
    * Values: Positive integer

    *Applies to autoscaling only*: specifies the maximum number of nodes to grow the kubernetes cluster to.

``ELB_ENABLE_STACKDRIVER_K8S``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    * Default: Disabled
    * Values: Any string. Set to any value to enable.

    Enable stackdriver logging/monitoring for kubernetes.

    Please see `GCP stackdriver documentation for associated pricing <https://cloud.google.com/stackdriver/pricing>_`.
