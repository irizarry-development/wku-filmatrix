# WKU Filmatrix production installation guide

This installation guide assumes you have installed:
 - Docker on a Debian based Linux distrubution, or on Windows with the WSL 2 based engine.
 - Git

This guide also assumes 

Once Docker and Docker Compose are installed, the installation process is extremely similar on any operating system.

First, you must clone the repository at https://github.com/irizarry-development/wku-filmatrix to your machine using one of these commands.

HTTPS

    git clone https://github.com/irizarry-development/wku-filmatrix.git

SSH

    git clone git@github.com:irizarry-development/wku-filmatrix.git

Once you have this folder, navigate to it and create a file called `.env`. Fill this file with the following content:

    # database
    POSTGRES_USER="<db_user>"
    POSTGRES_PASSWORD="<db_pass>"
    POSTGRES_DB="<db_name>"

    # web
    DATABASE_URL="postgresql://<db_user>:<db_pass>@filmatrix-db:5432/<db_name>"
    AUTH_SECRET="<secret>"
    AUTH_TRUST_HOST="localhost"
    ADMIN_PASSWORD="<admin_pass>"

    # nginx
    HOSTNAME="<hostname>"

 - Replace both instances of `<db_user>` with the username of the user in the database. This can be anything. If you don't know what do set it to, set it to `filmatrix`.
 - Replace both instances of `<db_pass>` with the password of the user in the database. This should be a secure password.
 - Replace both instances of `<db_name>` with the name of the database. This can be anything. If you don't know what do set it to, set it to `filmatrix`.
 - Replace the instance of `<secret>` with a secure password, something different that what was set for `<db_pass>`.
 - Replace the instance of `<admin_pass>` with the password that will be used to log into the admin account of Filmatrix. This should be a secure password, different that what was set for `<db_pass>` or `<secret>`.
 - Replace `<hostname>` with the domain name of the website that will host this server.

Once you have finished editing this file, run the following command:

    docker-compose up -d

 - if you are in a Linux terminal and are having issues running this command or any Docker command, try running them with `sudo`

Once this finishes, the app should be available at http://localhost:3000.

You can view information about the database and webserver processes in Docker by running:

    docker ps

In the output, each process will have an ID in the left-most column. With that id, you can run:

    docker start <id>

to start the process,

    docker stop <id>

to stop the process, and

    docker restart <id>

to restart the process.


