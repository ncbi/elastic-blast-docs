Requirements
============

* `python3.6 or newer <https://www.python.org/downloads/>`_
* `python3-distutils`

Google Cloud Platform (GCP)
---------------------------

* `GCP SDK CLI <https://cloud.google.com/sdk>`_
* `kubectl <https://kubernetes.io/docs/tasks/tools/install-kubectl>`_
* You are authenticated and have the necessary permissions in your GCP
  project. If working on a newly created GCP instance, this likely requires ``gcloud auth login``.

  * GCP permissions

    * GKE: to manage a kubernetes cluster on which to run ElasticBLAST.
    * GCS: to store results and query splits.

Amazon Web Services (AWS)
-------------------------

* You have AWS credentials available and have the necessary IAM permissions, which include the following AWS services:

  * Batch
  * EC2
  * ECS
  * S3


Tips for GCP
------------

.. In the Cloud Console, on the Navigation menu (Navigation menu), click APIs & services > Library.
.. I.e.: go to https://console.cloud.google.com/apis/library, search for kubernetes and storage

#. To check the GCP permissions with the Cloud Console, visit the URLs below and ensure that the API is **enabled**.

   * https://console.cloud.google.com/apis/api/storage-component.googleapis.com/overview
   * https://console.cloud.google.com/apis/api/container.googleapis.com/overview

#. If you are working on Debian or Ubuntu Linux distribution and have ``root`` permissions, you can install kubectl and python-distutils as follows:

.. code-block:: shell

   sudo apt-get install -yq kubectl python3-distutils
