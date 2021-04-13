# Configure SSL NGINX
https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-on-centos-7
---------------------------------------------------------------------------------------------------------

## Generate Certs
```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /root/certs-auto/nginx-selfsigned.key -out /root/certs-auto/nginx-selfsigned.crt
openssl dhparam -out /root/certs-auto/dhparam.pem 2048
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

    ssl_certificate /root/certs-auto/nginx-selfsigned.crt;
    ssl_certificate_key /root/certs-auto/nginx-selfsigned.key;
    ssl_dhparam /root/certs-auto/dhparam.pem;
}
```

## Create a Redirect from HTTP to HTTPS

```
vi /etc/nginx/default.d/ssl-redirect.conf
```

```
return 301 https://$host$request_uri/;
```
