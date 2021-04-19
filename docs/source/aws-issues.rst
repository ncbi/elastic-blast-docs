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

.. _elb_batch_len_setting_aws:

Batch length setting
--------------------

The value of :ref:`ELB_BATCH_LEN` greatly affects performance. The defaults are reasonable, but may not be optimal in some cases. We are in the process of determining better values for various programs and use cases.


.. _elb_delete_failure:

ElasticBLAST delete failures
----------------------------

After ElasticBLAST starts the running (i.e.: ``elastic-blast status`` indicates
that there is more than 1 job running), issuing the ``elastic-blast delete``
command will take longer than usual (e.g.: greater than 15 minutes) and could
eventually fail.

In this case, the AWS resources need more time to shutdown and they eventually
will, but the end user is required to repeat the ``elastic-blast delete`` 
command to properly clean up all AWS resources created by ElasticBLAST.
