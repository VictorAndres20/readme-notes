# Install on CentOS 7
https://www.linuxtechi.com/install-kubernetes-1-7-centos7-rhel7/


---------------------------------------------------------------------------------------------

# Install on Ubuntu
https://vitux.com/install-and-deploy-kubernetes-on-ubuntu/

## Prepare installs

1. Install Docker

2. Key
```
$ curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add
```

3. Add kubernetes repository
At the time, only Ubuntu 16.04 Xenial Kubernetes repository is available.
Replace the below 'xenial' with 'bionic' codename once the Ubuntu 18.04 Kubernetes 
repository becomes available.
```
$ sudo apt-add-repository "deb http://apt.kubernetes.io/ kubernetes-xenial main"

$ sudo apt-get update

$ sudo apt-get install kubeadm
$ sudo apt-get install kubectl
$ sudo apt-get install kubelet
$ kubeadm version
```

## Configure Master Node
https://www.youtube.com/watch?v=UWg3ORRRF60

1. Swap Space off
```
$ swapoff -a
```
AND
```
$ sudo vi /etc/fstab
```
Comment at the end
```
#/swapfile		none		swap	sw
```

2. Change node master hostname /etc/hostname file
```
$ sudo hostnamectl set-hostname kubernetes-master
```

3. Set static IP address
```
$ ifconfig
$ sudo vi /etc/network/interfaces
```
At the end something like this
```
auto lo
iface lo inet loopback

auto enp0s8 		# interface where your ip show on ifconfig
iface enp0s8 inet static	# Set static Same inteface where your ip show on ifconfig
address 192.168.56.101		# Adderss show on ifconfig
```

4. Update host file
```
$ sudo vi /etc/hosts
```
append new line with new host name and ip address setted static
```
127.0.0.1	localhost
127.0.0.1	host-machine
192.168.56.101	kubernetes-master
192.168.56.4	kubernetes-slave1
```

5. Configure Environment on kubeadm.conf file
```
$ cd /etc/systemd/system/kubelet.service.d/
$ ls
$ sudo vi 10-kubeadm.conf
```
Append
```
Environment="cgroup-driver=systemd/cgroup-driver=cgroupfs"
```

6. Restart machine
```
$ shutdown now
```

# Init on Master Node
https://www.youtube.com/watch?v=UWg3ORRRF60

-- Initialize cluster
$ sudo kubeadm init --pod-network-cidr=<IP MASTER NODE first 2>.0.0/16 --apiserver-advertise-address=<IP MASTER NODE>

---------------------------------------------------------------------------------------------

