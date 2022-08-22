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

.. _support:

Support
=======


Please email help requests or bug reports to elastic-blast-support@ncbi.nlm.nih.gov
Before submitting a bug report, please ensure you are using ElasticBLAST version {VERSION}.
If not, please kindly upgrade your installation, as the issue you are running
into may have been already addressed.

Please also see the troubleshooting pages:

* :ref:`PyPI installation troubleshooting <missing_wheel>`
* :ref:`troubleshooting`

Please help the development team help you: 

* When reporting problems, please provide us with:

   * Your configuration file and command line invocation
   * The ElasticBLAST logfile (``elastic-blast.log`` by default)
   * The output of ``elastic-blast status --verbose --cfg YOUR_CONFIG_FILE``
   * Your system's information and ElasticBLAST working files, i.e. the output
     of the commands below and the ``elastic-blast-diagnostics.tgz`` file. It
     is OK if any of these commands fail ;)

.. code-block:: bash

    uname -a
    python3 -m sysconfig
    env

    # For GCP only
    gcloud info
    gsutil ls -lr ${YOUR_RESULTS_BUCKET}
    gsutil -qm cp -r ${YOUR_RESULTS_BUCKET}/logs .
    gsutil -qm cp -r ${YOUR_RESULTS_BUCKET/}metadata .
    tar czf elastic-blast-diagnostics.tgz logs metadata

    # For AWS only
    aws sts get-caller-identity
    aws configure list
    aws s3 ls --recursive ${YOUR_RESULTS_BUCKET}
    aws s3 cp --recursive ${YOUR_RESULTS_BUCKET}/logs logs
    aws s3 cp --recursive ${YOUR_RESULTS_BUCKET}/metadata metadata
    tar czf elastic-blast-diagnostics.tgz logs metadata


* If the :ref:`janitor` is not enabled, **always run elastic-blast delete after/before every ElasticBLAST search**.
* Consider using the unix ``screen`` (`wikipedia <https://en.wikipedia.org/wiki/Script_(Unix)>`_, `man page <https://man7.org/linux/man-pages/man1/script.1.html>`_) tool to capture the
  output of your usage of ElasticBLAST and attaching the session log to your
  problem report. 

Thanks! :)

Please see also the list of known issues in :ref:`AWS <aws_issues>` and :ref:`GCP <gcp_issues>`.
