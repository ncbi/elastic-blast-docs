.. _requirements:

Requirements
============

* `python3.6 or newer <https://www.python.org/downloads/>`_
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
