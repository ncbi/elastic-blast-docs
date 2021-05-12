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


ElasticBLAST, version |release|
===============================

ElasticBLAST is a cloud-based tool to perform your BLAST searches faster and make you more effective.

ElasticBLAST is ideal for users who have a large number (thousands or more) of queries to BLAST or who prefer to use cloud infrastructure for their searches. It can run BLAST searches that cannot be done on `NCBI WebBLAST <https://blast.ncbi.nlm.nih.gov/Blast.cgi>`_ and runs them more quickly than stand-alone `BLAST+ <https://www.ncbi.nlm.nih.gov/books/NBK279690/>`_.

The National Center for Biotechnology Information (`NCBI <https://www.ncbi.nlm.nih.gov/>`_), part of the National Library of Medicine at the NIH, developed and maintains ElasticBLAST.

It runs on AWS and GCP and requires that you have an account on one of those cloud providers.

Currently, ElasticBLAST is alpha software

To get started, go to the :ref:`overview`


     
     
     

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Contents:

   overview
   quickstart-aws
   quickstart-gcp
   requirements
   Budget <budget>
   exit-codes
   configuration
   tips-gcp
   taxid-filtering
   support
   troubleshooting
   aws-issues
   gcp-issues
   privacy
   LICENSE
