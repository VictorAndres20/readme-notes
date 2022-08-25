# Install on ubuntu
https://docs.docker.com/install/linux/docker-ce/ubuntu/

If dependencies newer that cant have error apper,
install with an older version

# LINK TO Official Docker Images
https://hub.docker.com/search?q=&type=image

# Error in Ubuntu 18.04
Error response from daemon: Get https://registry-1.docker.io/v2/: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)

This error was fixed when DNS nameserver in HOST or SERVER was changed to
nameserver 8.8.4.4
nameserver 8.8.8.8

In Ubuntu 18.04 you can change DNS with
https://datawookie.netlify.app/blog/2018/10/dns-on-ubuntu-18.04/

- sudo apt-get install resolvconf
- Edit /etc/resolvconf/resolv.conf.d/head and add the following:
```
nameserver 8.8.4.4
nameserver 8.8.8.8
```
- sudo systemctl restart resolvconf

------------------------------------------------------------------------------------------------

# Images

## Pull images
```
$ sudo docker pull [image][OPTIONAL:[flag]]
```

Example, pull Ubuntu 16.04 image:
```
$ sudo docker pull ubuntu:16.04 
```

## List images
```
$ sudo docker image ls
$ sudo docker images
```

## Delete image
```
$ sudo docker image rm -f <ID>
```


------------------------------------------------------------------------------------------------

## Dockerfile specification

- FROM image:tag
	- Base of image or OS that you will build image
	
- LABLE key=value
	- Specify some meta data, for example author="Victor Andres"

- RUN command 
	- Execute a linux command inside image.

- COPY /local/machine/path /inside/image/path
	- Copy files from local machine to image

- ADD URL /inside/image/path
	- Add files form URL or local machine to image. this add files inside path

- ENV ENVIRONMENT_VARIABLE value
	- Create environment variable inside image

- WORKDIR /inside/image/path/folder
	- Is like cd path inside image.
	
- EXPOSE port
	- Expose a port inside image

- VOLUME /path/inside/local/machine /path/inside/container
	- Persist container files inside local machine

- CMD command
	- Executed when the container start
	
- .dockerignore
	- Create this file to ignore folders and files that you dont wnat to copy inside image
	
**Good Practices**

1. One service by container
2. Few layers. More than one argument by layer, if you need.
3. Use LABEL



------------------------------------------------------------------------------------------------

# Containers

## Create Containers
```
$ sudo docker run -i -t --name <container_name> <image>[OPTIONAL:<flag>]
```

## list Container
**running**
```
$ sudo docker ps
$ sudo docker container ls 
```

**All**
```
$ sudo docker ps -a
$ sudo docker container ls --all
```

**in quiet mode**
```
$ sudo docker container ls -aq
```

## Containers actions
**Start**
```
$ sudo docker start <CONTAINER ID>
```

**Attach**
```
$ sudo docker attach <CONTAINER ID>
```

**Exec**
```
$ sudo docker exec -it <CONTAINER ID> bash
```

**Exit Container**
```
$ exit
```

**Stop Container**
```
$ sudo docker stop <CONTAINER ID>
```

**Delete Container**
```
$ sudo docker rm <CONTAINER ID>
```

**Show Container Docker IP**
``` 
$ sudo docker inspect <CONTAINER ID> | grep IPAddress
```

**List container stat**
```
$ sudo docker stats <CONTAINER ID>
```

**Limit RAM conatiner**
```
$ sudo docker run -m "5gb" --name container-name image
```

**Limit CPU conatiner**
```
$ grep "model name" /proc/cpuinfo | wc -l
$ sudo docker run -m "5gb" --cpuset-cpus 0-1 --name container-name image
```

**Copy files from container to machine**
```
$ sudo docker cp container-name:/path/inside/container /path/local/machine
```

**Logs**
```
$ sudo docker logs -f <CONTAINER-ID>
```

**Logs file path**
```
$ sudo docker container inspect  --format='{{.LogPath}}' <CONTAINER_NAME>
```

**Clean logs**
```
$ truncate -s 0 <LOG_FILE-json.log>
```


------------------------------------------------------------------------------------------------

# Volumes

**Create named volume**

1. Create volume. This will create a folder in docker home -> '/var/lib/docker' default
```
$ sudo docker volume create volume-name
```

2. Create docker and associate named volume
```
$ sudo docker run --name postgres_vitolo -e POSTGRES_PASSWORD=passwd -d -p 5432:5432 -v volume-name:/var/lib/postgresql/data postgres
```
You can use one volume in many containers

**List volumes**
```
$ sudo docker volume ls
```

**List Dangling volumes**
Volumes that are create but are not referenced by any container
```
$ sudo docker volume ls -f dangling=true
```

**Delete Dangling volumes**
```
$ sudo su
$ docker volume ls -f dangling=true | xargs docker volume rm
```




------------------------------------------------------------------------------------------------

# Docker network

**Default network bridge**
```
$ sudo docker network inspect bridge
```

**List docker networks**
```
$ sudo docker network ls
```

**Create network**
```
$ sudo docker network create network-name
```

**Create network with custom subnet**
```
$ sudo docker network create -d bridge --subnet 172.124.10.0/24 --gateway 172.124.10.1 network-name
```

**Add container to created network**
```
$ sudo docker run --network network-name --name php-name -d -p 80:80 php-image
```

**Connect containers in same created network**
You can do it by container-name or IP assigned
```
$ sudo docker exec cont1-name bash -c "ping cont2-name"
$ sudo docker exec cont1-name bash -c "ping 172.124.10.3"
```

**Connect container to more than one network**
```
$ sudo docker network connect network-name container-name
```

**Disconnect container to more than one network**
```
$ sudo docker network disconnect network-name container-name
```

**Assign IP to container in created network**
```
$ sudo docker run --network network-name --ip 172.124.10.20 --name php-name -d -p 80:80 php-image
```

**Delete docker network**
```
$ sudo docker network rm network-name
```
Need to delete containers or disconnect connected containers




**Connect to local machine network (host)**
```
sudo docker run --network host --name php-name -d -p 80:80 php-image
```



**Container with no network (none)**
```
sudo docker run --network none --name php-name -d -p 80:80 php-image
```



------------------------------------------------------------------------------------------------



# Create Image from Container
https://docs.docker.com/engine/reference/commandline/commit/#commit-a-container
https://blog.scalyr.com/2018/09/create-docker-image/

1. 
```
$ sudo docker ps
```
2. 
```
$ sudo docker commit <CONTAINER ID> image-name
```

3. 
```
$ sudo sudo docker tag image-name vapedraza1706/vapedraza-docker
```

4. 
```
$ sudo docker push vapedraza1706/vapedraza-docker:image-name
```

# Copy image to other machine
https://stackoverflow.com/questions/23935141/how-to-copy-docker-images-from-one-host-to-another-without-using-a-repository

1.	save the Docker image as a tar file
```
$ sudo docker save -o <absolute path for generated tar file> <image name>
```
2.	Move the file and load the image on the oder machine
```
$ sudo docker load -i <path to image tar file>
```

------------------------------------------------------------------------------------------------

# Specific containers

## Ubuntu container
```
$ sudo docker run -i -t --name ubuntu_vitolo ubuntu:16.04
```

## PHP MyAdmin container
**If MySQL is on localhost server or remote server**
```
$ sudo docker run -i -t --name phpmyadmin-name -d -e PMA_HOST=HOST -e PMA_PORT=PORT -p 8085:80 phpmyadmin/phpmyadmin
```

**If MySQL is on Container**
```
$ sudo docker run -i -t --name phpmyadmin-name -d --link <MySQL Container NAME>:db -p 8085:80 phpmyadmin/phpmyadmin
```

## MySQL container
```
$ sudo docker run -i -t --name mysql-name -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password -d -p 3306:3306 mysql:5.7
```
**Execute MySQL container**
```
$ sudo docker exec -it <RUNNING CONATINER ID> mysql -u root -p 
```

## Postgres container
```
$ sudo docker pull postgres
```
```
$ mkdir -p $HOME/docker/volumes/postgres
```
```
$ sudo docker run --name postgres_vitolo -e POSTGRES_PASSWORD=passwd -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
```
**Backup postgres**
```
$ sudo docker exec <postgres_container_name> pg_dump -U postgres <database_name> > backup.sql
```
**Restore backup**
```
$ cat backup.sql | sudo docker exec -i <postgres_container_name> psql -U postgres -d <database_name>
```
**Execute psql on container**
```
$ sudo docker exec -it <postgres_container_name> psql -U <user>
```

## MongoDB
```
$ sudo docker run -i -t --name mongo-name -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret -d -p 27017-27019:27017-27019 mongo --auth
```
**Execute MongoDB container**
```
$ sudo docker exec -it <container id> bash
$ mongo -u root -p secret **OR** $ mongo [db] -u user_db -p secret
> show dbs;
> //Create your database and all stuff
```
**Create Backup**
1. Dump inside container. Optional database name. If not, you need to be root
```
$ sudo docker exec -it <container-id> bash
$ cd /
$ mongodump --port 27017 [-d db_name] -u user -p secret -o /dump/
$ exit
``` 
2. Copy backup on your machine
```
$ cd /path/to/mongo-backup
$ sudo docker cp <CONTAINER ID>:/dump .
```
**Restore Backup**
1. If you have backup on your machine, copy inside container
```
$ cd /path/to/restore/
$ docker cp dump <CONTAINER ID>:/restore-mongo/
``` 
2. Restore inside container
```
$ sudo docker exec -it <container-id> bash
$ mongorestore --port 27017 --drop --db <DB NAME> /restore-mongo/db_name/
$ exit

## SQL Server
```
sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Passwd123*" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2019-latest
```

Logs
```
sudo docker exec -t sqlserver cat /var/opt/mssql/log/errorlog | grep connection
```

Enter DB container
```
sudo docker exec -it sqlserver bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Passwd123*"
```

Create DB
```
CREATE DATABASE PCAT;
SELECT Name from sys.databases;
GO
```

Exit DB
```
QUIT
```

## httpd container
```
$ sudo docker run -dit --name vitolo_apache --restart always -v /local/path:/usr/local/apache2/htdocs/ -p 9090:80 httpd:2.4
```

## nginx
```
$ sudo docker run -i -t --name container-nginx-name -v /local/path:/usr/share/nginx/html:ro -d -p 3000:80 nginx
```

## Spoon web
```
$ sudo docker run -i -t --name spoon -v /local/path:/home/pentaho -d -p 8080:8080 hiromuhota/webspoon
```

## Wordpress
```
$ sudo docker network create -d bridge --subnet 172.18.0.0/24 --gateway 172.18.0.1 wordpress-net
$ mkdir /usr/docker/volumes/mysql/data
$ mkdir /usr/docker/volumes/wordpress/html
$ sudo docker run -it --name mysql-wordpress -v /usr/docker/volumes/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=passwd --network wordpress-net --ip 172.18.0.2 -d -p 3306:3306 mysql:5.7
$ sudo docker run --name my-wordpress -v /usr/docker/volumes/wordpress/html:/var/www/html -e WORDPRESS_DB_HOST=172.18.0.2:3306 -e WORDPRESS_DB_USER=root -e WORDPRESS_DB_PASSWORD=passwd --network wordpress-net --ip 172.18.0.3 -d -p 80:80 wordpress
```

## Prestashop
```
$ sudo docker network create -d bridge --subnet 172.18.0.0/24 --gateway 172.18.0.1 prestashop-net
$ mkdir /usr/docker/volumes/mysql/data
$ mkdir /usr/docker/volumes/prestashop/html
$ sudo docker run -it --name mysql-prestashop -v /usr/docker/volumes/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=passwd --network prestashop-net --ip 172.18.0.2 -d -p 3306:3306 mysql:5.7
$ sudo docker run --name my-prestashop -v /usr/docker/volumes/prestashop/html:/var/www/html -e DB_SERVER=mysql-prestashop -e DB_USER=root -e DB_PASSWD=passwd --network prestashop-net --ip 172.18.0.3 -d -p 80:80 prestashop/prestashop:1.7-7.2-apache
```

## React in Apache container
```
sudo docker run -it --name apache_react -v /usr/local/docker/vols/apache_react/:/var/www/html/ -p 3001:80 -d php:7.3-apache
```

Changes in virtual host to use build as root directory

```
sudo vi 000-default.conf


<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName localhost
    DocumentRoot /var/www/html/build

    <Directory "/var/www/html/build">
	Options Indexes FollowSymLinks MultiViews
        AllowOverride all
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
# vim: syntax=apache ts=4 sw=4 sts=4 sr noet


sudo docker cp 000-default.conf apache_react:/etc/apache2/sites-available/000-default.conf
sudo docker exec apache_react chown -R www-data:www-data /var/www/html/build
sudo docker exec apache_react a2enmod rewrite
sudo docker exec apache_react service apache2 restart
sudo rm -rf 000-default.conf
```


## Python project application
- Add .dockerignore file to project
```
venv
```

- Add Dockerfile to project
```
FROM python:3.6

WORKDIR /usr/src/app

COPY . .
RUN pip --version
RUN python --version
RUN pip install -r requirements.txt


CMD [ "python", "./main.py" ]
```

- Build image
```
sudo docker build /path/Dockerfile/ -t app_name
```

- Now you can run container!!!
```
sudo docker run --name app_name -p 9002:9002 -d app_name
```


## JAR Spring Boot Application
1. Dockerfile next to jar. Name of Dockerfile 'Dockerfile'
```
FROM java:8
WORKDIR /
ADD App.jar App.jar
EXPOSE 8080
CMD java -jar App.jar
```

2. Build image
```
$ sudo docker build /path/to/folder/jar/and/dockerfile/ -t image-name
```

3. Run container
```
$ sudo docker run -i -t --name container-name -d -p 8080:8080 image-name
```

## PHP 7.3 as APACHE server
0. Create folder and put 
	- php-apps/ -> Folder with php apps (or app like Laravel app)
	- vhost.conf -> File to configure Virtual Host Apache
	- Dockerfile -> Docker file

1. Create docker File, Name of Dockerfile 'Dockerfile'.
Note that this has pdo_mysql and mysql because i need it. Same with pdo_pgsql and pgsql

**THIS WITH MySQL extensions**
```
FROM php:7.3-apache
ADD ./php-apps /www/html
ADD vhost.conf /etc/apache2/sites-available/000-default.conf
RUN /usr/local/bin/docker-php-ext-install mysqli pdo_mysql
RUN php -m
RUN chown -R www-data:www-data /www/html \
    && a2enmod rewrite
RUN service apache2 restart
```

**THIS WITH PostgreSQL extensions**
```
FROM php:7.3-apache
ADD ./php-apps /www/html
ADD vhost.conf /etc/apache2/sites-available/000-default.conf
RUN apt-get update && apt-get install -y libpq-dev
RUN /usr/local/bin/docker-php-ext-install pdo_pgsql pgsql
RUN php -m
RUN chown -R www-data:www-data /www/html \
    && a2enmod rewrite
RUN service apache2 restart
```

**This adding IMAP extension**
```
FROM php:7.3-apache
ADD ./php-apps /www/html
ADD vhost.conf /etc/apache2/sites-available/000-default.conf
RUN apt-get update && apt-get install -y libc-client-dev libkrb5-dev && rm -r /var/lib/apt/lists/*
RUN /usr/local/bin/docker-php-ext-configure imap --with-kerberos --with-imap-ssl && /usr/local/bin/docker-php-ext-install imap
RUN php -m
RUN chown -R www-data:www-data /www/html \
    && a2enmod rewrite
RUN service apache2 restart
```

**This adding ZIP extension**
```
FROM php:7.3-apache
ADD ./php-apps /www/html
ADD vhost.conf /etc/apache2/sites-available/000-default.conf
RUN apt-get update && apt-get install -y \
        libzip-dev \
        zip \
  && docker-php-ext-install zip
RUN php -m
RUN chown -R www-data:www-data /www/html \
    && a2enmod rewrite
RUN service apache2 restart
```

**This adding opcache extension**
```
FROM php:7.3-apache
ADD ./php-apps /www/html
ADD vhost.conf /etc/apache2/sites-available/000-default.conf
RUN docker-php-ext-install opcache
RUN php -m
RUN chown -R www-data:www-data /www/html \
    && a2enmod rewrite
RUN service apache2 restart
```

**This adding INTL extension**
```
FROM php:7.3-apache
ADD ./php-apps /www/html
ADD vhost.conf /etc/apache2/sites-available/000-default.conf
RUN apt-get update && apt-get install -y zlib1g-dev libicu-dev g++
RUN /usr/local/bin/docker-php-ext-configure intl
RUN /usr/local/bin/docker-php-ext-install intl
RUN php -m
RUN chown -R www-data:www-data /www/html \
    && a2enmod rewrite
RUN service apache2 restart
```

**This adding APCu extension**
```
FROM php:7.3-apache
ADD ./php-apps /www/html
ADD vhost.conf /etc/apache2/sites-available/000-default.conf
RUN apt-get update && apt-get -y install gcc make autoconf libc-dev pkg-config
RUN pecl install apcu && /usr/local/bin/docker-php-ext-enable apcu
RUN php -m
RUN chown -R www-data:www-data /www/html \
    && a2enmod rewrite
RUN service apache2 restart
```

**This adding Glib extension**
```
FROM php:7.3-apache
ADD ./php-apps /www/html
ADD vhost.conf /etc/apache2/sites-available/000-default.conf
# Try without sendmail
RUN apt-get update -y && apt-get install -y sendmail libpng-dev
RUN /usr/local/bin/docker-php-ext-install gd
RUN php -m
RUN chown -R www-data:www-data /www/html \
    && a2enmod rewrite
RUN service apache2 restart
```

2. Create vhost.conf
```
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName localhost
    DocumentRoot /www/html

    <Directory "/www/html">
	Options Indexes FollowSymLinks MultiViews
        AllowOverride all
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

3. Build image from docker-file
```
$ sudo docker build /path/to/folder/Dockerfile/ -t php-apache-name
```

4. Run image and create container
```
$ sudo docker run -i -t --name php-apache-name -d -p 80:80 php-apache-name
```

## Os Ticket

##### Os Ticket DB

docker run -i -t --restart=always --network net-os-ticket --ip 172.124.10.10 --name mysql-os-ticket -v /opt/os-ticket-db:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=passwd -d -p 3306:3306 mysql:5.7

##### Os Ticket PHP

docker run -i -t --restart=always --network net-os-ticket --ip 172.124.10.11 --name prod-os-ticket -v /opt/os-ticket/html:/var/www/html -d -p 8080:80 php:7.3-apache
docker exec -it prod-os-ticket bash

/usr/local/bin/docker-php-ext-install mysqli pdo_mysql

apt-get update && apt-get install -y libc-client-dev libkrb5-dev && rm -r /var/lib/apt/lists/*
/usr/local/bin/docker-php-ext-configure imap --with-kerberos --with-imap-ssl && /usr/local/bin/docker-php-ext-install imap

docker-php-ext-install opcache

apt-get update && apt-get install -y zlib1g-dev libicu-dev g++
/usr/local/bin/docker-php-ext-configure intl
/usr/local/bin/docker-php-ext-install intl

apt-get autoremove

apt-get update && apt-get -y install gcc make autoconf libc-dev pkg-config
pecl install apcu
/usr/local/bin/docker-php-ext-enable apcu

apt-get install -y sendmail libpng-dev
/usr/local/bin/docker-php-ext-install

php -m
chown -R www-data:www-data /var/www/html
a2enmod rewrite
service apache2 restart



## Node Web App container
https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

1. Write scripts to start on package.json
```
{
  "name": "docker_web_app",
  "version": "1.0.0",
  "description": "My App Desc",
  "author": "Victor Andres Pedraza <vapedraza1706@gmail.com>",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.16.1"
  }
}
```

2. Create folder to put all files to build docker image
- node-app-folders
- Dockerfile
- .dockerignore

3. node-app-folders. 
This are all folders that compose your app. EXCLUDE node_modules

4. Dockerfile
```
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose the port your app is listen to on startup
EXPOSE <LISTEN-PORT-ON-APP>

# Exceute start command
CMD [ "node", "index.js" ]
```

5. .dockerignore
```
node_modules
npm-debug.log
```

6. Build your image
```
$ sudo docker build /path/to/folder/Dockerfile/ -t node-app-name
```

7. Run image and create container
```
$ sudo docker run -i -t --name node-app-name -d -p 8000:<LISTEN-PORT-ON-DOCKERFILE> node-app-name
```

------------------------------------------------------------------------------------------------

**IMPORTANT**
1. To connect container to other container, you need Docker IP Container.
   Example: Container-laravel with Container-mysql. DB_HOST=Container-mysql IP

------------------------------------------------------------------------------------------------

# Docker compose

**Install**
https://docs.docker.com/compose/install/

**yml file parts**
```
version: [required]
services: [required]
volumes: [optional]
networks: [optional]
```

**Example nginx yml file**
```
version: '3'
services:
  web:
    container_name: nginx-cont1-name
	ports:
	  - "8000:80"
	image: nginx
```

**Run docker-compose.yml file**
```
$ cd /path/yml/file/docker-compose.yml
$ docker-compose up -d
```

**Stop and remove docker-compose yml file**
```
$ cd /path/yml/file/docker-compose.yml
$ docker-compose down
```

**Example ENVIRONEMNT in yml file**
```
version: '3'
services:
  db:
    container_name: mysql-cont1-name
	ports:
	  - "3306:3306"
	environment:
	  MYSQL_ROOT_PASSWORD: secret
	  MYSQL_DATABASE: test
	  MYSQL_USER: test
	  MYSQL_PASSWORD: test
	image: mysql
```

OR with env file
1. Create env file
```
MYSQL_ROOT_PASSWORD=secret
key=value
```

2. Write file yml
```
version: '3'
services:
  db:
    container_name: mysql-cont1-name
	ports:
	  - "3306:3306"
	env_file: mysql-cont.env
	image: mysql
```

**Example named VOLUME in yml file**
```
version: '3'
services:
  web:
    container_name: nginx-cont1-name
	ports:
	  - "8000:80"
	volumes:
	  - "vol-name:/usr/share/nginx/html"
	image: nginx
volumes:
  vol-name
```

**Example host VOLUME in yml file**
```
version: '3'
services:
  web:
    container_name: nginx-cont1-name
	ports:
	  - "8000:80"
	volumes:
	  - "/path/local/machine:/usr/share/nginx/html"
	image: nginx
```

**Example simple bridge NETWORK in yml file**
```
version: '3'
services:
  web:
    container_name: nginx-cont1-name
	ports:
	  - "8000:80"
	volumes:
	  - "/path/local/machine:/usr/share/nginx/html"
	networks:
	  - network-name
	image: nginx
networks:
  network-name:
```

**Build image with docker compose**
1. Create Docker file

2. docker-compose.yml
```
version: '3'
services:
  web:
    container_name: web
	image: image-name
	build: .
```

2. If Dockerfile called different by default
```
version: '3'
services:
  web:
    container_name: web
	image: image-name
	build:
	  context: .
	  dockerfile: Dockerfile-name
```

3. Execute
```
$ cd /path/yml/file/docker-compose.yml
$ docker-compose build
```

**Execute yml file named diferent by default**
```
$ docker-compose -f docker-compose-name.yml up -d
$ docker-compose -f docker-compose-name.yml down
$ docker-compose -f docker-compose-name.yml build
$ docker-compose -f docker-compose-name.yml logs -f
```

**Restart policy**
```
version: '3'
services:
  web:
    container_name: nginx-cont1-name
	ports:
	  - "8000:80"
	volumes:
	  - "/path/local/machine:/usr/share/nginx/html"
	restart: [always , unless-stop , on-failure]
	image: nginx
```

**More than one container**
```
version: '3'
services:
  db:
    container_name: mysql-cont1-name
	ports:
	  - "3306:3306"
	environment:
	  MYSQL_ROOT_PASSWORD: secret
	  MYSQL_DATABASE: wordpress
	  MYSQL_USER: wp
	  MYSQL_PASSWORD: wp
	image: mysql
	networks:
	  - wp-net
  wordpress:
    container_name: wp-ccont
	depends_on:
	  - db
	ports:
	  - "8000:80"
	image: wordpress
	environment:
	  WORDPRESS_DB_HOST: db:3306
	  WORDPRESS_DB_USER: wp
	  WORDPRESS_DB_PASSWORD: wp
	networks:
	  - wp-net
networks:
  wp-net:
```


------------------------------------------------------------------------------------------------

## nginx-proxy to use subdomains
https://blog.florianlopes.io/host-multiple-websites-on-single-host-docker/
https://github.com/nginx-proxy/nginx-proxy


SCHEMA


                                                             |--> Node Api Container  | VIRTUAL_HOST=api.domain.com,www.api.domain.com
                                                             |        port:49255      | VIRTUAL_PORT=8000
     http://api.domain.com      |                            |
---> http://gitlab.domain.com   |-->  nginx-proxy Container  |--> Gitlab Container    | VIRTUAL_HOST=gitlab.domain.com
     http://jenkins.domain.com  |           port:80          |        port:49256      | VIRTUAL_PORT=80,443
									                VIRTUAL_PROTO=https
                                                             |
						             |--> Jenkins Container   | VIRTUAL_HOST=45.345.67.54,domain.com
						   	     |        port:49257      | VIRTUAL_PORT=80

1. Run nginx-proxy
```
$ sudo docker run --restart always --name nginx_reverse_proxy -d -p 80:80 -p 443:443 -v /path/to/certs:/etc/nginx/certs -v /var/run/docker.sock:/tmp/docker.sock jwilder/nginx-proxy
```
If you want to use nginx custom config file add
```
-v /path/to/my_proxy.conf:/etc/nginx/conf.d/my_proxy.conf:ro
```

2. Run other container with VIRTUAL_HOST env variable
```
$ sudo docker run -d --expose 80 -e VIRTUAL_HOST=domain.com jenkins
$ sudo docker run -d --expose 8000 -e VIRTUAL_HOST=api.domain.com,www.api.domain.com -e VIRTUAL_PORT=8000 api-image
$ sudo docker run -d --expose 80,443 -e VIRTUAL_HOST=gitlab.domain.com -e VIRTUAL_PORT=80,443 -e VIRTUAL_PROTO=https gitlab
```

**SSL**
Note that nginx proxy need -p 443:443 and volume to /etc/nginx/certs.
The certificate and keys should be named after the virtual host with a .crt and .key extension and .pem. 
For example, a container with VIRTUAL_HOST=foo.bar.com should have a foo.bar.com.crt and foo.bar.com.key and foo.bar.com.dhparam.pem file in the certs directory

------------------------------------------------------------------------------------------------

# nginx proxy from scratch and Secure SSL
https://dev.to/sukhbirsekhon/what-is-docker-reverse-proxy-45mm
https://www.freecodecamp.org/news/docker-nginx-letsencrypt-easy-secure-reverse-proxy-40165ba3aee2/

## Create your proxy network
```
sudo docker network create -d bridge --subnet 172.124.10.0/24 --gateway 172.124.10.1 network_proxy
```

## Create yor web service containers inside network proxy.
Example:
```
docker run --restart always --network network_proxy --ip 172.124.10.10 --name apache -v /usr/local/docker/vols/apache:/var/www/html -d -p 8000:80 php:7.3-apache
docker run --restart always --network network_proxy --ip 172.124.10.11 --name apache1 -v /usr/local/docker/vols/apache1:/var/www/html -d -p 8001:80 php:7.3-apache
```

If you want to expose those containers only by proxy, change '-p 8000:80' to '--expose 80' or port that container expose.

## Create nginx container to configure as a reverse proxy
```
docker run --restart always --name nginx_proxy --network network_proxy --ip 172.124.10.9 -p 80:80 -p 443:443 -d nginx:1.9
```

## Create www/html folders inside nginx_proxy container
```
docker exec -it nginx_proxy bash
mkdir /var/www
mkdir /var/www/html
```

## install vim inside nginx_proxy container
```
apt-get update; apt-get install vim -y
```

## Create /var/www/html/backend-not-found.html inside nginx_proxy container
```
vi /var/www/html/backend-not-found.html
```

Set you html for not found resourse
```
<!DOCTYPE html>
<html>
<head>
<title>Sorry</title>
</head>
<body>
<h1>Resourse not found</h1>
</body>
</html>
```

## create /etc/nginx/includes folder inside nginx_proxy container
```
mkdir /etc/nginx/includes/
```
 
## create /etc/nginx/includes/proxy.conf file inside nginx_proxy container
```
vi /etc/nginx/includes/proxy.conf
```

Write
```
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_buffering off;
proxy_request_buffering off;
proxy_http_version 1.1;
proxy_intercept_errors on;
```

## Set /etc/nginx/conf.d/default.conf inside nginx_proxy container
```
vi /etc/nginx/conf.d/default.conf
```

To create proxy you need to edit this file like this
```
#Web Service 1 config
upstream centos{
             #container-name:port-inside-container
      server apache:80;
}
#Web Service 1 config proxy
server {
    listen 80;
    #listen 443 ssl http2;
                #domain.com to use
    server_name centos.com;

    # Path for SSL config/key/certificate
    #ssl_certificate /etc/ssl/certs/nginx/site1.crt;
    #ssl_certificate_key /etc/ssl/certs/nginx/site1.key;
    #include /etc/nginx/includes/ssl.conf;

    #if ($scheme != "https") {
    #    return 301 https://$host$request_uri;
    #}

    location / {
        include /etc/nginx/includes/proxy.conf;
                   #http://container-name
        proxy_pass http://apache;
    }

    access_log off;
    error_log  /var/log/nginx/error.log error;
}

#Web Service 2 config
upstream pro{
      server apache1:80;
}
#Web Service 2 config proxy
server {
    listen 80;
    #listen 443 ssl http2;
    server_name pro.centos.com;

    # Path for SSL config/key/certificate
    #ssl_certificate /etc/ssl/certs/nginx/site1.crt;
    #ssl_certificate_key /etc/ssl/certs/nginx/site1.key;
    #include /etc/nginx/includes/ssl.conf;

    #if ($scheme != "https") {
    #    return 301 https://$host$request_uri;
    #}

    location / {
        include /etc/nginx/includes/proxy.conf;
        proxy_pass http://apache1;
    }

    access_log off;
    error_log  /var/log/nginx/error.log error;
}


#Default
server {
    listen 80 default_server;

    server_name _;
    root /var/www/html;

    charset UTF-8;

    error_page 404 /backend-not-found.html;
    location = /backend-not-found.html {
        allow   all;
    }
    location / {
        return 404;
    }

    access_log off;
    log_not_found off;
    error_log  /var/log/nginx/error.log error;
}

```

## Exit from nginx_proxy container and restart nginx_proxy container
```
exit
docker restart nginx_proxy
``` 

TEST IT

---------------

## ADD SSL

**Autosigned certs**
https://www.alcancelibre.org/staticpages/index.php/como-apache-ssl
## Generate RSA password
```
openssl genrsa -des3 -out /root/certs-auto/private/centos.com.key 4096
openssl genrsa -des3 -out /root/certs-auto/private/pro.centos.com.key 4096
```

You will need to set a password

## Generate digital sign RSA
```
openssl rsa -in /root/certs-auto/private/centos.com.key -out /root/certs-auto/private/centos.com.pem
openssl rsa -in /root/certs-auto/private/pro.centos.com.key -out /root/certs-auto/private/pro.centos.com.pem
```

You will need to enter password

## Generate CSR (Certificate Signing Request) file
```
openssl req -sha256 -new -key /root/certs-auto/private/centos.com.key -out /root/certs-auto/certs/centos.com.csr
openssl req -sha256 -new -key /root/certs-auto/private/pro.centos.com.key -out /root/certs-auto/certs/pro.centos.com.csr
```

Se pediran los siguientes datos:
Código de dos letras para el país. CO
Estado o provincia. Cundinamarca
Ciudad. Bogota
Nombre de la empresa o razón social. Empresa SAS
Unidad o sección. Direccion TI
Nombre del anfitrión. Debe ser el nombre con el que se accederá hacia el servidor y dicho nombre deberá estar resuelto en un DNS. centos.com
Dirección de correo electrónico válida del administrador del sistema. vpedraza@unbosque.edu.co
De manera opcional se puede añadir otra contraseña y nuevamente el nombre de la empresa. Poco recomendado, a menos que quiera ingresar ésta cada vez que se inicie o reinicie el servicio httpd.


## Generate autosigned cert for 5 years
```
openssl x509 -sha256 -req -days 1825 -in /root/certs-auto/certs/centos.com.csr -signkey /root/certs-auto/private/centos.com.key -out /root/certs-auto/certs/centos.com.crt
openssl x509 -sha256 -req -days 1825 -in /root/certs-auto/certs/pro.centos.com.csr -signkey /root/certs-auto/private/pro.centos.com.key -out /root/certs-auto/certs/pro.centos.com.crt
```
You will need to enter password

## Change permissions
```
chmod -R 600 /root/certs-auto
```

**When you have Certs**

## create /etc/ssl/certs/nginx folder inside nginx_proxy container
```
docker exec nginx_proxy bash -c "mkdir /etc/ssl/certs/nginx"
```

## Move all certs from local machine to /etc/ssl/certs/nginx inside nginx_proxy container
```
docker cp /root/certs-auto/private/centos.com.pem nginx_proxy:/etc/ssl/certs/nginx/centos.com.pem
docker cp /root/certs-auto/certs/centos.com.crt nginx_proxy:/etc/ssl/certs/nginx/centos.com.crt
docker cp /root/certs-auto/private/pro.centos.com.pem nginx_proxy:/etc/ssl/certs/nginx/pro.centos.com.pem
docker cp /root/certs-auto/certs/pro.centos.com.crt nginx_proxy:/etc/ssl/certs/nginx/pro.centos.com.crt
```

## create /etc/nginx/includes/ssl.conf file inside nginx_proxy container
```
docker exec -it nginx_proxy bash
vi /etc/nginx/includes/ssl.conf
```

Write
```
ssl_protocols               TLSv1 TLSv1.1 TLSv1.2;
ssl_ecdh_curve              secp384r1;
ssl_ciphers                 "ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384 OLD_TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256 OLD_TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256";
ssl_prefer_server_ciphers   on;
ssl_session_timeout         10m;
ssl_session_cache           shared:SSL:10m;
ssl_session_tickets         off;
```

## Uncomment SSL config in /etc/nginx/conf.d/default.conf inside nginx_proxy container and rename certs
```
vi /etc/nginx/conf.d/default.conf
```

Uncomment SSL in proxy conf you need and rename certs .key->.pem .crt
```
#Web Service 1 config
upstream centos{
             #container-name:port-inside-container
      server apache:80;
}
#Web Service 1 config proxy
server {
    listen 80;
    listen 443 ssl http2;
                #domain.com to use
    server_name centos.com;

    # Path for SSL config/key/certificate
    ssl_certificate /etc/ssl/certs/nginx/centos.com.crt;
    ssl_certificate_key /etc/ssl/certs/nginx/centos.com.pem;
    include /etc/nginx/includes/ssl.conf;

    if ($scheme != "https") {
        return 301 https://$host$request_uri;
    }

    location / {
        include /etc/nginx/includes/proxy.conf;
                   #http://container-name
        proxy_pass http://apache;
    }

    access_log off;
    error_log  /var/log/nginx/error.log error;
}

#Web Service 2 config
upstream pro{
      server apache1:80;
}
#Web Service 2 config proxy
server {
    listen 80;
    listen 443 ssl http2;
    server_name pro.centos.com;

    # Path for SSL config/key/certificate
    ssl_certificate /etc/ssl/certs/nginx/pro.centos.com.crt;
    ssl_certificate_key /etc/ssl/certs/nginx/pro.centos.com.pem;
    include /etc/nginx/includes/ssl.conf;

    if ($scheme != "https") {
        return 301 https://$host$request_uri;
    }

    location / {
        include /etc/nginx/includes/proxy.conf;
        proxy_pass http://apache1;
    }

    access_log off;
    error_log  /var/log/nginx/error.log error;
}


#Default
server {
    listen 80 default_server;

    server_name _;
    root /var/www/html;

    charset UTF-8;

    error_page 404 /backend-not-found.html;
    location = /backend-not-found.html {
        allow   all;
    }
    location / {
        return 404;
    }

    access_log off;
    log_not_found off;
    error_log  /var/log/nginx/error.log error;
}

```

## Exit from nginx_proxy container and restart nginx_proxy container
```
exit
docker restart nginx_proxy
``` 

TEST IT


------------------------------------------------------------------------------------------------