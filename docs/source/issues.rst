.. _issues:

Known issues
============

.. _elb_batch_len_setting:

Batch length setting
--------------------

The value of :ref:`ELB_BATCH_LEN` greatly affects performance. The defaults are reasonable, but may not be optimal in some cases. We are in the process of determining better values for various programs and use cases.


.. _pd_leak:

Persistent disk not properly deleted
------------------------------------

As part of its normal operation ElasticBLAST starts a
:ref:`persistent disk <elb_pd_size>` and under some circumstances it
is not properly deleted. To double check and delete it, please run the commands
below accordingly:

.. code-block:: bash

   gcloud compute disks list # to list disks in GCP
   gcloud compute disks delete ${DISK_NAME}  # to delete relevant disks


.. _cluster_leak:

Compute cluster not properly deleted
------------------------------------

ElasticBLAST allocates a :ref:`compute cluster <elb_cluster_name>` in the cloud to perform BLAST searches. Under some circumstances it is not properly deleted. To check if the cluster is still active and delete it, please run the commands below:

.. code-block:: bash

   gcloud container clusters list  # to list GKE clusters
   gcloud container clusters delete ${ELB_CLUSTER_NAME}  # to delete your cluster


.. _file_leak:

Files left in cloud storage
---------------------------

ElasticBLAST uses cloud storage to temporally store query sequences and internal logs and metadata so that they are easily accessible during its operation. Sometimes deleting these files after the search is not successful. To double check and delete them, please run the commands below:

.. code-block:: bash

   gsutil ls gs://${ELB_RESULTS_BUCKET}/query_batches  # to list query files
   gsutil -m rm gs://${ELB_RESULTS_BUCKET}/query_batches/*  # to delete query files

   gsutil ls gs://${ELB_RESULTS_BUCKET}/logs  # to list log files
   gsutil -m rm gs://${ELB_RESULTS_BUCKET}/logs/*  # to delete log files

   gsutil ls gs://${ELB_RESULTS_BUCKET}/metadata  # list metadata files
   gsutil -m rm gs://${ELB_RESULTS_BUCKET}/logs/*  # to delete metadata files


.. _early_shutdown:

A synchronous search may shut down too early
--------------------------------------------

When doing a synchronous search (submitted with the ``--sync`` option), ElasticBLAST is continuously probing for search status to know when the search is done. When the status check times out ElasticBLAST interprets it as search failure and shuts down the cluster.

.. _too_many_jobs:

Too many query batches leads to failed execution
------------------------------------------------

ElasticBLAST divides query sequences into batches and searches them in parallel. The :ref:`ELB_BATCH_LEN` parameter controls the size of a single batch. If the ElasticBLAST configuration leads to more than 5,000 query batches, ElasticBLAST will exit with an error message prompting you to increase :ref:`ELB_BATCH_LEN` parameter to decrease the number of query batches.
