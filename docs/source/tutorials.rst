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

.. _tutorials:

Tutorials
=========


This section presents some ElasticBLAST searches that you can try out.  It assumes that you have read the :ref:`overview` and completed either the :ref:`quickstart-gcp` or the :ref:`quickstart-aws`. 

You will be able to run these examples on either AWS or GCP.  For these examples, you will need to write a configuration file.  Below we describe how to write your file and the differences between files for GCP and AWS.

View these examples as suggestions.  Once you are confident you understand how ElasticBLAST works, you can start modifying the examples.  You can use a local FASTA file, change the database or change the formatting options.

In the first part of this section, we provide information that will help you to complete the examples listed here.

**Environment**

It is possible to run these examples using the Cloud Shell as was done with the GCP and AWS quickstarts.  On the other hand, there are advantages to using your own hardware or a cloud instance that you have started.  Some advantages to using your own hardware or cloud instance are increased disk space and more processing power, allowing you to better make use of ElasticBLAST as part of a pipeline.  If you will be using your own hardware or a cloud instance, you should review the :ref:`requirements`.  You should also look at the section below on :ref:`Providing Credentials <credentials>`.

**Configuration Files**

Below is the configuration file used in the AWS quickstart (the GCP file is similar).  This file contains three sections: cloud-provider, cluster, and blast. Each section contains a number of configuration variables (key/value pairs).  These are defined in :ref:`configuration`.  The needed changes to each section are as follows:

* cloud-provider: You will be able to use the same configuration variables used in the quickstart, assuming the same account.  If you will be changing any part of this section, please refer to :ref:`gcp_conf` or :ref:`aws_conf`.

* cluster: You do not need to change the configuration variables in this section, though you may want to change the number of machines ("num-nodes").  In this section, you can also add a "use-preemptible = yes" key/value pair to indicate that you want to use a less expensive pre-emptible (GCP) or spot (AWS) instance.  The key "use-preemptible" applies both to AWS spot instances and GCP pre-emptible instances. See :ref:`elb_use_preemptible` for details.

* blast: You will need to edit the configuration variables in this section in order to accomplish your goal.  You can provide BLAST specific paramters in this section such as the program, database and other BLAST command-line parameters.  See :ref:`BLAST Configuration Options <blast_config_options>` for details.

.. code-block::
    :linenos:

    [cloud-provider]
    aws-region = us-east-1

    [cluster]
    machine-type = m5.8xlarge
    num-nodes = 2

    [blast]
    program = blastp
    db = swissprot
    queries = s3://elasticblast-test/queries/BDQE01.1.fsa_aa
    results = s3://elasticblast-YOURNAME/results/BDQE
    options = -task blastp-fast -evalue 0.01 -outfmt "7 std sskingdoms ssciname" 



.. _credentials:

**Providing Credentials**

If you are not using the cloud shell, you will need to provide credentials if you have not already done so. 

Read about providing credentials for GCP `here <https://cloud.google.com/sdk/docs/authorizing>`_.

For AWS, providing credentials can be
accomplished by setting up environment variables or by saving those values in
``~/.aws/config``. Please see examples below:

.. code-block:: shell

    # Environment variable
    export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>
    export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>

.. code-block:: shell

    # Check whether an AWS configuration file already exists
    [ -f ~/.aws/config ] || echo "AWS configuration file already exists!"

    # If not, enter the following information in it
    [ -d ~/.aws ] || mkdir ~/.aws
    echo '[default]' > ~/.aws/config
    echo 'aws_access_key_id = <YOUR_ACCESS_KEY_ID>' >> ~/.aws/config
    echo 'aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>' >> ~/.aws/config


MegaBLAST on a large nucleotide set
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In this example, you search 87,374 hepatitis sequences against the nt database, producing tabular output.  The search should take about 75 minutes and cost less than $10.  The pre-emptible or spot price could be as little as 20% of that.  

Below is the configuration file for this example.  Copy it into a new file with a text editor, then fill in the needed sections, which includes the cloud-provider information, the query path, and a bucket for your results.  Assuming you are using the same account as in the quickstart, use the same cloud-provider information.  For the query path, uncomment either the GCP (gs://) or the AWS (s3://) option and delete the other one.  You may use the results bucket used in the quickstart, but you should change the final location (BDQE).

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

The above command uses a configuration file named hepatitis.ini.  Modify the command if your configuration file has a different name.

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


Finally, make sure to delete your resources:

.. code-block:: bash

    ./elastic-blast delete --cfg hepatitis.ini --loglevel DEBUG


You should also run the checks outlined in the quickstart to double-check that all resources have been deleted.

.. _elb_submit_and_wait:

submit-and-wait-for-results script
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


For a helpful sample script to run ElasticBLAST, wait for results and clean up, please
see `this script <https://github.com/ncbi/elastic-blast-demos/blob/master/submit-and-wait-for-results.sh>`_.
You can obtain it via following commands:

.. code-block:: bash

    [ -f submit-and-wait-for-results.sh ] || curl -sO https://raw.githubusercontent.com/ncbi/elastic-blast-demos/master/submit-and-wait-for-results.sh
    [ -x submit-and-wait-for-results.sh ] || chmod +x submit-and-wait-for-results.sh

You can run it with the following command:

.. code-block:: bash

    ./submit-and-wait-for-results.sh ${YOUR_INI_FILE} ${TIMEOUT_IN_MINUTES}

The second parameter (TIMEOUT_IN_MINUTES) is optional.  The default timeout is five minutes and is normally sufficient.  The configuration file (YOUR_INI_FILE) is a standard ElasticBLAST configuration file.

The script expects ``elastic-blast`` is available in your ``PATH``. If this is
not the case, the script needs to be updated. Assuming ``elastic-blast`` is installed 
in the current working directory, the command below would accomplish this.
Please feel free to edit the script to suit your operating environment.

.. code-block:: bash

    sed -i~ -e 's,elastic-blast ,./elastic-blast ,' submit-and-wait-for-results.sh

After this script has finished, you will find all your results in the directory that you ran it from.   Additionally, they will still be in your cloud bucket.

As noted earlier, ElasticBLAST will provide your results in multiple gzipped files, one for each batch it processed.  Some users prefer to have all results in one file.  You can accomplish this easily with the command below, which will gunzip and concatenate all the gzipped files in the current directory starting with ``batch`` into the file MYRESULTS.tsv.  This command will leave the original gzipped files in place. 

.. code-block:: bash

    gunzip -c batch_*.gz > MYRESULTS.tsv
