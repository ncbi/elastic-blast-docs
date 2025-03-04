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

.. _elasticblast:

ElasticBLAST
===============================

ElasticBLAST (version |release|) is a cloud-based tool to perform your BLAST searches faster and make you more effective.

ElasticBLAST is ideal for users who have a large number (thousands or more) of queries to BLAST or who prefer to use cloud infrastructure for their searches. It can run BLAST searches that cannot be done on `NCBI WebBLAST <https://blast.ncbi.nlm.nih.gov/Blast.cgi>`_ and runs them more quickly than stand-alone `BLAST+ <https://www.ncbi.nlm.nih.gov/books/NBK279690/>`_.

ElasticBLAST speeds up your work by distributing your searches across multiple cloud instances.  The ability to scale resources in this way allows large numbers of queries to be searched in a shorter time that you normally could with BLAST+.  

The National Center for Biotechnology Information (`NCBI <https://www.ncbi.nlm.nih.gov/>`_), part of the National Library of Medicine at the NIH, develops and maintains ElasticBLAST.

**ElasticBLAST status:** beta

**Platforms available:** AWS, GCP (account required)

**Getting started:** Go to the :ref:`overview` or try out a quick-start (:ref:`quickstart-gcp`, :ref:`quickstart-aws`) and then explore the `demos <https://github.com/ncbi/elastic-blast-demos>`_.

**Citing ElasticBLAST:**

Camacho C, Boratyn GM, Joukov V, Vera Alvarez R, Madden TL. ElasticBLAST: accelerating sequence search via cloud computing. *BMC Bioinformatics*. 2023 Mar 26;24(1):117. doi: `10.1186/s12859-023-05245-9 <https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-023-05245-9/>`_. PMID: `36967390 <https://pubmed.ncbi.nlm.nih.gov/36967390>`_;
