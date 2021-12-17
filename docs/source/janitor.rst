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

.. _janitor:

Auto-shutdown feature
=====================

This feature enables ElasticBLAST to monitor its status and shutdown cloud
resources in the event of failures or successful search completion. Please
follow the instructions below to enable it on your user or service account.
You only need to do this once per user or service account.

**Please keep in mind that not enabling this feature requires you to invoke
"elastic-blast delete" to avoid incurring charges after ElasticBLAST
has completed its operation or failed.**

Google Cloud Platform (GCP)
---------------------------

Add ``roles/container.admin`` to your :ref:`user or service account <grant_cluster_admin>`.

Amazon Web Services (AWS)
-------------------------

This feature requires an AWS role with the necesary permissions to manage
cloud resources on your behalf. This role can be created with the script
below, which is included in the ElasticBLAST distribution:

.. code-block:: bash

   aws-create-elastic-blast-janitor-role.sh

The script will create a role named ``ncbi-elasticblast-janitor-role``. You
can get information about this role via the script
``aws-describe-elastic-blast-janitor-role.sh`` and delete it with
``aws-delete-elastic-blast-janitor-role.sh``.
