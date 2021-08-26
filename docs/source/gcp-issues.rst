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

.. _gcp_issues:

Known issues on GCP
===================

.. _file_leak:

Files left in cloud storage
---------------------------

ElasticBLAST uses cloud storage to temporally store query sequences and
internal logs and metadata so that they are easily accessible during its
operation. Sometimes deleting these files after the search is not successful.
To double check and delete them, please run the commands below. 
``ELB_RESULTS`` below represents the location where your results are stored.

.. code-block:: bash

   gsutil ls gs://${ELB_RESULTS}/query_batches  # to list query files
   gsutil -m rm gs://${ELB_RESULTS}/query_batches/*  # to delete query files

   gsutil ls gs://${ELB_RESULTS}/logs  # to list log files
   gsutil -m rm gs://${ELB_RESULTS}/logs/*  # to delete log files

   gsutil ls gs://${ELB_RESULTS}/metadata  # list metadata files
   gsutil -m rm gs://${ELB_RESULTS}/logs/*  # to delete metadata files

.. _elb_batch_len_setting:

Batch length setting
--------------------

The value of :ref:`ELB_BATCH_LEN` greatly affects performance. The defaults are reasonable, but may not be optimal in some cases. We are in the process of determining better values for various programs and use cases.


.. _too_many_jobs:

Too many query batches leads to failed execution
------------------------------------------------

ElasticBLAST divides query sequences into batches and searches them in parallel. The :ref:`ELB_BATCH_LEN` parameter controls the size of a single batch. If the ElasticBLAST configuration leads to more than 5,000 query batches, ElasticBLAST will exit with an error message prompting you to increase :ref:`ELB_BATCH_LEN` parameter to decrease the number of query batches.
