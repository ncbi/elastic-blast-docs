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

.. _tutorial_spot:

Using ElasticBLAST with Spot and Preemptible Instances
======================================================

Discounted instances allow you to run ElasticBLAST at a fraction of the full (on-demand) cost.  On AWS, you can use spot instances with a `floating price <https://aws.amazon.com/ec2/spot/pricing/>`_.  These rates vary by region and instance type.  On GCP, you can use `preemptible instances <https://cloud.google.com/compute/docs/instances/spot#pricing>`_

In `Table 3 of our ElasticBLAST article <https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-023-05245-9/tables/3/>`_, we show that ElasticBLAST runs well with discounted instances and costs less than on-demand instances.


``How to request discounted instance``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can request a spot (AWS) or preemptible (GCP) instance with ElasticBLAST by adding a line to your configuration file in the cluster section.  See the example below.  You use the same keyword ("use-preemptible") for both AWS and GCP.  You can read more about the :ref:`elb_use_preemptible` configuration variable.

.. code-block::

    [cluster]
    use-preemptible = yes


``What happens if the discounted instance is terminated?``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If the discounted instance is terminated, ElasticBLAST will bid on a new instance and restart your batches (i.e., your BLAST searches).  No action will be required on your part.

You will lose a minimal amount of time if the instance is terminated. ElasticBLAST works through your queries in batches and saves the results of a batch to a cloud bucket (S3 in AWS or GCS in GCP), so only the work for the currently running batch will be repeated.  According to `AWS Spot Instance Advisor page <https://aws.amazon.com/ec2/spot/instance-advisor>`_, the average frequency of interruption across all regions and instances is less than 5% (accessed July 24, 2023).


``What type of instance is used?``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ElasticBLAST selects the same instance type for you that it normally would for an on-demand instance. ElasticBLAST selects the instance based on your database size and the program, so we think this is still the best way to run your searches efficiently. 

You may specify another instance type if you want by using the :ref:`elb_machine_type` configuration variable.  We do not recommend this.


