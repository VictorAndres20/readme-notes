# Configure SSL NGINX
https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-on-centos-7
---------------------------------------------------------------------------------------------------------

## Generate Certs

https://www.alcancelibre.org/staticpages/index.php/como-apache-ssl
## Generate RSA password
```
openssl genrsa -des3 -out /root/certs-auto/private/centos.com.key 4096
```

You will need to set a password

## Generate digital sign RSA
```
openssl rsa -in /root/certs-auto/private/centos.com.key -out /root/certs-auto/private/centos.com.pem
```

You will need to enter password

## Generate CSR (Certificate Signing Request) file
```
openssl req -sha256 -new -key /root/certs-auto/private/centos.com.key -out /root/certs-auto/certs/centos.com.csr
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
```
You will need to enter password

## Change permissions
```
chmod -R 600 /root/certs-auto
```

---------------------------------------------------------------------------------------------------------

## Configure Nginx to Use SSL

```
chmod -R 700 /root/certs-auto/
vi /etc/nginx/conf.d/ssl.conf
```

```
server {
    listen 443 http2 ssl;
    listen [::]:443 http2 ssl;

    server_name [server_IP_address];

    ssl_certificate /root/certs-auto/centos.com.crt;
    ssl_certificate_key /root/certs-auto/centos.com.pem;
    #ssl_dhparam /root/certs-auto/dhparam.pem;
}
```

## Create a Redirect from HTTP to HTTPS

```
vi /etc/nginx/default.d/ssl-redirect.conf
```

```
return 301 https://$host$request_uri/;
```
