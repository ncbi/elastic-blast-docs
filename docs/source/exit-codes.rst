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


Exit codes
==========

=========  ============================================================================ ============================
Exit code  Meaning                                                                      Applies to subcommand
=========  ============================================================================ ============================
0          Success                                                                      All
1          Error in query sequence(s), BLAST options, or ElasticBLAST configuration     Submit
2          Error in BLAST database                                                      Submit
5          Timeout                                                                      Submit
6          Error creating output files                                                  Submit, status
7          Missing required dependency or cloud vendor limit exceeded                   All
8          Error communicating with the cluster                                         All
9          Operation interrupted                                                        All
255        Unknown error                                                                All
=========  ============================================================================ ============================

.. 3          Error in BLAST engine                                                        Submit, status
.. 4          Out of memory                                                                Submit, status
.. 5          Timeout                                                                      Submit, status
.. 8          Error communicating with cluster                                             All
.. 10         Search is in progress                                                        Status, if flag is provided
