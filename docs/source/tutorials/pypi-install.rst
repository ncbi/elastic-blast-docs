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

.. _tutorial_pypi:

Installation from PyPI.org
==========================

Please follow the steps below to install `ElasticBLAST from PyPI.org <https://pypi.org/project/elastic-blast/>`_:

Create a new python virtual environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

    [ -d .elastic-blast-venv ] && rm -fr .elastic-blast-venv
    python3 -m venv .elastic-blast-venv


Activate the virtual environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

    source .elastic-blast-venv/bin/activate

Install the latest version of ElasticBLAST
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

    pip install elastic-blast=={VERSION}

Test the installation of ElasticBLAST
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

    elastic-blast --version

After running this command, you should get the following output:

.. code-block:: bash

    elastic-blast {VERSION}


Troubleshooting
^^^^^^^^^^^^^^^

If you run into installation problems on AWS, please run the command below and kindly re-try the installation process.

.. code-block:: bash

    sudo yum install -y python3-wheel
