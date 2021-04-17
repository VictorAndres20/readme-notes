## Generate cert with lets encrypt

### Install certbot
You need to install certbot client in your server that your domain resolve DNS.
And stop nginx or apache service to free port 80
```
apt-get update
apt-get install certbot
```

### Generate cert
```
certbot certonly --standalone -d myminio.com --staple-ocsp -m test@yourdomain.io --agree-tos
```

### See your certs in
```
ls /etc/letsencrypt/archive/myminio.com/
```

### Mount certs
Certificate: fullchain.pem -> cp myminio.com.crt
Certificate_Key: privkey.pem -> cp myminio.com.pem