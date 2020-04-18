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

* It is recommended that you use the ``--date-range`` option to this tool. 
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

