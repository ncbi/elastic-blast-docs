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

* `python 3.9, 3.11 <https://www.python.org/downloads/>`_
* ``python3-distutils``

ElasticBLAST has been tested on Linux and macOS. ElasticBLAST on Windows is not
supported at this time. On a Windows machine you can use the `Google <https://cloud.google.com/shell>`_ or 
`AWS <https://aws.amazon.com/cloudshell/>`_ Cloud Shells respectively.

Google Cloud Platform (GCP)
---------------------------

* `Google Cloud Command Line Interface <https://cloud.google.com/cli>`_
* `kubectl <https://kubernetes.io/docs/tasks/tools/install-kubectl>`_: Please be sure to install a version supported by GCP (see `this link <https://cloud.google.com/kubernetes-engine/docs/release-notes>`_ for supported versions)

  * Please follow the instructions in :ref:`k8s_ver_2025_02`.

* `gke-cloud-auth-plugin <https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke>`_
* You are authenticated, have configured ``gcloud`` with the appropriate GCP
  project, and have the necessary permissions in that GCP project.
  If working on a newly created GCP instance, this likely requires running 
  the command ``gcloud auth login``.

  You can configure ``gcloud`` with the GCP project with the command
  ``gcloud config set project GCP_PROJECT_ID``.

  * GCP permissions

    * GKE: to manage a kubernetes cluster on which to run ElasticBLAST.
    * GCS: to store results and query splits.
    * Permissions for :ref:`janitor`

    *Note*: ``elastic-blast`` attempts to enable the relevant GCP APIs if they are not enabled already.

Please visit also our page with :ref:`tips for GCP <gcp-tips>`.

Amazon Web Services (AWS)
-------------------------

* You have AWS credentials available and have the necessary :ref:`IAM
  permissions <iam-policy>`, which include the following AWS services:

  * Batch
  * EC2
  * ECS
  * S3
  * Permissions for :ref:`janitor`

* **Optional**: `AWS CLI SDK <https://aws.amazon.com/cli/>`_.
