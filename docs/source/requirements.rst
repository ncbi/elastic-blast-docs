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

.. _requirements:

Requirements
============

* `python3.7 or newer <https://www.python.org/downloads/>`_
* ``python3-distutils``

Google Cloud Platform (GCP)
---------------------------

* `GCP SDK CLI <https://cloud.google.com/sdk>`_
* `kubectl <https://kubernetes.io/docs/tasks/tools/install-kubectl>`_
* You are authenticated and have the necessary permissions in your GCP project.
  If working on a newly created GCP instance, this likely requires running 
  the command ``gcloud auth login``.

  * GCP permissions

    * GKE: to manage a kubernetes cluster on which to run ElasticBLAST.
    * GCS: to store results and query splits.

    *Note*: ``elastic-blast`` attempts to enable the relevant GCP APIs if they are not enabled already.

Please visit also our page with :ref:`tips for GCP <gcp-tips>`.

Amazon Web Services (AWS)
-------------------------

* You have AWS credentials available and have the necessary IAM permissions, which include the following AWS services:

  * Batch
  * EC2
  * ECS
  * S3

  For a sample IAM policy, please see :ref:`iam-policy`.
