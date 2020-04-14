.. _configuration:

Configuration variables
=======================

Cloud provider configuration
----------------------------

``ELB_GCP_PROJECT``
    Name of the GCP project to use.
``ELB_GCP_REGION``
    Name of the GCP region to use. Recommended value: ``us-east4``.
``ELB_GCP_ZONE`` 
    Name of the GCP zone to use. Recommended value: ``us-east4-b``.

Cluster configuration
---------------------

``ELB_CLUSTER_NAME``
    Name of the GKE cluster created. Default: ``${USER}-elastic-blast``.
``ELB_MACHINE_TYPE``
    Type of GCP machine to start as kubernetes worker. Default: ``n1-standard-32``.
``ELB_NUM_NODES``
    Number of nodes to start in the kubernetes cluster.
``ELB_USE_PREEMPTIBLE``
    Experimental feature to use pre-emptible nodes in the kubernetes cluster. Set to any value to enable. Default: disabled.
``ELB_MIN_NODES``
    *Applies to autoscaling only*: specifies the minimum number of nodes to keep in the kubernetes cluster.
``ELB_MAX_NODES``
    *Applies to autoscaling only*: specifies the maximum number of nodes to grow the kubernetes cluster to.
``ELB_PD_SIZE``
    Size of the persistent disk attached to the cluster. Default: ``500G``. Smaller disks than that result in performance degradation.
``ELB_LABELS``
    Labels for cloud resources, must be in the form ``key1=value1,key2=value2,...``. 
    They are handy for tracking costs in GCP. Default: ``program=$ELB_BLAST_PROGRAM,db=$ELB_DB``.
``ELB_ENABLE_STACKDRIVER_K8S``
    Enable stackdriver logging/monitoring for kubernetes. Default: disabled.

BLAST configuration options
---------------------------

``ELB_BLAST_PROGRAM`` 
    Program to run; one of: ``blast[pnx], tblast[nx], rpstblastn``. Default: ``blastn``.
``ELB_BLAST_OPTIONS`` 
    BLAST options to customize BLAST invocation. Default: None.
``ELB_OUTFMT``
    `BLAST output format <https://www.ncbi.nlm.nih.gov/books/NBK279684/#appendices.Options_for_the_commandline_a>`_ to use. Default: 11.
``ELB_DB`` 
    BLAST database name to search.
``ELB_BATCH_LEN`` 
    Number of bases/residues per query batch. Default: 5,000,000
``ELB_NUM_CPUS`` 
    Number of CPUs to use per BLAST execution (in a kubernetes job). Default: 30
``ELB_MEM_REQUEST`` 
    Minimum amount of RAM to allocate to a BLAST job.
``ELB_MEM_LIMIT`` 
    Maximum amount of RAM that a BLAST job can use.

Timeout configurations
----------------------
``ELB_JOB_TIMEOUT`` 
    Timeout for the **entire** ElasticBLAST run. Default: 2m
``ELB_BLAST_TIMEOUT`` 
    Timeout in seconds after which kubernetes will terminate a single BLAST job (i.e.: that corresponds to one of the query batches). Default: 3600
``ELB_INIT_BLASTDB_TIMEOUT`` 
    Timeout to wait for the persistent disk to be initialized with the BLASTDB. Default: 1 week
``ELB_COPY_QUERIES_TIMEOUT`` 
    Timeout to wait for the query splits to be copied onto the persistent disk. Default: 1 week

Input/output configuration options
----------------------------------
``ELB_QUERIES`` 
    Query sequence data for BLAST.
``ELB_RESULTS_BUCKET`` 
    where to save the output from ElasticBLAST.
``ELB_JOB_PATH`` 
    Path/URI to save batch job files. Default: jobs.

