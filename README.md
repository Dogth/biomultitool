# BioMultiTool
Simple wrapper for a few bioinformatics tools
Currently supports only:
- [NCBI BLAST+](https://blast.ncbi.nlm.nih.gov/Blast.cgi)
- [Prodigal](https://github.com/hyattpd/Prodigal)
- [RiPP Rodeo](https://www.ripp.rodeo/)
- [Skani](https://github.com/bluenote-1577/skani)

I'm hoping to add annotation and BAGEL4 in the next version


## Installation: 
Depends on docker and docker compose

    git pull https://github.com/Dogth/biomultitool
    cd ./biomultitool
    docker compose up

After running those command navigate to http://localhost:8080/ in your browser.
If you have any trouble running biomultitool please reach out to me.
