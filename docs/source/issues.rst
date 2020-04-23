.. _issues:

Known issues
============

.. _elb_batch_len_setting:

ELB_BATCH_LEN setting
---------------------

The value of :ref:`ELB_BATCH_LEN` greatly affects performance. We are in the
process of determining reasonable defaults for various programs.

.. _disk_leak:

Persistent disk is not cleaned up
---------------------------------

If you interrupt the creation of the cluster (``make all``) or its deletion (``make clean``)
you may end up with GCP resources that are not cleaned up by ElasticBLAST.

*Please clean these up manually until this issue is addressed*.
