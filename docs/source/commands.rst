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

.. _commands:

Commands
========

The ElasticBLAST command line interface supports the commands listed below.

The application's exit codes are documented :ref:`here <exit-codes>`.

.. _submit:

submit
------

Submits an ElasticBLAST search. 

For additional details, please run ``elastic-blast submit --help``.

.. _status:

status
------

Checks the status of an ElasticBLAST search. This will not return proper
results until the ``submit`` command has completed successfully.

Once the search is in progress and as long as there are no failures, 
this command prints the number of BLAST jobs in the following phases of
processing:

Pending 
    Jobs are scheduled and waiting to run.

Running
    Jobs are running.

Succeeded
    Jobs that have successfully completed.

Failed
    Jobs that have failed.

When the search is done, this command prints the message: "Your
ElasticBLAST search succeeded, results can be found in ....". 

When at least one job fails, this command prints "Your ElasticBLAST search
failed".

For additional details, please run ``elastic-blast status --help``.

.. _delete:

delete
------

Deletes cloud resources created by ElasticBLAST, except its results, if any.

.. Please see also :ref:`janitor`.

For additional details, please run ``elastic-blast delete --help``.

.. _run-summary:

run-summary
-----------

Produces a summary of the ElasticBLAST execution in JSON format.

For additional details, please run ``elastic-blast run-summary --help``.
