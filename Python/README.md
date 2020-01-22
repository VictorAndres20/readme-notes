# Install python 3.7 in Ubuntu 16.04
https://linuxize.com/post/how-to-install-python-3-7-on-ubuntu-18-04/
http://ubuntuhandbook.org/index.php/2017/07/install-python-3-6-1-in-ubuntu-16-04-lts/
https://docs.python-guide.org/starting/install3/linux/


1. Update repos
```
$ sudo apt-get update
$ sudo apt-get autoremove
```

2. Install software-properties-common
```
$ sudo apt-get install software-properties-common
```

3. Add repo deadsnakes
```
$ sudo add-apt-repository ppa:deadsnakes/ppa
```

4. Update
```
$ sudo apt-get update
$ sudo apt-get autoremove
```

5. Install python 3.7
```
$ sudo apt-get install python3.7
$ sudo apt-get install python3.7-gdbm
$ sudo apt-get install python3-pip
```

**Switch between python3 versions**

1. Show actual puthon3 version
```
$ python3 --version
$ ls /usr/bin | grep python
```

2. update alternatives
```
$ sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.5 1
$ sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.7 2
```

3. Switch between versions when execute python3 command
```
$ sudo update-alternatives --config python3
```

4. Show version
```
$ python3 --version
```

**Install pip**

```
$ sudo apt-get install python3.7-gdbm
$ sudo apt-get install python3-pip
$ pip3 --version
```



----------------------------------------------------------------------------------
