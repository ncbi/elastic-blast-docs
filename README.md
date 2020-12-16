# ElasticBLAST documentation

Please visit https://blast.ncbi.nlm.nih.gov/Doc/elastic-blast

## Maintainer's instructions

    ```bash 
    make -C docs linkcheck man html
    cp docs/elastic-blast-docs.tar.bz2 $YOUR_ELASTIC_BLAST_REPO
    cd $YOUR_ELASTIC_BLAST_REPO
    share/tools/deploy-elastic-blast-docs.sh -c "COMMENT" -a $OLDPWD/elastic-blast-docs.tar.bz2 -n
    ```

