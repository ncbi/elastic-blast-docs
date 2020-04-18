.. _issues:

Known issues
============

#. The value of :ref:`ELB_BATCH_LEN` greatly affects performance. We are in the
   process of determining reasonable defaults for various programs.

#. If you interrupt the creation of the cluster (``make all``) or its deletion (``make clean``)
   you may end up with GCP resources that are not cleaned up by ElasticBLAST.
