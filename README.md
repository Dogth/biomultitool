# BioMultiTool
A simple wrapper for a few bioinformatics tools.
Currently supports only:
- [NCBI BLAST+](https://blast.ncbi.nlm.nih.gov/Blast.cgi)
- [Prodigal](https://github.com/hyattpd/Prodigal)
- [RiPP Rodeo](https://www.ripp.rodeo/)
- [Skani](https://github.com/bluenote-1577/skani)

## Installation&Running: 
Requires docker and docker compose

    git clone https://github.com/Dogth/biomultitool
    cd ./biomultitool
    docker-compose up

After running those command navigate to http://localhost:8080/ in your browser.
If you have any trouble running biomultitool please reach out to me.
In case you want to restart the tool on startup use ```docker-compose up --restart unless-stopped```

## Running on WSL (Ubuntu):
    
    sudo apt-get update && sudo apt-get upgrade
    sudo apt-get install docker-compose
    sudo usermod -aG docker ${USER}
    su - ${USER}
    git clone https://github.com/Dogth/biomultitool
    cd ./biomultitool
    sudo dockerd &> dockerd.log &
    docker-compose up
 If you get ```MongoDB 5.0+ requires a CPU with AVX support, and your current system does not appear to have that!``` switch mongo version from latest to 4.4.18 in docker-compose file
