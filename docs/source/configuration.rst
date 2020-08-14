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

    Also supported via the environment variable: ``ELB_GCP_ZONE``.

.. code-block::

    [cloud-provider]
    gcp-zone = us-east4-b


Cluster configuration
---------------------

.. _elb_cluster_name:

``Cluster name``
^^^^^^^^^^^^^^^^

    Name of the GKE cluster created. 

    * Default: ``${USER}-elastic-blast``.
    * Values: String

    Also supported via the environment variable: ``ELB_CLUSTER_NAME``.

.. code-block::

    [cluster]
    name = my-cluster

.. _elb_num_nodes:

``Number of worker nodes``
^^^^^^^^^^^^^^^^^^^^^^^^^^

    Number of :ref:`machine type <elb_machine_type>` nodes to start in the kubernetes cluster.

    * Default: ``1``
    * Values: Positive integer

.. code-block::

    [cluster]
    num-nodes = 4

.. _elb_use_preemptible:

``Use preemptible nodes``
^^^^^^^^^^^^^^^^^^^^^^^^^

    Use `preemptible nodes <https://cloud.google.com/kubernetes-engine/docs/how-to/preemptible-vms>`_ in the kubernetes cluster.

    **Note**: This is only recommended if your ElasticBLAST search will take less than 24 hours.

    * Default: ``no``
    * Values: Any string. Set to ``yes`` enable.

.. code-block::

    [cluster]
    use-preemptible = yes

.. _elb_machine_type:

``Machine type``
^^^^^^^^^^^^^^^^

    Type of GCP machine to start as kubernetes worker. 

    **NOTE**: The machine's available RAM must be as large as the size of the
    BLASTDB specified by `BLAST database`_.

    We recommend that you choose a machine with at least 50% more RAM than the BLASTDB size.

    * Default: ``n1-standard-32``.
    * Values: String, see `GCP machine types <https://cloud.google.com/compute/docs/machine-types#general_purpose>`_

.. code-block::

    [cluster]
    machine-type = n1-standard-32

.. _elb_num_cpus:

``Number of CPUs`` 
^^^^^^^^^^^^^^^^^^

    Number of CPUs to use per BLAST execution in a kubernetes job. 

    Must be less than the number of CPUs for the chosen :ref:`machine type <elb_machine_type>`.

    For smaller BLAST databases (e.g.: ``swissprot``, ``pdbnt``) a smaller value (e.g.: 4) results in faster runtimes. For ``nt``, experiment using values of 15 and/or 30.

    * Default: ``30``
    * Values: Positive integer

.. code-block::

    [cluster]
    num-cpus = 30

.. _elb_pd_size:

``Persistent disk size``
^^^^^^^^^^^^^^^^^^^^^^^^

    Size of the persistent disk attached to the cluster. This should be large
    enough to store the BLAST database, query sequence data and the BLAST
    results.

    Format as <number> immediately followed by G for gigabytes, M for megabytes.

    **Note**: Smaller disks than ``1000G`` result in performance degradation.

    * Default: ``3000G``
    * Values: String

.. code-block::

    [cluster]
    pd-size = 1000G

.. _elb_min_nodes:

``Minimum number of nodes``
^^^^^^^^^^^^^^^^^^^^^^^^^^^

    **Experimental**.

    Specifies the minimum number of nodes in the kubernetes cluster, enabling auto-scaling.

    Requires `Maximum number of nodes`_.

    * Default: None
    * Values: Positive integer

.. code-block::

    [cluster]
    min-nodes = 1

.. _elb_max_nodes:

``Maximum number of nodes``
^^^^^^^^^^^^^^^^^^^^^^^^^^^

    **Experimental**.

    Specifies the maximum number of nodes in the kubernetes cluster, enabling auto-scaling.

    Requires `Minimum number of nodes`_.

    * Default: None
    * Values: Positive integer

.. code-block::

    [cluster]
    max-nodes = 1

.. _elb_labels:

``Cloud resource labels``
^^^^^^^^^^^^^^^^^^^^^^^^^

    Specifies the labels to attach to cloud resources created by ElasticBLAST.

    * Default: ``cluster-name={cluster_name},client-hostname={hostname},created={create_date},owner={username},project=elastic-blast,creator={username},program={blast_program},db={db}``
    * Values: String of key-value pairs separated by commas. See `GCP documentation on labels <https://cloud.google.com/compute/docs/labeling-resources#label_format>`_ for details.

.. code-block::

    [cluster]
    labels = key1=value1,key2=value2


BLAST configuration options
---------------------------

.. _elb_blast_program:

``BLAST program`` 
^^^^^^^^^^^^^^^^^

    BLAST program to run.

    * Default: ``blastn``
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

    If you do not specify an output format (with -outfmt), you can use `blast_formatter <https://www.ncbi.nlm.nih.gov/books/NBK279697/>`_ to format the results in any desired output format.  

    Below, we have specified "-outfmt 7" for the BLAST tabular format and requested blastp-fast mode.

    * Default: None
    * Values: String, see `BLAST+ options <https://www.ncbi.nlm.nih.gov/books/NBK279684/#appendices.Options_for_the_commandline_a>`_

.. code-block::

    [blast]
    options = -task blastp-fast -outfmt 7

.. _elb_db:

``BLAST database`` 
^^^^^^^^^^^^^^^^^^

    BLAST database name to search. To search a database provided in the cloud by the NCBI use the database name. To search your own custom database, upload the database files to a cloud storage bucket and provide the bucket's universal resource identifier (URI) plus the database name (see example below).

    * Default: None
    * Values: String. Run the command below to get a list of available options:

.. code-block:: bash

    update_blastdb.pl --source gcp --showall pretty

.. code-block::
    :caption: Sample BLAST database configuration

    [blast]
    db = nr

.. code-block::
    :caption: Sample custom BLAST database configuration

    [blast]
    db = gs://my-database-bucket/mydatabase

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

.. _elb_blast_db_margin:

``BLAST database memory margin (NOT currently supported)`` 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    This value specifies how much larger should the `Memory request for BLAST search`_  be made relative to the size of the `BLAST database`_ by default.

    * Default: ``1.1``
    * Values: A value over 1.0.

.. code-block::

    [blast]
    db-memory-margin = 1.1


.. _elb_mem_request:

``Memory request for BLAST search`` 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    Minimum amount of RAM to allocate to a BLAST search.

    Format as <number> immediately followed by G for gigabytes, M for megabytes.

    Must be less than available RAM for the chosen :ref:`machine type <elb_machine_type>`.

    * Default: `Auto-configured based on database choice`. Minimal value is ``0.5G``.
    * Values: String

    See also: 

    * `Motivation for memory requests and limits <https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/#motivation-for-memory-requests-and-limits>`_
    * `Exceed a container's memory limit <https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/#exceed-a-containers-memory-limit>`_

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
    * `Exceed a container's memory limit <https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/#exceed-a-containers-memory-limit>`_

.. code-block::

    [blast]
    mem-limit = 115G

Input/output configuration options
----------------------------------

.. _elb_queries:

``Query sequence data`` 
^^^^^^^^^^^^^^^^^^^^^^^

    Query sequence data for BLAST. 

    Can be provided as a local path or GCS bucket URI to a single file/tarball.

    * Default: None
    * Values: String 

.. code-block::

    [blast]
    queries = /home/${USER}/blast-queries.tar.gz

.. _elb_results_bucket:

``Results bucket`` 
^^^^^^^^^^^^^^^^^^

    GCS bucket URI where to save the output from ElasticBLAST. This bucket *must* exist prior to invoking ElasticBLAST.

    * Default: ``gs://${USER}-test``
    * Values: String

    Also supported via the environment variable: ``ELB_RESULTS_BUCKET``.

.. code-block::

    [blast]
    results-bucket = ${YOUR_RESULTS_BUCKET}

Timeout configuration options
-----------------------------

.. _elb_blast_timeout:

``BLAST timeout`` 
^^^^^^^^^^^^^^^^^

    Timeout in minutes after which kubernetes will terminate a single BLAST job (i.e.: that corresponds to one of the query batches).

    * Default: ``10080``     (1 week)
    * Values: Positive integer

.. code-block::

    [timeouts]
    blast-k8s-job = 10080

.. _elb_init_blastdb_timeout:

``BLASTDB initialization timeout`` 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    Timeout in minutes to wait for the :ref:`persistent disk <elb_pd_size>` to be initialized with the selected :ref:`elb_db`.

    * Default: ``45``
    * Values: Positive integer

.. code-block::

    [timeouts]
    init-pv = 45

Developer configuration options
-------------------------------

.. _elb_dont_delete_setup_jobs:

``ELB_DONT_DELETE_SETUP_JOBS``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    **Set via an environment variable**.

    * Default: Disabled
    * Values: Any string. Set to any value to enable.

    Do not delete the kubernetes setup jobs after they complete.

.. _elb_pause_after_init_pv:

``ELB_PAUSE_AFTER_INIT_PV``
^^^^^^^^^^^^^^^^^^^^^^^^^^^

    **Set via an environment variable**.

    * Default: 120
    * Values: Positive integer.

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
