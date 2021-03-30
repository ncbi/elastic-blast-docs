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

You can email help requests to elastic-blast-support@ncbi.nlm.nih.gov

Please help the development team help you: 

* When reporting problems, please provide us with:

   * Your configuration file
   * The ElasticBLAST logfile (``elastic-blast.log`` by default)
   * Your system's information, i.e. the output of the commands below:

.. code-block:: bash

    uname -a
    python3 -m sysconfig
    env
    # For GCP only
    gcloud info
    # For AWS only
    aws sts get-caller-identity
    aws configure list
    aws cloudformation describe-stack-events --stack-name $(awk '/name.:/ {print $NF}' elastic-blast.log | tr -d ",'" | head -1) --region $(awk '/region.:/ {print $NF}' elastic-blast.log | tr -d ",}'" | head -1) --output json


* **Always run elastic-blast delete after/before every ElasticBLAST search**.
* Always use the ``--loglevel DEBUG`` option (for now).
* Consider using the unix ``screen`` (`wikipedia <https://en.wikipedia.org/wiki/Script_(Unix)>`_, `man page <https://man7.org/linux/man-pages/man1/script.1.html>`_) tool to capture the
  output of your usage of ElasticBLAST and attaching the session log to your
  problem report. 

Thanks! :)

Please see also the list of :ref:`known issues<issues>`.
