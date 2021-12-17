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

.. _tutorial_submit_and_wait_script:

submit-and-wait-for-results script
==================================

.. _script: https://github.com/ncbi/elastic-blast-demos/blob/master/submit-and-wait-for-results.sh

In this example, you use a sample script_ to run ElasticBLAST. The script_ submits your search, checks the status on a regular basis, downloads your results from the cloud bucket, and runs the delete command once the timeout has expired or the search has completed or failed (whichever happens first). The timeout (in minutes) can be specified when the script is invoked.
This script_ is freely available.
You can obtain it via following commands:

.. code-block:: bash

    [ -f submit-and-wait-for-results.sh ] || curl -sO https://raw.githubusercontent.com/ncbi/elastic-blast-demos/master/submit-and-wait-for-results.sh
    [ -x submit-and-wait-for-results.sh ] || chmod +x submit-and-wait-for-results.sh

You can run it with the following command:

.. code-block:: bash

    ./submit-and-wait-for-results.sh ${YOUR_INI_FILE} ${TIMEOUT_IN_MINUTES}

The second parameter (TIMEOUT_IN_MINUTES) is optional and specifies the timeout mentioned above. The default value is 500 minutes. The configuration file (YOUR_INI_FILE) is a standard ElasticBLAST configuration file.

The script expects ``elastic-blast`` is available in your ``PATH``. If this is
not the case, the script needs to be updated. Assuming ``elastic-blast`` is installed 
in the current working directory, the command below would accomplish this.
Please feel free to edit the script to suit your operating environment.

.. code-block:: bash

    sed -i~ -e 's,elastic-blast ,./elastic-blast ,' submit-and-wait-for-results.sh


After this script has finished, you will find all your results in the directory that you ran it from.   Additionally, they will still be in your cloud bucket.

As the script runs, it will print the number of batches that are Pending, Running, Succeeded, and Failed.  It is a good idea to check these results to make sure your search finished successfully. First, you want to make sure that no batches Failed.  Second, you should check that the script did not exit after the specified timeout as it could then return incomplete results.  The second case is only a concern if the search took longer than the specified timeout, which has a default value of 8 hours and 20 minutes.

As noted earlier, ElasticBLAST will provide your results in multiple gzipped files, one for each batch it processed.  Some users prefer to have all results in one file.  You can accomplish this easily with the command below, which will gunzip and concatenate all the gzipped files in the current directory starting with ``batch`` into the file MYRESULTS.tsv.  This command will leave the original gzipped files in place. 

.. code-block:: bash

    gunzip -c batch_*.gz > MYRESULTS.tsv
