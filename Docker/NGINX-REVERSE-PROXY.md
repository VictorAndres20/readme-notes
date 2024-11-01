# Nginx Reverse Proxy with Docker

-----------------------------------------------------------------------------------------------

### Create your proxy network

```
sudo docker network create -d bridge --subnet 172.124.10.0/24 --gateway 172.124.10.1 network_proxy
```

--------

### Create your web service containers inside network proxy.
Example:

```
docker run --restart always --network network_proxy --ip 172.124.10.10 --name apache -v /usr/local/docker/vols/apache:/var/www/html -d -p 8000:80 php:7.3-apache
docker run --restart always --network network_proxy --ip 172.124.10.11 --name apache1 -v /usr/local/docker/vols/apache1:/var/www/html -d -p 8001:8000 php:7.3-apache
```

**If you want to expose those containers only by proxy, change '-p 8000:80' to '--expose 80' or port that the container exposes.**

--------

### Create nginx container to configure as a reverse proxy

```
docker run --restart always --name nginx_proxy --network network_proxy --ip 172.124.10.9 -p 80:80 -p 443:443 -d nginx:1.27.2
```

--------

### Create www/html folders inside nginx_proxy container

```
docker exec -it nginx_proxy bash
mkdir /var/www
mkdir /var/www/html
```

--------

### install vim inside nginx_proxy container

```
apt-get update; apt-get install vim -y
```

--------

### Create /var/www/html/backend-not-found.html inside nginx_proxy container

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

--------

### create /etc/nginx/includes folder inside nginx_proxy container

```
mkdir /etc/nginx/includes/
```

--------
 
### create /etc/nginx/includes/proxy.conf file inside nginx_proxy container

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
#proxy_http_version 1.1;
proxy_intercept_errors on;
client_max_body_size 40M;
```

--------

### Set /etc/nginx/conf.d/default.conf inside nginx_proxy container

```
vi /etc/nginx/conf.d/default.conf
```

Configure 

```
#Web Service 1 config
upstream web{
      #container-name:port-inside-container
      server container_apache_name:80;
}
#Web Service 1 config proxy
server {
    listen 80;
    #listen 443 ssl http2;
    #domain.com to use
    server_name domain.com;

    # Path for SSL config/key/certificate
    #ssl_certificate /etc/ssl/certs/nginx/domain.com.crt;
    #ssl_certificate_key /etc/ssl/certs/nginx/domain.com.pem;
    #include /etc/nginx/includes/ssl.conf;

    #if ($scheme != "https") {
    #    return 301 https://$host$request_uri;
    #}

    location / {
        include /etc/nginx/includes/proxy.conf;
        #http://container-name:port-inside-container
        proxy_pass http://container_apache_name:80;
    }

    # YOU CAN PROXY MANY CONTAINERS WITH THE SAME DOMAIN:
    #location /api/ {
    #    include /etc/nginx/includes/proxy.conf;
    #    proxy_pass http://api_container:8000;
    #    proxy_read_timeout 600s;
    #}

    access_log off;
    error_log  /var/log/nginx/error.log error;
}

# OR PROXY OTHER CONTAINER WITH OTHER DOMAIN 
#Web Service 2 config
upstream api{
      server api_container:8000;
}
#Web Service 2 config proxy
server {
    listen 80;
    #listen 443 ssl http2;
    server_name api.domain.com;

    # Path for SSL config/key/certificate
    #ssl_certificate /etc/ssl/certs/nginx/api.domain.com.crt;
    #ssl_certificate_key /etc/ssl/certs/nginx/api.domain.com.pem;
    #include /etc/nginx/includes/ssl.conf;

    #if ($scheme != "https") {
    #    return 301 https://$host$request_uri;
    #}

    location / {
        include /etc/nginx/includes/proxy.conf;
        proxy_pass http://api_container:8000;
        proxy_read_timeout 600s;
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

--------

### Test configuration

```
nginx -t
```

--------

### Exit from nginx_proxy container and restart nginx_proxy container

```
exit
docker restart nginx_proxy
``` 

**TEST IT**

------------------------------------------------------------------------------------------------

## Secure nginx proxy with SSL

### Create certs. See Linux commands.
1. Generate RSA password

```
openssl genrsa -des3 -out /root/certs-auto/private/domain.com.key 2048
```

**You will need to set a password**

2. Generate digital sign RSA to remove passphrase

```
openssl rsa -in /root/certs-auto/private/domain.com.key -out /root/certs-auto/private/domain.com.pem
```

**You will need to enter password**
**THIS WILL BE YOUR ssl_certificate_key**

3. Generate CSR (Certificate Signing Request) file

```
openssl req -sha256 -new -key /root/certs-auto/private/domain.com.key -out /root/certs-auto/certs/domain.com.csr
```

You will need to provide this data:
Código de dos letras para el país........................... CO
Estado o provincia.......................................... Cundinamarca
Ciudad...................................................... Bogota
Nombre de la empresa o razón social......................... Company SAS
Unidad o sección............................................ Direccion TI
Nombre del anfitrión. Debe ser el nombre con el que se accederá hacia el servidor y dicho nombre deberá estar resuelto en un DNS............................. domain.com
Administrator email......................................... vpedraza@unbosque.edu.co
[OPTIONAL]
De manera opcional se puede añadir otra contraseña y nuevamente el nombre de la empresa. Poco recomendado, a menos que quiera ingresar ésta cada vez que se inicie o reinicie el servicio httpd.


4. [OPTIONAL] Recommend to pay a SSL cert or create it with letsencrypt 
Generate autosigned cert for 1 year

```
openssl x509 -sha256 -req -days 365 -in /root/certs-auto/certs/domain.com.csr -signkey /root/certs-auto/private/domain.com.key -out /root/certs-auto/certs/domain.com.crt
```

You will need to enter password

Change permissions

```
chmod -R 600 /root/certs-auto/certs/domain.com.pem
chmod -R 644 /root/certs-auto/certs/domain.com.crt
```

--------

**When you have Certs**

### create /etc/ssl/certs/nginx folder inside nginx_proxy container

```
docker exec nginx_proxy bash -c "mkdir /etc/ssl/certs/nginx"
```

--------

### Move all certs from local machine to /etc/ssl/certs/nginx inside nginx_proxy container

If you use let's encrypt maybe you need to rename certs:
privkey.pem -> domain.com.pem 
fullchain.pem -> domain.com.crt

```
docker cp /root/certs-auto/certs/domain.com.pem nginx_proxy:/etc/ssl/certs/nginx/domain.com.pem
docker cp /root/certs-auto/certs/domain.com.crt nginx_proxy:/etc/ssl/certs/nginx/domain.com.crt
```

--------

### create /etc/nginx/includes/ssl.conf file inside nginx_proxy container

```
docker exec -it nginx_proxy bash
vi /etc/nginx/includes/ssl.conf
```

Write

```
ssl_protocols               TLSv1.2 TLSv1.3; 
ssl_ciphers                 "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
ssl_prefer_server_ciphers   off;
ssl_session_timeout         1440m;
ssl_session_cache           shared:SSL:10m;
ssl_session_tickets         off;
```

--------

### Uncomment SSL config in /etc/nginx/conf.d/default.conf inside nginx_proxy container and rename certs

```
vi /etc/nginx/conf.d/default.conf
```

Uncomment SSL in proxy conf.
certificate_key is: -----BEGIN PRIVATE KEY-----
certificate is: -----BEGIN CERTIFICATE----- 

```
#Web Service 1 config
upstream web{
      #container-name:port-inside-container
      server container_apache_name:80;
}
#Web Service 1 config proxy
server {
    listen 80;
    listen 443 ssl http2;
    #domain.com to use
    server_name domain.com;

    # Path for SSL config/key/certificate
    ssl_certificate /etc/ssl/certs/nginx/domain.com.crt;
    ssl_certificate_key /etc/ssl/certs/nginx/domain.com.pem;
    include /etc/nginx/includes/ssl.conf;

    if ($scheme != "https") {
        return 301 https://$host$request_uri;
    }

    location / {
        include /etc/nginx/includes/proxy.conf;
        #http://container-name:port-inside-container
        proxy_pass http://container_apache_name:80;
    }

    # YOU CAN PROXY MANY CONTAINERS WITH THE SAME DOMAIN:
    #location /api/ {
    #    include /etc/nginx/includes/proxy.conf;
    #    proxy_pass http://api_container:8000;
    #    proxy_read_timeout 600s;
    #}

    access_log off;
    error_log  /var/log/nginx/error.log error;
}

# OR PROXY OTHER CONTAINER WITH OTHER DOMAIN 
#Web Service 2 config
upstream api{
      server api_container:8000;
}
#Web Service 2 config proxy
server {
    listen 80;
    listen 443 ssl http2;
    server_name api.domain.com;

    # Path for SSL config/key/certificate
    ssl_certificate /etc/ssl/certs/nginx/api.domain.com.crt;
    ssl_certificate_key /etc/ssl/certs/nginx/api.domain.com.pem;
    include /etc/nginx/includes/ssl.conf;

    if ($scheme != "https") {
        return 301 https://$host$request_uri;
    }

    location / {
        include /etc/nginx/includes/proxy.conf;
        proxy_pass http://api_container:8000;
        proxy_read_timeout 600s;
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

--------

### Test nginx config

```
nginx -t
```
--------

### Exit from nginx_proxy container and restart nginx_proxy container

```
exit
docker restart nginx_proxy
``` 

TEST IT

