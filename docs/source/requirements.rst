Requirements
============

* `GCP SDK CLI <https://cloud.google.com/sdk>`_
* `kubectl <https://kubernetes.io/docs/tasks/tools/install-kubectl>`_
* `envsubst <https://www.gnu.org/software/gettext/manual/html_node/envsubst-Invocation.html>`_
  from the GNU gettext utilities package
* `GNU make <https://www.gnu.org/software/make/>`_
* `python3.6 or newer <https://www.python.org/downloads/>`_
* `git <https://git-scm.com/>`_
* You are authenticated and have the necessary permissions in your GCP
  project. If working on a newly created GCP instance, this likely requires ``gcloud auth login``.

  * GCP permissions

    * GKE: to manage a kubernetes cluster on which to run ElasticBLAST.
    * GCS: to store results and query splits.
* The configuration scripts assume that you use the ``bash`` shell.
