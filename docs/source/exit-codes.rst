Exit codes
==========

=========  ============================================================================ ============================
Exit code  Meaning                                                                      Applies to subcommand
=========  ============================================================================ ============================
0          Success                                                                      All
1          Error in query sequence(s), BLAST options, or ElasticBLAST configuration     Submit
2          Error in BLAST database                                                      Submit
6          Error creating output files                                                  Submit, status
7          Missing required dependency                                                  All
9          Operation interrupted                                                        All
255        Unknown error                                                                All
=========  ============================================================================ ============================

.. 3          Error in BLAST engine                                                        Submit, status
.. 4          Out of memory                                                                Submit, status
.. 5          Timeout                                                                      Submit, status
.. 8          Error communicating with cluster                                             All
.. 10         Search is in progress                                                        Status, if flag is provided
