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

.. _grant_cluster_admin:

Google Cloud Platform (GCP)
---------------------------

This feature requires to have the ``roles/container.admin`` added to your
user, group, or service account. The script below (provided with ElasticBLAST) 
can help you set this up. Invoking it as follows will display its online help:

.. code-block:: bash

   gcp-setup-elastic-blast-janitor.sh -h

By default, the script assumes you are using your personal user account, but
if you are using a service account (e.g.: the output of 
``gcloud config get-value account`` ends in ``gserviceaccount.com``), you
will need to specify its ``-u`` argument.  For instance, invoke the 
command below replacing ``SVC_ACCT`` with the 
appropriate value:

.. code-block:: bash

   gcp-setup-elastic-blast-janitor.sh -u serviceAccount:SVC_ACCT

This script is a wrapper around the command ``gcloud projects add-iam-policy-binding``.
Please see the `GCP documentation <https://cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding>`_ 
for additional details.

If this operation fails, you may need to ask your GCP account administrator to
run the command on your behalf. If this is not possible, setting the
``ELB_DISABLE_AUTO_SHUTDOWN`` and ``ELB_DISABLE_JOB_SUBMISSION_ON_THE_CLOUD``
environment variables to any value will disable
the auto-shutdown feature and remove the requirement for these additional
permissions. 

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
