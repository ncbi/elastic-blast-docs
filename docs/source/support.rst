.. _support:

Support
=======

Please help the development team help you: 

#. Always use the ``--loglevel DEBUG`` option (for now).
#. When reporting problems, please provide us with the the logfile (``elastic-blast.log`` by default) and your
   configuration file.
#. Consider using the unix ``screen`` tool to capture the output of your usage
   of ElasticBLAST and attaching the session log to your problem report. 

.. code-block:: bash

    # Linux only: this command will generate a file called typescript with information to share along your bug report
    script -c './elastic-blast status --cfg ${YOUR_CONFIG_FILE} --loglevel DEBUG; cat elastic-blast.log; cat ${YOUR_CONFIG_FILE}'

Thanks! :)

Please see also the list of :ref:`known issues<issues>`.
