# Filmatrix production installation guide

This installation guide assumes:
 - You are on on a Debian based Linux distribution, or on Windows with WSL 2 running a Debian based Linux distribution
 - Docker is installed (on Windows you must be using the WSL 2 based engine)
 - Git is installed

Following the previous assumptions, the installation process is very similar on either Linux or Windows.

## Download

First, you must obtain the project source code.

Clone the repository at https://github.com/irizarry-development/wku-filmatrix to your machine using one of these commands.

HTTPS

    git clone https://github.com/irizarry-development/wku-filmatrix.git

SSH

    git clone git@github.com:irizarry-development/wku-filmatrix.git

Cloning with SSH is highly recommended for a production server.

https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

## Environment Configuration

Once you have the project folder, navigate into it and create a file called `.env`. Fill this file with the following content:

    # database
    POSTGRES_DB="<db_name>"
    POSTGRES_USER="<db_user>"
    POSTGRES_PASSWORD="<db_pass>"
    POSTGRES_PORT="<db_port>"

    # auth
    AUTH_SECRET="<secret>"
    AUTH_TRUST_HOST="localhost"

    # web
    NEXTJS_DATABASE_URL="postgresql://<db_user>:<db_pass>@db:5432/<db_name>"
    NEXTJS_ADMIN_PASSWORD="<admin_pass>"
    NEXTJS_PORT="<web_port>"

    # nginx
    NGINX_HOSTNAME="<hostname>"

 - Replace both instances of `<db_user>` with the username of the user in the database. This can be anything. If you don't know what do set it to, set them to `filmatrix`.
 - Replace both instances of `<db_pass>` with the password of the user in the database. This should be a secure password.
 - Replace both instances of `<db_name>` with the name of the database. This can be anything. If you don't know what do set it to, set them to `filmatrix`.
 - Replace the instance of `<db_port>` with the port the database will use on the host machine. The default is `5432`, which will work if there are no other instances of PostgreSQL or any process using port 5432 running on your machine. Any number from `1024` to `65535` is valid.
 - Replace the instance of `<secret>` with a secure password, something different that what was set for `<db_pass>`.
 - Replace the instance of `<admin_pass>` with the password that will be used to log into the root account of Filmatrix. This should be a secure password, different that what was set for `<db_pass>` or `<secret>`.
 - Replace the instance of `<web_port>` with the port the web server will use on the host machine. The default is `3000`, which will work if there are no other instances of NextJS or any process using port 3000 running on your machine. Any number from `1024` to `65535` is valid. Cannot be the same as `<db_port>`.
 - Replace `<hostname>` with the domain name of the website that will host this server.

## Building and running the app

Once you have finished editing the environment file, run the following command:

    docker-compose up -d

 - if you are in a Linux terminal and are having issues running this command or any Docker command, try running them with `sudo`

Once this finishes, the app should be available at http://localhost:3000.

## Basic Docker functionality for dealing with the Filmatrix container

You can view information about the database and web server processes in Docker by running:

    docker ps

In the output, each process will have an ID in the left-most column. With that id, you can run:

    docker start <id>

to start the process,

    docker stop <id>

to stop the process, and

    docker restart <id>

to restart the process.
