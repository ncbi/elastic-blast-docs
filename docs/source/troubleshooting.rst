.. _troubleshooting:

Troubleshooting
===============

My search seems to be stalled
-----------------------------

Run the commands below to see what is running in your cluster:

.. code-block:: bash
    
   kubectl logs -l app=setup --timestamps
   kubectl logs -l app=blast -c blast --timestamps
   kubectl logs -l app=blast -c results-export --timestamps
   kubectl get pods -o name -l app=blast | sed 's,pod/,,' | xargs -t -I{} kubectl exec {} -c blast -- top -n1 -cb
   kubectl get pods -o name -l app=blast | sed 's,pod/,,' | xargs -t -I{} kubectl exec {} -c blast -- ps aux

If you want to stop the search, run the command below to delete all cloud
resources created by ElasticBLAST. Your input file(s) will not be modified.

.. code-block:: bash

    ./elastic-blast delete --cfg ${CONFIG_FILE} --loglevel DEBUG --logfile stderr

How to debug ElasticBLAST?
--------------------------

Please see :ref:`support`.

