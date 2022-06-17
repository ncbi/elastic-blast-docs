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

Please note that the cloudshell environment is best suited for evaluating and learning how to use ElasticBLAST. 

In order to complete this quickstart, you will need to be familiar with the AWS console, have an account at AWS, be comfortable with the command-line and editing files with a text editor.

In this quickstart, we will ask you to replace YOURNAME (all capitals) with your real name, in all lower-case letters
(as only lower-case letters are accepted for some cloud variables). For example, if your name is Jane Smith, you will need to 
change s3://elasticblast-YOURNAME to s3://elasticblast-janesmith

Get ElasticBLAST
----------------

Copy and paste the commands below at the CloudShell prompt to install
ElasticBLAST.

.. code-block:: bash

    [ -d .elb-venv ] && rm -fr .elb-venv
    python3 -m venv .elb-venv
    source .elb-venv/bin/activate
    pip install wheel
    pip install elastic-blast=={VERSION}


Following these instructions will add ``elastic-blast``
to your ``PATH``. If you run into any trouble, please see the
:ref:`missing_wheel` section.

Run the two ElasticBLAST commands listed below.  If ElasticBLAST is properly installed, the first one will report the version of ElasticBLAST installed and the second one will give you the help message.

.. code-block:: bash

    elastic-blast --version
    elastic-blast --help

You may see a message about setuptools replacing distutils, but that can be safely ignored.

Set up an output bucket (if one doesn't exist)
----------------------------------------------

To run ElasticBLAST, you will need a cloud bucket to store files.  Cloud buckets are 
independent from a running instance and much cheaper.  ElasticBLAST uses your cloud
bucket to stage files and also deliver your final results.

If you already have a cloud bucket named "s3://elasticblast-YOURNAME" (with YOURNAME substituted by your real name in 
*lower-case* letters) then run the command below to verify that it exists (replace YOURNAME with your real name in *lower-case* letters).  

.. code-block:: shell

    aws s3 ls s3://elasticblast-YOURNAME

If your bucket exists (no error message) then you should move onto the next section. 

If you do not have a bucket, then you need to make one using the command below.  In the command below, 
substitute your name for "YOURNAME" using all *lower-case* letters. 

.. code-block:: shell

    aws s3 mb s3://elasticblast-YOURNAME

Enable auto-shutdown feature
----------------------------

Please follow the instructions in :ref:`janitor`.


Configure ElasticBLAST
----------------------

You will use a configuration file to specify your input to ElasticBLAST.  Once you have written the configuration file, you'll just need to tell ElasticBLAST about it when invoked.

You will need to personalize the configuration file by making the following changes:

#. Replace YOURNAME on the "label" line with your name using all lower case letters.
#. Replace YOURNAME on the "results" line with your name using all lower case letters. 

Start by, copying the configuration file shown below.  Using an editor, write this text to a new file called "BDQA.ini".  Vi is pre-installed in the CloudShell.  Instructions for installing nano on the CloudShell can be found `here <https://docs.aws.amazon.com/cloudshell/latest/userguide/vm-specs.html#installing-software>`__.



.. code-block::
    :name: minimal-config

    [cloud-provider]
    aws-region = us-east-1

    [cluster]
    num-nodes = 1
    labels = owner=YOURNAME

    [blast]
    program = blastp
    db = swissprot
    queries = s3://elasticblast-test/queries/BDQA01.1.fsa_aa
    results = s3://elasticblast-YOURNAME/results/BDQA
    options = -task blastp-fast -evalue 0.01 -outfmt "7 std sskingdoms ssciname"  


ElasticBLAST will place your results at s3://elasticblast-YOURNAME/results/BDQA.  For your next search, you should use a different token than BDQA or remove those results, otherwise elastic-blast will refuse to run as it would overwrite your old results.

Since this is a small search, the configuration file specifies one AWS instance, specified by "num-nodes", for your search.  The BLASTP program searches proteins from the BDQA WGS project (obtained from a public cloud bucket) against the swissprot database.

In addition to the minimal parameters, the configuration file above includes some BLAST options.

This search should take about 10 minutes to run and cost less than $2.

Run ElasticBLAST
----------------

.. code-block:: bash

    elastic-blast submit --cfg BDQA.ini

The :ref:`submit` command can take a few minutes as it brings up cloud resources and downloads the BLAST database.

You may also see an informational message about "awslimitchecker", which requires no action on your part. 

If your cloud shell session disconnects, please see :ref:`cloud_shell_disconnect`.

Monitor progress
----------------
To check on the progress of the search, run the command below:

.. code-block:: bash

    elastic-blast status --cfg BDQA.ini

At first, it will simply return the word "SUBMITTING", but that should quickly change
to a report on the number of jobs and their status.  For additional details, please 
see :ref:`the status command documentation <status>`.

Once all batches have finished, you can download results as shown below.

Download results
----------------
You will find it convenient to set an environment variable for the location of your results.  You'll need to modify the command below to use the same path listed in BDQA.ini.

.. code-block:: bash

   export YOUR_RESULTS_BUCKET=s3://elasticblast-YOURNAME/results/BDQA

Now, use the command below to download your results from your results bucket. This command assumes you have set ${YOUR_RESULTS_BUCKET}.  If you haven't done this, simply replace ${YOUR_RESULTS_BUCKET} by the path. 

.. code-block:: bash

    aws s3 cp ${YOUR_RESULTS_BUCKET}/ . --exclude "*" --include "*.out.gz" --recursive

Running "ls" in the CloudShell should list a file named "batch_000-blastp-swissprot.out.gz".

ElasticBLAST breaks your set of queries into multiple batches and runs one search per batch.  Your results are returned with the results of each batch in a separate file.  For this small database, there is only one batch.  Larger searches will have multiple batches.

Use the commands below to decompress the results and then view with "less".

.. code-block:: bash

    gunzip batch_000-blastp-swissprot.out.gz 
    less batch_000-blastp-swissprot.out

You will see tabular output with matches to the swissprot database.  The output also includes the super-kingdom and scientific name of the database sequence found.  The queries come from a WGS study of viral metagnomes (`BDQA <https://www.ncbi.nlm.nih.gov/Traces/wgs/BDQA01>`_) so having the taxonomic information helps you to determine whether a query is really from a virus and which one.


The results for one query, GBH21753.1, are shown below.  Both matches cover most of the query and the database sequences, and both are statistically significant, as judged by the expect value.  This report lists the super-kingdom as "Viruses" in both cases. The scientific names are in the rightmost fields (scroll the window to see these).  

::

    # BLASTP 2.13.0+
    # Query: GBH21753.1 RdRp [viral metagenome]
    # Database: swissprot
    # Fields: query acc.ver, subject acc.ver, % identity, alignment length, mismatches, gap opens, q. start, q. end, s. start, s. end, evalue, bit score, subject super kingdoms, subject sci name
    # 2 hits found
    GBH21753.1      Q9INJ1.1        42.799  1236    661     21      8       1222    3       1213    0.0     894     Viruses Banna virus strain JKT-6423
    GBH21753.1      Q698V5.1        27.635  1205    766     35      62      1210    62      1216    8.43e-95        333     Viruses Eriocheir sinensis reovirus isolate 905

You can see more information on these database matches at `Q9INJ1.1 <https://www.ncbi.nlm.nih.gov/protein/Q9INJ1.1>`_ and `Q698V5.1 <https://www.ncbi.nlm.nih.gov/protein/Q698V5.1>`_

.. _elb_aws_cleanup:

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

    elastic-blast delete --cfg BDQA.ini


The :ref:`delete` command will take a few minutes to run as it needs to manage multiple cloud resources.

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

Alternatively, you can also invoke the script
``aws-show-my-undeleted-searches.sh`` to list any outstanding ElasticBLAST searches.

Summary
-------

You have run a BLASTP (protein-protein) search with ElasticBLAST, producing tabular output that also lists taxonomic information about your matches.  The BLAST search was selected to be quick and inexpensive to run with a query set of 548 proteins and the swissprot database.

You used the CloudShell to launch your search.  The CloudShell has the advantage that it is easy to start up and already has the AWS CLI SDK  and python installed.  The CloudShell has `limitations <https://docs.aws.amazon.com/cloudshell/latest/userguide/limits.html>`_ and you should consider other environments for further work.  ElasticBLAST can also be started from your own machine or a cloud instance you have brought up.  In that case, you will need to make sure that the :ref:`requirements <requirements>` have been met.  You should also look at :ref:`AWS Configuration <aws_conf>` (below)

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
