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

.. _tutorial_curl_install:

Installation with curl
======================

Please follow the steps below to install with curl.

.. code-block:: shell

    curl -sO https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast
    curl -sO https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast.md5
    md5sum -c elastic-blast.md5
    chmod +x elastic-blast

These commands will install elastic-blast in your currrent directory.  You can also move it to a different installation path.

