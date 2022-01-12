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

.. _aws_issues:

Known issues on AWS
===================

.. _elb_delete_failure:

ElasticBLAST delete failures
----------------------------

After ElasticBLAST starts the running (i.e.: ``elastic-blast status`` indicates
that there is more than 1 job running), issuing the ``elastic-blast delete``
command will take longer than usual (e.g.: greater than 15 minutes) and could
eventually fail with a message similar to:

::

    ERROR: Cloudformation stack deletion failed with errors elasticblast-${USER}-4fd9de5e8: 
    The following resource(s) failed to delete: [InternetGateway, InternetGatewayAttachment, NewVPC]. . 

    NewVPC: The vpc 'vpc-05cf58efb27ce147e' has dependencies and cannot be deleted. 
        (Service: AmazonEC2; Status Code: 400; Error Code: DependencyViolation; Request ID: 0275a4e3-2776-453b-97de-9a99fff59b08; Proxy: null). 

    InternetGateway: The internetGateway 'igw-062b2c03bdc4dc6b6' has dependencies and cannot be deleted. 
        (Service: AmazonEC2; Status Code: 400; Error Code: DependencyViolation; Request ID: 8c2bcdf5-a5b7-4352-ab59-308818229df8; Proxy: null). 

    InternetGatewayAttachment: Network vpc-05cf58efb27ce147e has some mapped public address(es). Please unmap those public address(es) before detaching the gateway. 
        (Service: AmazonEC2; Status Code: 400; Error Code: DependencyViolation; Request ID: 3bb80118-788b-4d42-8908-c977adb4032c; Proxy: null)


In this case, the AWS resources above need more time so their dependent
resources are shutdown. These particular resources do not incur in additional
charges, but their existance counts towards your account's quota.
We recommend you retry the ``elastic-blast delete`` command ~24 hours later to fully
shutdown the aforementioned resources.


.. _aws_out_of_memory:

BLAST command killed
-----------------------

If an ElasticBLAST search fails and ``elastic-blast status --verbose`` reports
a message similar to:

::

   The command "time blastn -query batch_002.fa -db ref_euk_rep_genomes -num_threads 16 -out batch_002-blastn-ref_euk_rep_genomes.out -evalue 0.01 -outfmt 7" returned with exit code 137
   /blast/bin/blastn: line 25:    27 Killed                  blastn.REAL "$@"
   Command exited with non-zero status 137

the failure is most likely caused by at least one BLAST search job that has
run out of memory. BLAST searches that produce large numbers of hits may
require more memory than provided by the cloud instance type selected by
ElasticBLAST. It may happen, for example, when searching large genomic
databases, like `RefSeq Eukaryotic Representative Genome Database <https://github.com/ncbi/blast_plus_docs/blob/master/README.md#blast-databases>`_.

Selecting an instance type with more memory, like ``r5ad.16xlarge``, using :ref:`ELB_MACHINE_TYPE` configuration parameter, will fix the problem.
