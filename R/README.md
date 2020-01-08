# Install R Ubuntu 16.04
https://www.r-bloggers.com/how-to-install-r-ubuntu-16-04-xenial/

1. Add repository
```
$ sudo echo "deb http://cran.rstudio.com/bin/linux/ubuntu xenial/" | sudo tee -a /etc/apt/sources.list
```

2. Ubuntu Keyring
```
$ gpg --keyserver keyserver.ubuntu.com --recv-key E084DAB9
$ gpg -a --export E084DAB9 | sudo apt-key add -
```

3. Install
```
$ sudo apt-get update
$ sudo apt-get install r-base r-base-dev
```

4. Enter command prompt
```
$ sudo -i R
```

# Install RStudio
https://rstudio.com/products/rstudio/download/#download
https://www.r-bloggers.com/how-to-install-r-ubuntu-16-04-xenial/

download .deb and install it

**MAY BE need to install** 
```
$ sudo apt-get -f install libgstreamer-plugins-base0.10-0 libgstreamer0.10-0 libjpeg62
```

-------------------------------------------------------------------------------------------