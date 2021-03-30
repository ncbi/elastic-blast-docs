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


.. _budget:

Setting budgets and budget alerts
=================================


ElasticBLAST runs the bulk of its compute workload on cloud service providers
which typically have a pay-as-you-go model. These  cloud service providers
typically provide means to monitor the expenses you incur as well as to issue
alerts if budgets are exceeded. We recommend that you use these tools if you
have budgetary constraints, as you are responsible for monitoring and paying
for cloud expenses incurred on your behalf by elastic-blast.

Below are a few relevant links to documentation for AWS and GCP:

https://aws.amazon.com/aws-cost-management/aws-budgets/

https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/monitoring-costs.html

https://aws.amazon.com/blogs/aws-cost-management/update-cost-explorer-forecasting-api-improvement/


https://cloud.google.com/cost-management

https://cloud.google.com/billing/docs/how-to/budgets

https://cloud.google.com/billing/docs/reports

