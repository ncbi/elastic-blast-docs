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

Below is the configuration file used in the AWS quickstart (the GCP file is similar).  This file contains three sections: cloud-provider, cluster, and blast. Each section contains a number of configuration variables (key/value pairs).  These are defined in :ref:`configuration`.  Here are some changes you may need or want to make:

* cloud-provider: You will be able to use the same configuration variables used in the quickstart, assuming the same account.  If you will be changing any part of this section, please refer to :ref:`gcp_conf` or :ref:`aws_conf`.

* cluster: You do not need to change the configuration variables in this section, though you may want to change the number of machines ("num-nodes").  In this section, you can also add a "use-preemptible = yes" key/value pair to indicate that you want to use a less expensive preemptible (GCP) or spot (AWS) instance. See :ref:`elb_use_preemptible` for details.  You can also change the machine-type in this section.  See :ref:`elb_machine_type` for information on the default machine types and how to select a different machine type.

* blast: You will need to edit the configuration variables in this section in order to accomplish your goal.  You can provide BLAST specific paramters in this section such as the program, database and other BLAST command-line parameters.  See :ref:`BLAST Configuration Options <blast_config_options>` for details.

.. code-block::

    [cloud-provider]
    aws-region = us-east-1

    [cluster]
    num-nodes = 2

    [blast]
    program = blastp
    db = refseq_protein
    queries = s3://elasticblast-test/queries/BDQA01.1.fsa_aa
    results = s3://elasticblast-YOURNAME/results/BDQA
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


Tutorials
^^^^^^^^^

* :ref:`tutorial_pypi`
* :ref:`tutorial_conda`
* :ref:`tutorial_mb`
* :ref:`tutorial_create_blastdb_metadata`
* :ref:`tutorial_submit_and_wait_script`
