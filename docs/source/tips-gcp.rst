.. _gcp-tips:

Tips for GCP
============

.. _try_elb_on_gcp:

How to easily try elastic-blast on GCP?
---------------------------------------

To try elastic-blast with relatively small input size (less than 10k
residues, or less than 100k bases), run ``elastic-blast`` from the GCP cloud shell.
You can access it on your web browser at https://console.cloud.google.com/?cloudshell=true
or via the ``gcloud`` command:

.. code-block:: shell

    gcloud alpha cloud-shell ssh --ssh-flag=-A


.. _enable_apis_on_gcp:

How to enable the necessary GCP APIs for elastic-blast?
-------------------------------------------------------

.. In the Cloud Console, on the Navigation menu (Navigation menu), click APIs & services > Library.
.. I.e.: go to https://console.cloud.google.com/apis/library, search for kubernetes and storage

To check the GCP permissions with the Cloud Console, visit the URLs below and ensure that the API is **enabled**.

   * https://console.cloud.google.com/apis/api/storage-component.googleapis.com/overview
   * https://console.cloud.google.com/apis/api/container.googleapis.com/overview

To enable them on the command line, run the command below:

.. code-block:: shell

    gcloud services enable container.googleapis.com storage.googleapis.com


.. _install_deps:

How to install dependencies on Debian/Ubuntu machines?
------------------------------------------------------

If you are working on Debian or Ubuntu Linux distribution and have ``root`` permissions, you can install kubectl and python-distutils as follows:

.. code-block:: shell

   sudo apt-get -yqm update
   sudo apt-get install -yq kubectl python3-distutils
