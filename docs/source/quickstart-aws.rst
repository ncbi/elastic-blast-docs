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

.. _quickstart-aws:

Quickstart for AWS
==================


.. figure:: ElasticBLASTonAWS-architecture.png
   :alt: Overview of ElasticBLAST at AWS
   :class: with-border

Overview
--------

In this quickstart, you will run a BLASTP (protein-protein) search with ElasticBLAST, producing tabular output that also lists taxonomic information about your matches.

You will use AWS CloudShell for this first ElasticBLAST run. The CloudShell already has some of the needed software installed and is easy to start up.  Read about starting the CloudShell `here <https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html#how-to-get-started>`__.

In order to complete this quickstart, you will need to be familiar with the AWS console, have an account at AWS, be comfortable with the command-line and editing files with a text editor.

Get ElasticBLAST
----------------

Copy and paste the commands below at the CloudShell prompt to install ElasticBLAST.

.. code-block:: shell

    sudo yum install -y python3-wheel
    sudo pip3 install elastic-blast


In some cases (e.g., not on the cloud), it may be preferable to run these commands without using "sudo" (which runs these commands with root permissions).  

The instructions in this quickstart assume that you are working from the directory where you installed ElasticBLAST.

Run the two ElasticBLAST commands listed below.  If ElasticBLAST is properly installed, the first one will report the version of ElasticBLAST installed and the second one will give you the help message.

.. code-block:: bash

    elastic-blast --version
    elastic-blast --help

If you are familiar with python, please see :ref:`tutorial_pypi`. Following these instructions will add ``elastic-blast`` to your ``PATH``.

Set up an output bucket (if one doesn't exist)
----------------------------------------------

.. code-block:: shell

    aws s3 ls s3://elasticblast-YOURNAME || aws s3 mb s3://elasticblast-YOURNAME

Substitute your name for "YOURNAME" using all lower case letters.


Configure ElasticBLAST
----------------------

You will use a configuration file to specify your input to ElasticBLAST.  Once you have written the configuration file, you'll just need to tell ElasticBLAST about it when invoked.

Start by, copying the configuration file shown below.  Using an editor, write this text to a new file called "BDQA.ini".  Vi is pre-installed in the CloudShell.  Instructions for installing nano on the CloudShell can be found `here <https://docs.aws.amazon.com/cloudshell/latest/userguide/vm-specs.html#installing-software>`__.



.. code-block::
    :name: minimal-config
    :linenos:

    [cloud-provider]
    aws-region = us-east-1

    [cluster]
    machine-type = m5.8xlarge
    num-cpus = 16
    num-nodes = 2
    labels = owner=YOURNAME

    [blast]
    program = blastp
    db = refseq_protein
    mem-limit = 61G
    queries = s3://elasticblast-test/queries/BDQA01.1.fsa_aa
    results = s3://elasticblast-YOURNAME/results/BDQA
    options = -task blastp-fast -evalue 0.01 -outfmt "7 std sskingdoms ssciname"  

You will need to edit the file to provide your results bucket. For your results bucket, you should append "/results/BDQA" to your output bucket.  If you created it with the s3 command above, it would be as shown in the configuration file once you replace YOURNAME with your real name.

ElasticBLAST will place your results at s3://elasticblast-YOURNAME/results/BDQA.  For your next search, you should use a different token than BDQA, otherwise your new results will be placed at the same location, possibly overwriting your first set of results.

This configuration file specifies two AWS instances, specified by "num-nodes", for your search.  The BLASTP program searches proteins from the BDQA WGS project (obtained from a public cloud bucket) against the refseq_protein database.

In addition to the minimal parameters, the configuration file above includes some BLAST options.

There is no need to change any lines in the configuration file (BDQA.ini) other than the results bucket and the ``owner`` label (i.e.: replace ``YOURNAME`` with your name in all lowercase characters.

This search should take about 30 minutes to run and cost less than $3.

Run ElasticBLAST
----------------

.. code-block:: bash

    elastic-blast submit --cfg BDQA.ini --loglevel DEBUG

The submit command can take several minutes as it brings up cloud resources and downloads the BLAST database.

You may also see an informational message about "awslimitchecker", which requires no action on your part. 

If your cloud shell session disconnects, please see :ref:`cloud_shell_disconnect`.

Monitor progress
----------------
To check on the progress of the search, inspect the :ref:`logfile
<elb_logfile>` and/or run the command below:

.. code-block:: bash
    :name: status

    elastic-blast status --cfg BDQA.ini --loglevel DEBUG

The status command will not return proper results until the submit command has finished.
Once it returns, it will list the number of batches "Pending" (waiting), "Running" (searches ongoing), "Succeeded" (finished successfully), and "Failed".

Once all batches have finished, you can download results as shown below.


Download results
----------------
You will find it convenient to set an environment variable for the location of your results.  You'll need to modify the command below to use the same path listed in BDQA.ini.

.. code-block:: bash

   export YOUR_RESULTS_BUCKET=s3://elasticblast-YOURNAME/results/BDQA

Now, use the command below to download your results from your results bucket. This command assumes you have set ${YOUR_RESULTS_BUCKET}.  If you haven't done this, simply replace ${YOUR_RESULTS_BUCKET} by the path. 

.. code-block:: bash

    aws s3 cp ${YOUR_RESULTS_BUCKET}/ . --exclude "*" --include "*.out.gz" --recursive

ElasticBLAST breaks your set of queries into multiple batches and runs one search per batch.  Your results are returned with the results of each batch in a separate file.

Running "ls" in the CloudShell should list 21 files named something like "batch_000-blastp-refseq_protein.out.gz".

Use the commands below to decompress the first batch and then view with "less".

.. code-block:: bash

    gunzip batch_000-blastp-refseq_protein.out.gz 
    less batch_000-blastp-refseq_protein.out

You will see tabular output with matches to the refseq_protein database.  The output also includes the super-kingdom and scientific name of the database sequence found.  The queries come from a WGS study of viral metagnomes (`BDQA <https://www.ncbi.nlm.nih.gov/Traces/wgs/BDQA01>`_) so having the taxonomic information helps you to determine whether a query is really from a virus and which one.


The results for one query, GBH21861.1, are shown below.  The first match covers the entire query, the second covers most of it, and both are statistically significant, as judged by the expect value.  This report lists the super-kingdom as "Viruses" in both cases. The scientific names are in the rightmost fields (scroll the window to see these).  

::

    # BLASTP 2.11.4+
    # Query: GBH21861.1 hypothetical protein [viral metagenome]
    # Database: refseq_protein
    # Fields: query acc.ver, subject acc.ver, % identity, alignment length, mismatches, gap opens, q. start, q. end, s. start, s. end, evalue, bit score, subject super kingdoms, subject sci name
    # 2 hits found
    GBH21861.1      YP_009480351.1  81.384  419     78      0       1       419     1       419     0.0     712     Viruses Callinectes sapidus reovirus 1
    GBH21861.1      YP_009665171.1  68.932  412     128     0       6       417     2       413     0.0     612     Viruses Eriocheir sinensis reovirus


You can see more information on these database matches at `YP_009480351.1 <https://www.ncbi.nlm.nih.gov/protein/YP_009480351.1>`_ and `YP_009665171.1 <https://www.ncbi.nlm.nih.gov/protein/YP_009665171.1>`_


Clean up cloud resources
------------------------

ElasticBLAST works very hard to clean up resources after the BLAST search
completes or in case of failure.
It may be always prudent to run ``elastic-blast delete`` as a safety measure to prevent
accruing charges and exhausting quotas.

This step is **required** if the :ref:`janitor` is **not** enabled. Please do
not omit it, even if you ran Ctrl-C when
starting ElasticBLAST. If you do not clean up your cloud resources, you may accrue charges from
your cloud service provider or you may end up running out of available quota or
into `service limits <https://docs.aws.amazon.com/batch/latest/userguide/service_limits.html>`_. 
It is also recommended each time you start a new ElasticBLAST search. 

.. code-block:: bash

    elastic-blast delete --cfg BDQA.ini --loglevel DEBUG


The delete command will take a few minutes to run as it needs to manage multiple cloud resources.

After the ``elastic-blast delete`` command returns, you may verify that your
cloud resources have been deleted by running the command below. The command requires that you have set ``${YOUR_RESULTS_BUCKET}``.
Its output will show the EC2 instance IDs ``elastic-blast`` created on your behalf that are
still in the ``running`` state.

.. code-block:: bash
   :caption: Run this on linux

   aws ec2 describe-instances --filter Name=tag:billingcode,Values=elastic-blast Name=tag:Name,Values=elasticblast-YOURNAME-$(echo -n ${YOUR_RESULTS_BUCKET} | md5sum | cut -b-9) --query "Reservations[*].Instances[?State.Name=='running'].InstanceId" --output text 

.. code-block:: bash
   :caption: Run this on mac

   aws ec2 describe-instances --filter Name=tag:billingcode,Values=elastic-blast Name=tag:Name,Values=elasticblast-YOURNAME-$(echo -n ${YOUR_RESULTS_BUCKET} | md5 | cut -b-9) --query "Reservations[*].Instances[?State.Name=='running'].InstanceId" --output text 

Summary
-------

You have run a BLASTP (protein-protein) search with ElasticBLAST, producing tabular output that also lists taxonomic information about your matches.  The BLAST search was selected to be quick and inexpensive to run with a query set of only 548 proteins and the relatively small refseq_protein database.

You used the CloudShell to launch your search.  The CloudShell has the advantage that it is easy to start up and already has the AWS CLI SDK  and python installed.  The CloudShell has `limitations <https://docs.aws.amazon.com/cloudshell/latest/userguide/limits.html>`_ and you may want to consider other environments for further work.  ElasticBLAST can also be started from your own machine or a cloud instance you have brought up.  In that case, you will need to make sure that the :ref:`requirements <requirements>` have been met.  You should also look at :ref:`AWS Configuration <aws_conf>` (below)

The :ref:`tutorials` page provides more details on ElasticBLAST as well as examples.



.. _aws_conf:

AWS Configuration
-----------------

The minimum required configuration parameters for running ElasticBLAST in AWS include:

* :ref:`region <elb_aws_region>`

In addition, you must have the necessary credentials and :ref:`permissions <iam-policy>` to run the AWS services required by ElasticBLAST.

If you are new to AWS, please discuss the :ref:`permissions <iam-policy>` with your systems administrator, review and follow the instructions in the link
below:

* `Setting up for AWS Batch <https://docs.aws.amazon.com/batch/latest/userguide/get-set-up-for-aws-batch.html>`_
