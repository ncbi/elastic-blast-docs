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

.. _gcp-tips:

Tips for GCP
============

.. _try_elb_on_gcp:

How to easily try elastic-blast on GCP?
---------------------------------------

To try elastic-blast with relatively small input size (less than 10k
residues, or less than 100k bases), run ``elastic-blast`` from the GCP cloud shell.
You can access it on your web browser at https://console.cloud.google.com/?cloudshell=true
or via the ``gcloud`` command:

.. code-block:: shell

    gcloud alpha cloud-shell ssh --ssh-flag=-A

.. _install_deps:

How to install dependencies on Debian/Ubuntu machines?
------------------------------------------------------

If you are working on Debian or Ubuntu Linux distribution and have ``root`` permissions, you can install kubectl and python-distutils as follows:

.. code-block:: shell

   sudo apt-get -yqm update
   sudo apt-get install -yq kubectl python3-distutils

