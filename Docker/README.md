# Install on ubuntu
https://docs.docker.com/install/linux/docker-ce/ubuntu/

If dependencies newer that cant have error apper,
install with an older version

# LINK TO Official Docker Images
https://hub.docker.com/search?q=&type=image

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
$ sudo docker run -i -t --name mysql-name -e MYSQL_ROOT_PASSWORD=password -d -p 3306:3306 mysql:5.6
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
$ sudo docker run -i -t --name mongo-name -d -p 27017-27019:27017-27019 mongo
```
**Execute MongoDB container**
```
$ sudo docker exec -it <container id> bash
$ mongo
> //Create your database and all stuff
```

## httpd container
```
$ sudo docker run -dit --name vitolo_apache -v /local/path:/usr/local/apache2/htdocs/ -p 9090:80 httpd:2.4
```

## nginx
```
$ sudo docker run -i -t --name container-nginx-name -v /local/path:/usr/share/nginx/html:ro -d -p 3000:80 nginx
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
RUN /usr/local/bin/docker-php-ext-install mysqli pdo_mysql
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

------------------------------------------------------------------------------------------------

**IMPORTANT**
1. To connect container to other container, you need Docker IP Container.
   Example: Container-laravel with Container-mysql. DB_HOST=Container-mysql IP

------------------------------------------------------------------------------------------------