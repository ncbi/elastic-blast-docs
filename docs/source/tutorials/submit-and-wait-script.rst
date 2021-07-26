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

.. _tutorial_mb:

MegaBLAST on a large nucleotide set
===================================

In this example, you search 87,374 hepatitis sequences against the nt database, producing tabular output.  The search should take about 75 minutes and cost less than $10.  The pre-emptible or spot price could be as little as 20% of that, but may take longer to complete.  

Below is the configuration file for this example.  Copy it into a new file with a text editor, then fill in the needed sections, which includes the cloud-provider information, the query path, and a bucket for your results.  Assuming you are using the same account as in the quickstart, use the same cloud-provider information.  For the query path, uncomment either the GCP (gs://) or the AWS (s3://) option and delete the other one.  You may use the results bucket used in the quickstart, but you should change the final location (BDQA).

The instructions below assume the configuration file is named hepatitis.ini.  If you use a different name, you can simply modify the instructions.

.. code-block::
    :linenos:

    [cloud-provider]
    **FILL IN**

    [cluster]
    num-nodes = 4
    use-preemptible = yes

    [blast]
    program = blastn 
    db = nt
    #queries = gs://elastic-blast-samples/queries/tests/hepatitis.fsa
    #queries = s3://elastic-blast-test/queries/hepatitis.fsa
    results = **FILL IN**
    options = -evalue 0.01 -outfmt 7

Once you have finished your edits to the configuration file, you are ready to start your run.  You should follow the same steps you used in your quickstart.

First, run elastic-blast with the submit command:

.. code-block:: bash

    ./elastic-blast submit --cfg hepatitis.ini --loglevel DEBUG

Once the above command returns (which may take a few minutes), you can check the status of the search:

.. code-block:: bash

    ./elastic-blast status --cfg hepatitis.ini --loglevel DEBUG

Once your search is done, you may download the results as shown below.

For GCP, use the command:

.. code-block:: bash

    gsutil -qm cp ${YOUR_RESULTS_BUCKET}/*.out.gz .

For AWS, use the command:

.. code-block:: bash

    aws s3 cp ${YOUR_RESULTS_BUCKET}/ . --exclude "*" --include "*.out.gz" --recursive

Here, YOUR_RESULTS_BUCKET should be set to the name of the results bucket used in your configuration file.

Finally, make sure to delete your resources:

.. code-block:: bash

    ./elastic-blast delete --cfg hepatitis.ini --loglevel DEBUG


You should also run the checks outlined in the quickstart to double-check that all resources have been deleted.
