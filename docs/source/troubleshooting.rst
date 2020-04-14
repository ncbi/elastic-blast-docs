.. _troubleshooting:

Troubleshooting
===============

My search seems to be stalled
-----------------------------

Run the commands below to see what is running in your cluster:

.. code-block:: bash
    
    make logs
    make ps
    make top

If you want to stop the search, run the command below to delete all cloud
resources created by ElasticBLAST. Your input file(s) will not be modified.

.. code-block:: bash

    make delete

How to debug ElasticBLAST?
--------------------------

Please see :ref:`support`.

