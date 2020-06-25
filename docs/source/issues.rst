.. _issues:

Known issues
============

.. _elb_batch_len_setting:

Batch length setting
--------------------

The value of :ref:`ELB_BATCH_LEN` greatly affects performance. The defaults are reasonable, but may not be optimal in some cases. We are in the process of determining better values for various programs and use cases.


.. _pd_leak:

Persistent disk not properly deleted
------------------------------------

As part of its normal operation ElasticBLAST starts a
:ref:`persistent disk <elb_pd_size>` and under some circumstances it
is not properly deleted. To double check and delete it, please run the commands
below accordingly:

.. code-block:: bash

   gcloud compute disks list # to list disks in GCP
   gcloud compute disks delete ${DISK_NAME}  # to delete relevant disks
