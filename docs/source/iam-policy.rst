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


.. _iam-policy:

Required IAM Permissions
========================

The following IAM policy lists the requirements to run ElasticBLAST on AWS.
Please note that you **must** replace ``AWS_ACCOUNT`` with your AWS Account ID.

.. code-block:: json

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "VisualEditor0",
                "Effect": "Allow",
                "Action": [
                    "ec2:AttachVolume",
                    "ec2:AuthorizeSecurityGroupIngress",
                    "ec2:DeleteSubnet",
                    "batch:CancelJob",
                    "batch:DeleteComputeEnvironment",
                    "ec2:DeleteTags",
                    "batch:SubmitJob",
                    "ec2:CreateVpc",
                    "ec2:AttachInternetGateway",
                    "batch:UpdateComputeEnvironment",
                    "ec2:DeleteRouteTable",
                    "ec2:ModifySubnetAttribute",
                    "ec2:AssociateRouteTable",
                    "ec2:DeleteVolume",
                    "batch:DeregisterJobDefinition",
                    "batch:TerminateJob",
                    "batch:CreateJobQueue",
                    "ec2:CreateRoute",
                    "ec2:CreateInternetGateway",
                    "ec2:CreateSecurityGroup",
                    "batch:DeleteJobQueue",
                    "ec2:ModifyVpcAttribute",
                    "ec2:DeleteInternetGateway",
                    "ec2:DeleteLaunchTemplateVersions",
                    "ec2:DetachVolume",
                    "ec2:DeleteLaunchTemplate",
                    "ec2:CreateTags",
                    "ec2:DeleteRoute",
                    "ec2:CreateRouteTable",
                    "ec2:DetachInternetGateway",
                    "ec2:DisassociateRouteTable",
                    "ec2:CreateLaunchTemplateVersion",
                    "ec2:CreateVolume",
                    "ec2:CreateLaunchTemplate",
                    "ec2:DeleteSecurityGroup",
                    "ec2:DeleteVpc",
                    "ec2:CreateSubnet",
                    "batch:UpdateJobQueue"
                ],
                "Resource": [
                    "arn:aws:ec2:*:$AWS_ACCOUNT:security-group/*",
                    "arn:aws:ec2:*:$AWS_ACCOUNT:vpc/*",
                    "arn:aws:ec2:*:$AWS_ACCOUNT:ipv6pool-ec2/*",
                    "arn:aws:ec2:*:$AWS_ACCOUNT:route-table/*",
                    "arn:aws:ec2:*:$AWS_ACCOUNT:launch-template/*",
                    "arn:aws:ec2:*:$AWS_ACCOUNT:instance/*",
                    "arn:aws:ec2:*:$AWS_ACCOUNT:internet-gateway/*",
                    "arn:aws:ec2:*:$AWS_ACCOUNT:subnet/*",
                    "arn:aws:ec2:*:$AWS_ACCOUNT:volume/*",
                    "arn:aws:batch:*:$AWS_ACCOUNT:compute-environment/*",
                    "arn:aws:batch:*:$AWS_ACCOUNT:job-definition/*:*",
                    "arn:aws:batch:*:$AWS_ACCOUNT:job/*",
                    "arn:aws:batch:*:$AWS_ACCOUNT:job-queue/*"
                ]
            },
            {
                "Sid": "VisualEditor1",
                "Effect": "Allow",
                "Action": [
                    "iam:CreateInstanceProfile",
                    "iam:DeleteInstanceProfile",
                    "iam:GetRole",
                    "iam:GetPolicyVersion",
                    "iam:GetInstanceProfile",
                    "iam:UntagRole",
                    "iam:GetPolicy",
                    "iam:TagRole",
                    "iam:RemoveRoleFromInstanceProfile",
                    "iam:CreateRole",
                    "iam:DeleteRole",
                    "iam:AttachRolePolicy",
                    "iam:TagPolicy",
                    "iam:AddRoleToInstanceProfile",
                    "iam:PassRole",
                    "iam:DetachRolePolicy",
                    "iam:UntagPolicy",
                    "iam:UntagInstanceProfile",
                    "iam:TagInstanceProfile"
                ],
                "Resource": [
                    "arn:aws:iam::$AWS_ACCOUNT:role/*",
                    "arn:aws:iam::$AWS_ACCOUNT:instance-profile/*",
                    "arn:aws:iam::$AWS_ACCOUNT:policy/*"
                ]
            },
            {
                "Sid": "VisualEditor2",
                "Effect": "Allow",
                "Action": [
                    "ec2:DescribeInstances",
                    "batch:CancelJob",
                    "ec2:DescribeSnapshots",
                    "batch:TagResource",
                    "batch:DescribeComputeEnvironments",
                    "ec2:DescribeInternetGateways",
                    "batch:DeregisterJobDefinition",
                    "cloudformation:DescribeStackEvents",
                    "batch:ListTagsForResource",
                    "ec2:DescribeSpotDatafeedSubscription",
                    "ec2:DescribeVolumes",
                    "ec2:DescribeAccountAttributes",
                    "ec2:DescribeReservedInstances",
                    "s3:DeleteObject",
                    "servicequotas:ListServiceQuotas",
                    "ec2:DescribeNetworkAcls",
                    "ec2:DescribeRouteTables",
                    "batch:CreateComputeEnvironment",
                    "ec2:DescribeSpotFleetRequestHistory",
                    "batch:ListJobs",
                    "cloudformation:DescribeStacks",
                    "s3:PutObject",
                    "s3:GetObject",
                    "batch:UntagResource",
                    "cloudformation:DeleteStack",
                    "ec2:DescribeInstanceTypes",
                    "batch:RegisterJobDefinition",
                    "batch:DescribeJobDefinitions",
                    "cloudformation:UntagResource",
                    "ec2:DescribeSubnets",
                    "ec2:DescribeVpnGateways",
                    "batch:DescribeJobQueues",
                    "ec2:DescribeAddresses",
                    "batch:DeleteComputeEnvironment",
                    "batch:SubmitJob",
                    "s3:ListBucket",
                    "ec2:DescribeSpotInstanceRequests",
                    "ec2:DescribeVpcAttribute",
                    "ec2:DescribeSpotPriceHistory",
                    "batch:TerminateJob",
                    "batch:CreateJobQueue",
                    "batch:DescribeJobs",
                    "ec2:DescribeNetworkInterfaces",
                    "ec2:DescribeAvailabilityZones",
                    "cloudformation:DescribeAccountLimits",
                    "batch:DeleteJobQueue",
                    "ec2:DescribeTags",
                    "ec2:DescribeNatGateways",
                    "ec2:DescribeSecurityGroups",
                    "ec2:DescribeSpotFleetRequests",
                    "ec2:DescribeSpotFleetInstances",
                    "cloudformation:CreateStack",
                    "ec2:DescribeVpcs",
                    "cloudformation:TagResource",
                    "batch:UpdateJobQueue"
                ],
                "Resource": "*"
            }
        ]
    }
