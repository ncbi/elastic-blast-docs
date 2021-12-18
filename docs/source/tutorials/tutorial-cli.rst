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

.. _tutorial_cli:

Using ElasticBLAST with command line parameters
===============================================

ElasticBLAST supports selected command line parameters illustrated by this
tutorial. This tutorial accomplishes the same goals as those provided in the
quickstart, and assumes the same conventions.

Search submission
-----------------

Use the appropriate command based on your cloud service provider to submit an
ElasticBLAST search. 

BLAST+ parameters are specified after a ``--`` at the end of the command.

Please note that the the ``labels`` configuration parameter is not supported
by the command line interface.

.. code-block:: bash
   :caption: AWS

   elastic-blast submit \
       --program blastp \
       --db refseq_protein \
       --query s3://elasticblast-test/queries/BDQA01.1.fsa_aa \
       --results s3://elasticblast-YOURNAME/results/BDQA \
       --machine-type m5.8xlarge \
       --mem-limit 61G \
       --num-cpus 16 \
       --num-nodes 2 \
       -- -task blastp-fast -evalue 0.01 -outfmt "7 std sskingdoms ssciname"  


.. code-block:: bash
   :caption: GCP

   elastic-blast submit \
       --gcp-project ${YOUR_GCP_PROJECT_ID} \
       --gcp-region us-east4 \
       --gcp-zone us-east4-b \
       --program blastp \
       --db refseq_protein \
       --query gs://elastic-blast-samples/queries/protein/BDQA01.1.fsa_aa \
       --results gs://elasticblast-${USER}/results/BDQA \
       --num-nodes 2 \
       -- -task blastp-fast -evalue 0.01 -outfmt "7 std sskingdoms ssciname"  

Checking search status
----------------------

Use the appropriate command based on your cloud service provider to check the
status of an ElasticBLAST search. 

.. code-block:: bash
   :caption: AWS

    elastic-blast status --results ${YOUR_RESULTS_BUCKET}

.. code-block:: bash
   :caption: GCP

    elastic-blast status --results ${YOUR_RESULTS_BUCKET} \
       --gcp-project ${YOUR_GCP_PROJECT_ID} \
       --gcp-region us-east4 \
       --gcp-zone us-east4-b \

Deleting cloud resources
------------------------

This step is **required** if the :ref:`janitor` is **not** enabled.

Use the appropriate command based on your cloud service provider to delete
an ElasticBLAST search. 


.. code-block:: bash
   :caption: AWS

    elastic-blast delete --results ${YOUR_RESULTS_BUCKET}

.. code-block:: bash
   :caption: GCP

    elastic-blast delete --results ${YOUR_RESULTS_BUCKET} \
       --gcp-project ${YOUR_GCP_PROJECT_ID} \
       --gcp-region us-east4 \
       --gcp-zone us-east4-b
