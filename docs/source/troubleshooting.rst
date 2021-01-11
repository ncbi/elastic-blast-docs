.. _troubleshooting:

Troubleshooting
===============

How do I report ElasticBLAST problems?
--------------------------------------

Please see :ref:`support`.

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
    
   kubectl logs -l app=setup --timestamps
   kubectl logs -l app=blast -c blast --timestamps
   kubectl logs -l app=blast -c results-export --timestamps
   kubectl get pods -o name -l app=blast | sed 's,pod/,,' | xargs -t -I{} kubectl exec {} -c blast -- top -n1 -cb
   kubectl get pods -o name -l app=blast | sed 's,pod/,,' | xargs -t -I{} kubectl exec {} -c blast -- ps aux

If you want to stop the search, run the command below to delete all cloud
resources created by ElasticBLAST. Your input file(s) will not be modified.

.. code-block:: bash

    ./elastic-blast delete --cfg ${CONFIG_FILE} --loglevel DEBUG


I cannot find python or an expected version when I run elastic-blast
--------------------------------------------------------------------

Run

.. code-block:: bash

    python --version 

to see which version of python you have (or if it's even installed).  If python is not found or
it is not one of the supported versions (3.6, 3.7 or 3.8), you will need to install it (3.8 recommended). 
If one of versions from 3.6, 3.7 or 3.8 is found, then you can try the corresponding elastic-blast 
script (e.g., ``elastic-blast3.8``).


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
