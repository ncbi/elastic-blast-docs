.. _support:

Support
=======

**N.B.**: Please help the development team help you: 

#. Always use the ``--loglevel DEBUG`` option (for now).
#. Provide us with the logfile (``elastic-blast.log`` by default) and your configuration file.
#. Consider using the unix ``screen`` tool to capture the output of your usage
   of ElasticBLAST and attaching the session log to your problem report. 

Thanks! :)

.. Please see also the list of :ref:`known issues<Known issues>`.

Please see also the list of :ref:`known issues<issues>`.

Bug reports
-----------

Please run the commands below and include their output in a new JIRA ticket of type *Bug* in the `EB project <https://jira.ncbi.nlm.nih.gov/browse/EB>`_. 

.. code-block:: bash

   kubectl get pods -o wide
   kubectl top pods --containers
   kubectl top nodes
   ./elastic-blast status --cfg ${YOUR_CONFIG_FILE} --loglevel DEBUG --logfile stderr
   kubectl logs -l app=setup --timestamps
   kubectl logs -l app=blast -c blast --timestamps
   kubectl logs -l app=blast -c results-export --timestamps
   kubectl get pods -o name -l app=blast | sed 's,pod/,,' | xargs -t -I{} kubectl exec {} -c blast -- top -n1 -cb
   kubectl get pods -o name -l app=blast | sed 's,pod/,,' | xargs -t -I{} kubectl exec {} -c blast -- ps aux

Please feel free to also reach out the development team via slack at
``#elastic-blast``.

Feature requests
----------------

Please create a JIRA ticket of type *Discussion* in the `EB project <https://jira.ncbi.nlm.nih.gov/browse/EB>`_.

