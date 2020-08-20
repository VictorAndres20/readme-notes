# CKA Course Udemy
https://github.com/kodekloudhub/certified-kubernetes-administrator-course

--------------------------------------------------------------------------------------------------------------

# Fundamentals
Kubernetes supports Dokcer, Containerd and RKT

## Architecutre

- Master Node
Manage, Plan, Schedule, Monitor nodes.

Hosts ETCD Cluster, key value database

kube-scheduler, to identify or decide the rigth node for put a pod, but it doesnt put it, only decide

controller-manager

kube-apiserver

- Workers Nodes
Host applications as containers

- Kubelet
Is like the captain of the node, so we need a captain in all our worer nodes to comunicate with Kube API server.

- Kube-Proxy
Enable comunication between services that are in the cluster. This is locacated in worker nodes.

----------------------------------------------------------

## ETCD
Is a key value store db

### Install ETCD
1. Download binaries
https://github.com/etcd-io/etcd/releases
```
curl -L https://github.com/etcd-io/etcd/releases/download/v3.4.12/etcd-v3.4.12-linux-amd64.tar.gz
```
2. Extract
```
tar -xzvf etcd-v3.4.12-linux-amd64.tar.gz
```

3. Execute service
```
./etcd
```
Listen in port 2379

### Show Commands
```
./etcdctl
```

### In Kubernetes
It stores information of: Nodes, PODs, Configs, Secrets, Accounts, Roles, Bindings, Others.

It runs inside a POD. To see it, run
```
kubectl get pods -n kube-system
```

To run inside the POD:
```
kubectl exec etcd-master -n kube-system etcdctl
```

Show root directory:
```
kubectl exec etcd-master -n kube-system etcdctl get / --prefix -keys-only
```

----------------------------------------------------------

## kube-controller-manager

- Node controller
Whatch ststus
- Replication-Controller
Remediate situations

It runs inside a POD. To see it, run
```
kubectl get pods -n kube-system
```

View kube-controller-manager manager options
```
cat /etc/kubernetes/manifests/kube-controller-manager.yaml
```

----------------------------------------------------------

## kube-scheduler
identify or decide the rigth node for put a pod, but it doesnt put it, only decide
Find the best node for the POD by machine resources.
1. Filter Nodes.
2. Rank Nodes.


----------------------------------------------------------

## Kubelet
Is like the captain of the node, so we need a captain in all our worer nodes to comunicate with Kube API server.

----------------------------------------------------------

## POD
Smallest Object you can create with Kubernetes.
Encapsulate only ONE container, unless you need Helper container.

#### Create with YAML
pod-definition
```
apiVersion: v1
kind: Pod
meta-data:
  name: my-app
  labels:
    app: myapp
    type: front-end
spec:
  containers:
    - name: nginx-container
	  image: nginx
```

--------------------------------------------------------------------------------------------------------------
