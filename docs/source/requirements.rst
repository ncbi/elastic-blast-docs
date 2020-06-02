Requirements
============

* `GCP SDK CLI <https://cloud.google.com/sdk>`_
* `kubectl <https://kubernetes.io/docs/tasks/tools/install-kubectl>`_
* `python3.6 or newer <https://www.python.org/downloads/>`_
* `BLAST+ <https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE_TYPE=BlastDocs&DOC_TYPE=Download>`_
* You are authenticated and have the necessary permissions in your GCP
  project. If working on a newly created GCP instance, this likely requires ``gcloud auth login``.

  * GCP permissions

    * GKE: to manage a kubernetes cluster on which to run ElasticBLAST.
    * GCS: to store results and query splits.
