# Install on CentOS 7
https://www.linuxtechi.com/install-kubernetes-1-7-centos7-rhel7/

10 CPUs
32GB RAM
64 GB Disk space

## Configure server to kubernetes
1. Install CentOS (CentOS 7)

2. Verify network connection.
https://lintut.com/how-to-setup-network-after-rhelcentos-7-minimal-installation/ 
```
$ sudo nmcli d
```
this show your interfaces

**If is disconnected**
Configure network to connect automatic:
```
$ sudo nmtui
```
Edit your interface
Be sure to choose:
IPv4 CONFIGURATION <Automatic>
[X] Automatically connect

Ok
Go back

```
$ sudo systemctl restart network
$ ip add
```


3. Update system
```
$ sudo yum update
```

**If show error Could not retrieve mirrorlist http://mirrorlist.centos.org**
https://serverfault.com/questions/904304/could-not-resolve-host-mirrorlist-centos-org-centos-7

Edit file /etc/resolv.conf adding
```
nameserver 8.8.8.8
nameserver 8.8.4.4
```

And try to update again

4. Install some packages
```
$ sudo yum install net-tools -y
$ sudo yum install wget -y
$ sudo yum install unzip -y
```

5. Set Hostname, for example master
```
$ sudo hostnamectl set-hostname master
$ exec bash
```

6. Disable selinux
```
$ sudo setenforce 0
$ sudo sed -i --follow-symlinks 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/sysconfig/selinux
```

7. Firewall rules
```
$ sudo systemctl status firewalld
$ sudo systemctl start firewalld
$ sudo systemctl enable firewalld
$ sudo systemctl is-enabled firewalld
$ sudo firewall-cmd --permanent --add-port=6443/tcp
$ sudo firewall-cmd --permanent --add-port=2379-2380/tcp
$ sudo firewall-cmd --permanent --add-port=10250/tcp
$ sudo firewall-cmd --permanent --add-port=10251/tcp
$ sudo firewall-cmd --permanent --add-port=10252/tcp
$ sudo firewall-cmd --permanent --add-port=10255/tcp
$ sudo firewall-cmd --permanent --add-port=9095/tcp
$ sudo firewall-cmd --permanent --add-port=30001/tcp
$ sudo firewall-cmd --reload
```
then
```
$ sudo modprobe br_netfilter
```
**If command not found, try**
```
$ sudo /sbin/modprobe br_netfilter
```
then
```
$ sudo echo '1' > /proc/sys/net/bridge/bridge-nf-call-iptables 
```

8. Set Static IP, You need to know your current GATEWAY
To do this we need to edit three files
- /etc/sysconfig/network
- /etc/sysconfig/network-scripts/ifcfg-<INTERFACE>
- /etc/resolv.conf

Go to /etc/sysconfig
```
$ cd /etc/sysconfig
```

Edit file network writting this
You need to know your current GATEWAY, 
for this i use a local GATEWAY example
```
NETWORKING=yes
HOSTNAME=master
GATEWAY=192.168.0.1
NETWORKING_IPV6=no
IPV6INIT=no
```

Go to network-scripts folder and list
```
$ cd /etc/sysconfig/network-scripts
$ ll
```

Identify your ifcfg-<INTERFACE> file and edit this items
```
DNS1=8.8.8.8
DNS2=8.8.4.4
HOSTNAME=master
GATEWAY=192.168.0.1
NETMASK=255.255.255.0
IPADDR=192.168.0.17
```

Now, Verify /etc/resolv.conf file show like this
```
nameserver <GATEWAY>
nameserver 8.8.8.8
nameserver 8.8.4.4
```
For example GATEWAY=192.168.0.1
If not, change!

RESTART network
```
$ sudo systemctl restart network
```

9. Configure hosts
Edit etc/hosts adding
```
192.168.0.17 master
<When you create cluster, ADD minions IPs and minions HOSTS bellow>
```

10. Swap Off
```
$ sudo swapoff -a
```
AND
Go to /etc/fstab and commect swap line
```
/dev/mapper/centos-root /                       xfs     defaults        0 0
UUID=9ba6b687-e1f8-4f31-a6f0-a0e790a90992 /boot                   xfs     defaults        0 0
/dev/mapper/centos-home /home                   xfs     defaults        0 0
#/dev/mapper/centos-swap swap                    swap    defaults        0 0
```

## Install Kubernetes - 'kubeadm version' 

1. Config kubernetes repo for CentOS 7
```
sudo vi /etc/yum.repos.d/kubernetes.repo
```
Write
```
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg
        https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
```

2. Install kubernetes and docker
```
$ sudo yum update
$ sudo yum install kubeadm docker -y
```

3. Start and enable services
```
$ sudo systemctl restart docker && systemctl enable docker
$ sudo systemctl restart kubelet && systemctl enable kubelet
$ sudo systemctl status kubelet
```

4. Init kubernetes
```
$ sudo kubeadm init
$ mkdir -p $HOME/.kube
$ sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
$ sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
Copy join line and save it!

5. Set up WEAVE 
```
$ sudo export kubever=$(kubectl version | base64 | tr -d '\n')
$ sudo kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$kubever"
```

6. Set none Taints
```
$ sudo kubectl describe nodes | grep Taints
$ sudo kubectl taint nodes master <node-role.kubernetes.io>/master:NoSchedule-
$ sudo kubectl describe nodes | grep Taints
```


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
And do this to swapoff even when reboot
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
$ exec bash
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

