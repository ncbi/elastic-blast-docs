.. _quickstart-aws:

Quickstart for AWS
==================


Overview of ElasticBLAST on AWS
-------------------------------

.. figure:: ElasticBLASTonAWS-architecture.png
   :alt: Overview of ElasticBLAST at AWS
   :class: with-border


Get ElasticBLAST
----------------

.. code-block:: shell

    curl -sO https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast
    curl -sO https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast.md5
    md5sum -c elastic-blast.md5
    chmod +x elastic-blast
    # Optional: move elastic-blast to the desired installation path


The code examples below assume that ElasticBLAST was installed in the current
working directory and that the :ref:`requirements <requirements>` have been met.


Set up an output bucket (if one doesn't exist)
----------------------------------------------

.. code-block:: shell

    aws s3 ls s3://elasticblast-${USER} || aws s3 mb s3://elasticblast-${USER}



Provide AWS credentials
-----------------------

If not already present, please please provide your AWS credentials. This can be
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


Configure it
------------

The minimal configuration requires: 

#. :ref:`AWS region <elb_aws_region>` to run ElasticBLAST on (``us-east-1`` recommended, see :ref:`AWS configuration <aws_conf>` for additional details),
#. :ref:`query sequences <elb_queries>` in a single file or tarball, 

#. a :ref:`cloud storage bucket for results <elb_results>`. This value must start with ``s3://`` and _uniquely_ identifies your ElasticBLAST search. **Please keept track of this**.

#. basic BLAST parameters (:ref:`program <elb_blast_program>` and :ref:`database <elb_db>`), and

#. :ref:`elb_num_nodes` to start.



They can be provided on a standard ini configuration file, e.g.:

.. code-block::
    :name: minimal-config
    :linenos:

    [cloud-provider]
    aws-region = us-east-1

    [cluster]
    machine-type = m5.8xlarge
    num-nodes = 1

    [blast]
    program = blastp
    db = swissprot
    queries = s3://elasticblast-test/queries/BDQE01.1.fsa_aa
    results = ${YOUR_RESULTS_BUCKET}
    options = -task blastp-fast -evalue 0.01 -outfmt 7 

In addition to the minimal parameters, the configuration file above includes some BLAST options.
See :ref:`configuration` for details on all the configuration parameters.

Run it!
-------

.. code-block:: bash

    ./elastic-blast submit --cfg ${CONFIG_FILE} --loglevel DEBUG

**NOTE: currently you can only have one ElasticBLAST search running at a time**.


Monitor progress
----------------
To check on the progress of the search, inspect the logfile
(``elastic-blast.log`` by default) and/or run the command below:

.. code-block:: bash
    :name: status

    ./elastic-blast status --cfg ${CONFIG_FILE} --loglevel DEBUG

The status command will not return proper results until the submit command has finished.

You can also visit the web intefaces for 
`CloudFormation <https://console.aws.amazon.com/cloudformation/>`_ and
`Batch <https://console.aws.amazon.com/batch/>`_ 
to monitor the progress of your cloud resource creation and jobs respectively.

Problems? Search taking too long? Please see :ref:`support`.

Get results
-----------

Run the command below to download the results.

**Note**: this command requires the `AWS CLI SDK <https://aws.amazon.com/cli/>`_.

.. code-block:: bash

    aws s3 cp ${YOUR_RESULTS_BUCKET}/*.out.gz . 

Clean up
--------
This step is **critical**, please do not omit it, even if you ran Ctrl-C when
starting ElasticBLAST. If you do not clean up your cloud resources, you will accrue charges from
your cloud service provider.  It is also recommended each time you start a new
ElasticBLAST search. 

.. code-block:: bash

    ./elastic-blast delete --cfg ${CONFIG_FILE} --loglevel DEBUG


The delete command will take a few minutes to run as it needs to manage multiple cloud resources.

You may verify that your cloud resources have been deleted by running: 

.. code-block:: bash

  aws cloudformation describe-stacks --stack-name elasticblast-${USER} --output text 
  aws ec2 describe-instances --filter Name=tag:billingcode,Values=elastic-blast Name=tag:Owner,Values=${USER} --query "Reservations[*].Instances[*].InstanceId" --output text 

These commands will show the CloudFormation stack created by ElasticBLAST by
default as well as the instance IDs of the EC2 instances it created. 

.. _aws_conf:

AWS Configuration
-----------------

The minimum required configuration parameters for running ElasticBLAST in AWS include:

* :ref:`region <elb_aws_region>`

In addition, you must have the necessary credentials and permissions to run the AWS services required by ElasticBLAST.

If you are new to AWS, please review and follow the instructions in the link
below:

* `Setting up for AWS Batch <https://docs.aws.amazon.com/batch/latest/userguide/get-set-up-for-aws-batch.html>`_
