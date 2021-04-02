# Repository for the ElasticBLAST documentation

To read the documentation, please visit
https://blast.ncbi.nlm.nih.gov/doc/elastic-blast

## Maintainer's instructions

Check out this repo and run the commands below to deploy the documentation
inhouse:

    make -C docs linkcheck man elastic-blast-docs.tar.bz2 
    $YOUR_ELASTIC_BLAST_REPO/share/tools/deploy-elastic-blast-docs.sh -a docs/elastic-blast-docs.tar.bz2 -c "COMMENT" 


To preview the documentation, generate the HTML in the local file system as
follows:
    
    make -C docs html
