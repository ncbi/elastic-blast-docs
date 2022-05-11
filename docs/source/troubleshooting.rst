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

.. _troubleshooting:

Troubleshooting
===============

How do I report ElasticBLAST problems?
--------------------------------------

Please see :ref:`support`.

How do I figure out what happened with my failed jobs?
------------------------------------------------------


If the ``elastic-blast status`` command reports a jobs as having failed,
please re-run the command with the additional ``--verbose`` option, which
will print more information about the jobs that failed.  You can ignore the 
message about reporting the failure unless you find the message with ``--verbose``
unhelpful.

In the example below, an invalid BLAST+ option was specified.  The error message from the
blastn executable returned with the ``--verbose`` option should be sufficient for a user to 
correct the issue.

.. code-block:: bash

    elastic-blast status --cfg bad_options.ini --verbose
    Your ElasticBLAST search failed, please help us improve ElasticBLAST by reporting this failure as described in https://blast.ncbi.nlm.nih.gov/doc/elastic-blast/support.html
    USAGE
    blastn [-h] [-help] [-import_search_strategy filename]
     [-export_search_strategy filename] [-task task_name] [-db database_name]
     [-dbsize num_letters] [-gilist filename] [-seqidlist filename]
     [-negative_gilist filename] [-negative_seqidlist filename]
     [-taxids taxids] [-negative_taxids taxids] [-taxidlist filename]
     [-negative_taxidlist filename] [-entrez_query entrez_query]
    [...]

**This example applies to AWS only**.

Other messages, besides incorrect BLAST options, may be reported with ``--verbose``
The example below will only occur at AWS.

.. code-block:: bash

    [...]
    14.
     JobArn: arn:aws:batch:us-east-1:1234567890:job/d785c584-ea43-40a0-a781-4575628ea84e
     JobName: elasticblast-cronaldo-blastx-batch-nr-job-17
     StatusReason: Essential container in task exited
     ContainerExitCode: 0
     RuntimeInSeconds: 545.741
   Failed 3
    1.
     JobArn: arn:aws:batch:us-east-1:1234567890:job/464cb1cc-04be-44e5-87a1-e466c41712f3
     JobName: elasticblast-cronaldo-blastx-batch-nr-job-0
     StatusReason: Task failed to start
     ContainerReason: DockerTimeoutError: Could not transition to created; timed out after waiting 4m0s
    2.
     JobArn: arn:aws:batch:us-east-1:1234567890:job/d5cc71e3-cf39-4cdf-b638-efa2db20137a
     JobName: elasticblast-cronaldo-blastx-batch-nr-job-10
     StatusReason: Task failed to start
     ContainerReason: DockerTimeoutError: Could not transition to created; timed out after waiting 4m0s
    3.
     JobArn: arn:aws:batch:us-east-1:1234567890:job/0227d96d-f347-4c4b-afee-0b372585a907
     JobName: elasticblast-cronaldo-blastx-batch-nr-job-12
     StatusReason: Task failed to start
     ContainerReason: DockerTimeoutError: Could not transition to created; timed out after waiting 4m0s

If you would like additional detail and have the `AWS CLI SDK <https://aws.amazon.com/cli/>`_ installed,
please run the command below passing the ``JobArn`` from the output above:

.. code-block:: bash

    aws batch describe-jobs --jobs ${YOUR_JOB_ARN_HERE}


How do I see resources created by ElasticBLAST?
-----------------------------------------------

**If you are running ElasticBLAST on GCP**:

Please check the GCP web console or run the commands below:

* https://console.cloud.google.com/kubernetes/list
* https://console.cloud.google.com/compute/disks

.. code-block:: bash

   gcloud container clusters list
   gcloud compute disks list


**If you are running ElasticBLAST on AWS**:

Please check the AWS web console or run the commands below:

* https://console.aws.amazon.com/cloudformation
* https://console.aws.amazon.com/batch

.. code-block:: bash

   aws cloudformation describe-stacks --stack-name elasticblast-${USER} --output text 
   aws ec2 describe-instances --filter Name=tag:billingcode,Values=elastic-blast Name=tag:Owner,Values=${USER} --query "Reservations[*].Instances[*].InstanceId" --output text 


My search seems to be stalled
-----------------------------

Run the commands below to see what is running in your GCP GKE cluster:

.. code-block:: bash
    
   kubectl describe pv,pvc
   kubectl logs --timestamps --since=24h --tail=-1 -l app=setup -c get-blastdb
   kubectl logs --timestamps --since=24h --tail=-1 -l app=setup -c import-query-batches
   kubectl logs --timestamps --since=24h --tail=-1 -l app=blast -c load-blastdb-into-ram
   kubectl logs --timestamps --since=24h --tail=-1 -l app=blast -c blast
   kubectl logs --timestamps --since=24h --tail=-1 -l app=blast -c results-export
   kubectl logs --timestamps --since=24h --tail=-1 -l app=janitor
   kubectl get pods -o name -l app=blast | sed 's,pod/,,' | xargs -t -I{} kubectl exec {} -c blast -- top -n1 -cb
   kubectl get pods -o name -l app=blast | sed 's,pod/,,' | xargs -t -I{} kubectl exec {} -c blast -- ps aux

If you want to stop the search, run the command below to delete all cloud
resources created by ElasticBLAST. Your input file(s) will not be modified.

.. code-block:: bash

    elastic-blast delete --cfg ${CONFIG_FILE}


I cannot find python or an expected version when I run elastic-blast
--------------------------------------------------------------------

Run

.. code-block:: bash

    python --version 

to see which version of python you have (or if it's even installed).  If python is not found or
it is not one of the supported versions (3.7 or 3.8), you will need to install it (3.8 recommended). 

.. _cloud_shell_disconnect:

My cloud shell session got disconnected
---------------------------------------

If your cloud shell session gets disconnected while ``elastic-blast submit`` or ``elastic-blast delete`` is running,
we recommend you check the status of the search via ``elastic-blast status`` and delete it if it is not running.

This will prevent unnecessary charges that may result from an ElasticBLAST search that was not properly submitted
or deleted. Please see :ref:`clean up cloud resources for GCP <elb_gcp_cleanup>` or 
:ref:`clean up cloud resources for AWS <elb_aws_cleanup>` for details.


I get a message about not being able write into the bucket with submit command
------------------------------------------------------------------------------

Things to check:

* You are logged in with the correct account (e.g., your institutional GCP account and not your personal gmail account).  Check this with:

.. code-block:: bash

   gcloud config get-value account

* The bucket URI (in the "results" field of the config file) starts with ``gs://``.  For example, the bucket URI should be ``gs://sarahtest`` but instead you have "sarahtest".

* The bucket URI is correct and you have permission to write to it.  The GCP page on bucket permissions is at https://cloud.google.com/storage/docs/gsutil/commands/acl but it is probably easiest to try and copy a file into your bucket with:

.. code-block:: bash

    date > date.txt
    gsutil cp date.txt ${YOUR_RESULTS_BUCKET}
    

I get a message about a project not existing
--------------------------------------------

Things to check:

* Make sure you are using the GCP project ID.  Every GCP project has a name, an ID and a number.  The ID consist of lower-case letters and dashes and possibly numbers.  The project number is simply an integer.  See all three by going to your dashboard at https://console.cloud.google.com/home/dashboard


I see 'AccessDeniedException' errors in the log file
----------------------------------------------------

If you see error message(s) similar to the one below:

.. code-block:: bash

    AccessDeniedException: 403 HttpError accessing <https://storage.googleapis.com/download/storage/v1/b/elb-test/o/tmp%2Fquery_batches%2Fbatch_000.fa?generation=1613505095926154&alt=media>: response: <{'x-guploader-uploadid': 'ABg5-Uw9u0gHzPyMeFeaQFUgPaHW5bgVbUbPs2rlk9yr6vPEbif6MainD6pvytbh7IAj82KJYlnVrpndRQ3fm3y5Dy8', 'content-type': 'text/html; charset=UTF-8', 'date': 'Tue, 16 Feb 2021 19:55:30 GMT', 'vary': 'Origin, X-Origin', 'expires': 'Tue, 16 Feb 2021 19:55:30 GMT', 'cache-control': 'private, max-age=0', 'content-length': '128', 'server': 'UploadServer', 'status': '403'}>, content <1234567890-compute@developer.gserviceaccount.com does not have storage.objects.get access to the Google Cloud Storage object.>

Run the command below and check whether the service account ``1234567890-compute@developer.gserviceaccount.com`` is listed.

.. code-block:: bash

    gsutil iam get ${YOUR_RESULTS_BUCKET}

If it is not listed, you may need to run a command along the lines of the
examples below (only one of them, both are *not* required).
Please refer to `the GCP documentation
<https://cloud.google.com/storage/docs/access-control/using-iam-permissions#gsutil>`_
for further details.


.. code-block:: bash

    gsutil iam set serviceAccount:1234567890.gserviceaccount.com:roles/storage.admin ${YOUR_RESULTS_BUCKET}
    gsutil iam set user:${YOUR_GCP_ACCOUNT_ADDRESS}:roles/storage.admin ${YOUR_RESULTS_BUCKET}

Project X has no network named "default"
----------------------------------------

If you see error message below, where ``X`` is your GCP project name, you need to configure ElasticBLAST with the
GCP network and sub-network to use.

.. code-block:: bash

    ERROR: (gcloud.container.clusters.create) ResponseError: code=400, message=Project "X" has no network named "default".

Please refer to their respective configuration entries for information on how to configure these:

* :ref:`elb_gcp_network`
* :ref:`elb_gcp_subnetwork`

.. _cluster_admin:

Cannot create resource "clusterrolebindings"
--------------------------------------------

If you see the error message below, where ``USERNAME`` is your GCP user, group, or service
account name, you need to grant additional permissions to said user/service
account.

.. code-block:: bash

    ERROR: The command "kubectl --context=[...] -f/lib/python3.9/site-packages/elastic_blast/templates/elb-janitor-rbac.yaml" returned with exit code 1
    Error from server (Forbidden): error when creating "/lib/python3.9/site-packages/elastic_blast/templates/elb-janitor-rbac.yaml": clusterrolebindings.rbac.authorization.k8s.io is forbidden: User "USERNAME" cannot create resource "clusterrolebindings" in API group "rbac.authorization.k8s.io" at the cluster scope: requires one of ["container.clusterRoleBindings.create"] permission(s).

You can grant the :ref:`required permissions using the provided script <grant_cluster_admin>`.

**Please keep in mind that disabling this feature requires you to invoke
"elastic-blast delete" to avoid incurring charges after ElasticBLAST
has completed its operation or failed.**

.. _insufficient_cpu_quota:

I got a quota error for CPUs
-----------------------------

If you get an error like the one below, you will have to either `request an
increase in your CPU quota <https://cloud.google.com/compute/quotas#requesting_additional_quota>`_ or
reduce the resources requested in your ElasticBLAST configuration.

.. code-block:: shell

    (gcloud.container.clusters.create) ResponseError: code=403, 
    message=Insufficient regional quota to satisfy request: 
    resource "CPUS": request requires '32.0' and is short '8.0'. 
    project has a quota of '24.0' with '24.0' available. 
    View and manage quotas at ...

To reduce the resouces requested by ElasticBLAST, adjust the :ref:`number of worker nodes <elb_num_nodes>` and
the :ref:`machine type <elb_machine_type>` so that the total number of CPUs requested does not exceed your quota.

In the example above, either of the following alternative configurations would work:

* For a total of 16 CPUs: ``machine-type = n1-standard-16`` and ``num-cpus = 1``
* For a total of 24 CPUs: ``machine-type = n1-standard-8`` and ``num-cpus = 3``

.. _kubectl_cache:

$HOME/.kube uses a lot of disk space
------------------------------------

ElasticBLAST for GCP relies on ``kubectl``, which by default caches data in the
user's home directory. You can see how much disk space is being used by
``kubectl`` by running the following command:

.. code-block:: shell

    du -shc ~/.kube/* | sort -hr

If this is too much disk utilization, you can try to delete old cached data to
reduce it (assuming this is appropriate for you).
The command below deletes ``kubectl`` cached data that is older
than 90 days:

.. code-block:: shell

    find ~/.kube/cache ~/.kube/http-cache -type f -mtime +90 -delete
