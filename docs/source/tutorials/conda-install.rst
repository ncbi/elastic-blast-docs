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

Installation from BioConda
==========================

Please follow the steps below to install `ElasticBLAST from BioConda <https://anaconda.org/bioconda/elastic-blast/>`_:

Configure Conda
^^^^^^^^^^^^^^^

If you already have a file called `$HOME/.condarc`, edit it to ensure it
contains the text below, otherwise create a new file with its contents.

.. code-block:: text

    channels:
        - conda-forge
        - bioconda
        - defaults
    ssl_verify: true

Create a new Anaconda environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In the next 3 steps, `elb-env` could be replaced by the name of your choosing.

.. code-block:: bash

    conda create -n elb-env

This program will display installation information and ask whether it should proceed as follows: ``Proceed ([y]/n)?``. Please type ``y``.

Install the latest version of ElasticBLAST
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

    conda install -n elb-env elastic-blast

This program will display installation information and ask whether it should proceed as follows: ``Proceed ([y]/n)?``. Please type ``y``.

Activate the environment
^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

    conda activate elb-env

Test the installation of ElasticBLAST
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

    elastic-blast --version

After running this command, you should get the following output:

.. code-block:: bash

    elastic-blast {VERSION}

