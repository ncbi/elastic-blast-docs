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

.. _gcp-tips:

Tips for GCP
============

.. _try_elb_on_gcp:

How to easily try elastic-blast on GCP?
---------------------------------------

To try elastic-blast with relatively small input size (less than 10k
residues, or less than 100k bases), run ``elastic-blast`` from the GCP cloud shell.
You can access it on your web browser at https://console.cloud.google.com/?cloudshell=true
or via the ``gcloud`` command:

.. code-block:: shell

    gcloud alpha cloud-shell ssh --ssh-flag=-A

.. _install_deps:

How to install dependencies on Debian/Ubuntu machines?
------------------------------------------------------

If you are working on Debian or Ubuntu Linux distribution and have ``root`` permissions, you can install kubectl and python-distutils as follows:

.. code-block:: shell

   sudo apt-get -yqm update
   sudo apt-get install -yq kubectl python3-distutils


.. _gcp_free_trial:

Using the Free Trial at GCP
--------------------------

GCP has a Free Trial for new users (https://cloud.google.com/free).  The Free Trial comes with some restrictions that are important for ElasticBLAST users.  These include only being able to run eight core concurrently and limiting the persistent disk size to 250G (https://cloud.google.com/terms/free-trial).  Normally, ElasticBLAST would run more than eight cores at a time and the default persistent disk size is 3000G.  

You should be able to run ElasticBLAST under the Free Trial following the instructions at :ref:`quickstart-gcp`, but you will need to modify the configuration file to use fewer resources. You may not be able to use the cloud shell and the instance suggested below as that may exceed the quota on cores allowed at one time.  In that case, you will need to submit your ElasticBLAST search from your own computer.

Remember also that the Free Trial only lasts 90 days.

Below is a configuration file that should work under the Free Trial.  This file has been modified from the one in :ref:`quickstart-gcp` in the following ways:

* num-nodes has been set to 1 rather than 2.
* A machine-type, n1-highmem-8, with 8 CPUs has been specified. Normally, ElasticBLAST automatically sets the machine type based on the size of the database and the program.
* A persistent disk (pd) with 200G has been specified.
* The database is set to swissprot, which is small enough to fit into the memory of the n1-highmem-8 machine.

.. code-block::
    :linenos:

    [cloud-provider]
    gcp-project = YOUR_GCP_PROJECT_ID
    gcp-region = us-east4   
    gcp-zone = us-east4-b

    [cluster]
    num-nodes = 1
    labels = owner=USER
    machine-type = n1-highmem-8
    pd-size = 200G

    [blast]
    program = blastp
    db = swissprot
    queries = gs://elastic-blast-samples/queries/protein/BDQA01.1.fsa_aa
    results = gs://elasticblast-USER/results/BDQA
    options = -task blastp-fast -evalue 0.01 -outfmt "7 std sskingdoms ssciname" 


