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

These commands will install ``elastic-blast`` in your current working directory. 

.. code-block:: shell

    curl -sO https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast
    curl -sO https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast.md5
    md5sum -c elastic-blast.md5
    chmod +x elastic-blast

You may want to consider moving into a different installation path (e.g.:
``/usr/local/bin``) for convenient access.

Note about python versions
--------------------------

The ``elastic-blast`` file downloaded by the code snippet above runs only on
python 3.7. If this does not work for you, please follow the instructions below:


Check the python version on your computer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the command below to find out what python version you have installed.

.. code-block:: shell

    python3 -V

This will print something along the lines of ``Python 3.8.6``.

Download the appropriate elastic-blast file for your python version
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For python 3.8.x:

.. code-block:: shell

    curl -s https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast3.8 -o elastic-blast
    curl -s https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast3.8.md5 -o elastic-blast.md5
    md5sum -c elastic-blast.md5
    chmod +x elastic-blast

For python 3.9.x:

.. code-block:: shell

    curl -s https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast3.9 -o elastic-blast
    curl -s https://storage.googleapis.com/elastic-blast/release/{VERSION}/elastic-blast3.9.md5 -o elastic-blast.md5
    md5sum -c elastic-blast.md5
    chmod +x elastic-blast
