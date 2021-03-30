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

.. _cost:

Cost reporting
==============

**Experimental: Supported only for NCBI, may not work for everyone.**

This feature relies on labels (i.e.: key:value pairs) being set prior to starting
ElasticBLAST searches. The following labels are set by default:

* ``owner:${USER}``
* ``project:elastic-blast``
* ``program:${ELB_BLAST_PROGRAM}``
* ``db:${ELB_DB}``

For instance, to retrieve the cost for all your ElasticBLAST searches run the
command:

.. code-block:: bash

    make .env
    source .env/bin/activate
    elb-cost owner:${USER}

**Note**: 

* It is recommended that you use the ``--date-range`` option to this tool. Cost
  tracking is based on searching a BigQuery dataset and this option narrows
  down the search and makes it faster and cheaper. 
* There is a lag of about 24 hours for the cost data to be available via this tool.


To see the online help for this tool, please run the command:

.. code-block:: bash

    elb-cost -h

You can also add your own custom labels by setting the :ref:`ELB_LABELS`
configuration parameter.

.. code-block:: bash

    export ELB_LABELS=search:my-test-search
    # Run ElasticBLAST, wait for 24 hours, then run the command below
    elb-cost ${ELB_LABELS}  --date-range `date +%F --date='-1 day'`:`date +%F`

