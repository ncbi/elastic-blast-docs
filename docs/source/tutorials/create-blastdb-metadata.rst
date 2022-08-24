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

.. _tutorial_create_blastdb_metadata:

Create BLAST database metadata
==============================

ElasticBLAST includes the ``create-blastdb-metadata.py`` script to generate a
file containing metadata used by ElasticBLAST to configure the memory limit for
each BLAST job.

These metadata files are provided and maintained by NCBI in both GCP and AWS
buckets, but if you are working with your own BLAST database, you will benefit
from creating the metadata file and uploading it to the cloud alongside the
BLAST database files. This tutorial will show you how to do that.

**Note:**

If you create a BLAST database using ``makeblastdb`` 
`version 2.13 <https://www.ncbi.nlm.nih.gov/books/NBK131777/#Blast_ReleaseNotes.BLAST_2_13_0_March_11>`_
or newer, you do not need to use the ``create-blastdb-metadata.py`` script. Just upload
the BLAST database files to the cloud bucket of your choice!

The code sample below assumes you are creating a nucleotide
BLAST database from a FASTA file called ``MY_FASTA_FILE.fsa`` and uploading the
database to the AWS S3 bucket ``s3://mybucket/blastdb``.

.. code-block:: bash

   # Create BLASTDB
   makeblastdb -in MY_FASTA_FILE.fsa -dbtype nucl --title "My database title" --out my-database 
   # Upload BLASTDB
   aws s3 cp my-database* s3://mybucket/blastdb/

If you do not have ``makeblastdb`` 
`version 2.13 <https://www.ncbi.nlm.nih.gov/books/NBK131777/#Blast_ReleaseNotes.BLAST_2_13_0_March_11>`_
or newer, please follow the instructions below.

The examples below assume that you have a nucleotide BLAST database called 
``ecoli`` located in your computer's ``/blast/db`` directory and that you
will store said BLAST database in ``s3://mybucket/blastdb``. Please update 
these values accordingly.

Create BLASTDB metadata file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the command below to create a BLASTDB metadata file for ``/blast/db/ecoli``
to be uploaded to ``s3://mybucket/blastdb``.

.. code-block:: bash

   create-blastdb-metadata.py --db /blast/db/ecoli --dbtype nucl --pretty  --output-prefix s3://mybucket/blastdb

You can verify that the metadata file was generated as follows:

.. code-block:: bash
    
   cat ecoli-nucl-metadata.json

The output will resemble what is shown below:

.. code-block:: bash
    
   {
     "dbname": "ecoli",
     "version": "1.1",
     "dbtype": "Nucleotide",
     "description": "ecoli",
     "number-of-letters": 4662239,
     "number-of-sequences": 400,
     "files": [
       "s3://mybucket-name/blastdbs/ecoli.ndb",
       "s3://mybucket-name/blastdbs/ecoli.nhr",
       "s3://mybucket-name/blastdbs/ecoli.nin",
       "s3://mybucket-name/blastdbs/ecoli.nnd",
       "s3://mybucket-name/blastdbs/ecoli.nni",
       "s3://mybucket-name/blastdbs/ecoli.nos",
       "s3://mybucket-name/blastdbs/ecoli.not",
       "s3://mybucket-name/blastdbs/ecoli.nsq",
       "s3://mybucket-name/blastdbs/ecoli.ntf",
       "s3://mybucket-name/blastdbs/ecoli.nto",
       "s3://mybucket-name/blastdbs/ecoli.nog"
     ],
     "last-updated": "2020-01-10",
     "bytes-total": 1319541,
     "bytes-to-cache": 1170705,
     "number-of-volumes": 1
   }

Please do not rename this file as ElasticBLAST expects that file name when
searching for it in the cloud.

Upload BLASTDB and metadata file to the cloud
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To upload your BLAST database and metadata file to AWS please run a command
like the one below (again, please update the values accordingly):

.. code-block:: bash

    aws s3 cp ecoli-nucl-metadata.json s3://mybucket/blastdb/
    for f in /blast/db/ecoli.n* ; do aws s3 cp $f s3://elasticblast-camacho/blastdb/; done

To upload your BLAST database and metadata file to GCP please run a command
like the one below (again, please update the values accordingly):

.. code-block:: bash

    gsutil cp ecoli-nucl-metadata.json gs://mybucket/blastdb/
    gsutil cp /blast/db/ecoli.n* gs://mybucket/blastdb/

Getting online help
^^^^^^^^^^^^^^^^^^^

You can obtain the script's online help by running the command below:

.. code-block::

    create-blastdb-metadata.py --help
    usage: create-blastdb-metadata.py [-h] --db DBNAME --dbtype {prot,nucl} [--out FILENAME] [--output-prefix PATH] [--pretty] [--logfile LOGFILE] [--loglevel {DEBUG,INFO,WARNING,ERROR,CRITICAL}] [--version]
    
    This program creates BLAST database metadata in JSON format.
    
    required arguments:
      --db DBNAME           A BLAST database
      --dbtype {prot,nucl}  Database molecule type
    
    optional arguments:
      --out FILENAME        Output file name. Default: ${db}-${dbtype}-metadata.json
      --output-prefix PATH  Path prefix for location of database files in metadata
      --pretty              Pretty-print JSON output
      --logfile LOGFILE     Default: create-blastdb-metadata.log
      --loglevel {DEBUG,INFO,WARNING,ERROR,CRITICAL}
      --version             show program's version number and exit


