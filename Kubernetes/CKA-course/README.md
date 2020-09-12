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
pod-definition.yaml
```
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  namespace: dev
  labels:
    app: myapp
    type: front-end
spec:
  containers:
  - name: nginx-container
	image: nginx
  restartPolicy: always
```
pod-definition.yaml with namespace
```
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  labels:
    app: myapp
    type: front-end
spec:
  containers:
  - name: nginx-container
	image: nginx
  restartPolicy: always
```

----------------------------------------------------------

## Replication Controller
Specify replicas of a POD

### Create with YAML
rc-definition.yaml
Inside spec section, put the POD structure since metadata and add replicas section
```
apiVersion: v1
kind: ReplicationController
metadata:
  name: myapp-rc
  labels:
    app: myapp
	type: front-end
spec:
  template:
    metadata:
      name: my-app
    labels:
      app: myapp
      type: front-end
    spec:
      containers:
      - name: nginx-container
	    image: nginx
      restartPolicy: always
	replicas: 3
```


----------------------------------------------------------

## Replica Set
Specify replicas of a POD

### Create with YAML
replicaset-definition.yaml
Inside spec section, put the POD structure since metadata and add replicas section
```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: myapp-replicaset
  labels:
    app: myapp
	type: front-end
spec:
  template:
    metadata:
      name: my-app
    labels:
      app: myapp
      type: front-end
    spec:
      containers:
      - name: nginx-container
	    image: nginx
      restartPolicy: always
	replicas: 3
```

----------------------------------------------------------

# Namespaces
Created automatically by Kubernetes
- kube-system
- Default (Where you work if you dont specify)
- kube-public

You can specify limit resources

## Handle DNS for services inside cluster
Cluster name: Default
DNS: service-name

Cluster name: dev
DNS: service-name.dev.svc.cluster.local

If pods are in the same namespace, you can simply use service-name as DNS

## Create namespace with YAML
namespace-dev.yaml
```
apiVersion: v1
kind: Namespace
metadata:
  name: dev
```

## Specify Resource Limit to Namespace(Resource Quota)
resource-quota.yaml
```
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: dev
spec:
  hard:
    pods: "10"
    requests.cpu: "4"
    requests.memory: 5Gi
    limits.cpu: "10"
    limits.memory: 10Gi
```

----------------------------------------------------------

# Services
Object that listen a port and you can access external
Types:
- NodePort : Ranges 30000 - 32767
- CLusterIP
- LoadBalancer

### NodePort Service YAML
Inside selector section, put same POD's labels that you are linking
```
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type:NodePort
  ports:
   - targetPort: 80
     port: 80
     nodePort: 30000
  selector:
    app: myapp [SAME POD LABEL NAME]
    type: front-end [SAME POD LABEL TYPE]
```

### ClusterIP Service YAML
Inside selector section, put same POD's labels that you are linking
```
apiVersion: v1
kind: Service
metadata:
  name: back-end
spec:
  type:ClusterIP
  ports:
   - targetPort: 80
     port: 80
  selector:
    app: myapp [SAME POD LABEL NAME]
    type: front-end [SAME POD LABEL TYPE]
```

### LoadBalancer Service YAML
```
apiVersion: v1
kind: Service
metadata:
  name: myapp-load-balancer
spec:
  type:LoadBalancer
  ports:
   - targetPort: 80
     port: 80
     nodePort: 30000
```



--------------------------------------------------------------------------------------------------------------

## Essentials

----------------------------------------------------------

## Get All essential components
```
kubectl get all
```

## Get Pods
```
kubectl get pods
```

## Get Pods specify namespace
```
kubectl get pods --namespace=<namespace-name>
```

## Get Pods in all namespace
```
kubectl get pods --all-namespaces
```

----------------------------------------------------------

## Create POD with command
```
kubectl run <pod-name> --image=<docker-image-name>
```
**OR**
```
kubectl run --generator=run-pod/v1 <pod-name> --image=<docker-image-name>
```

----------------------------------------------------------

## Delete POD with command
```
kubectl delete pod <pod-name>
```
**Force delete**
```
kubectl delete pod <pod-name> --force
```
**Delete all**
```
kubectl delete pods --all
```

----------------------------------------------------------

## Create POD with YAML
1. create pod definition YAML

2. Create command with File YAML 
```
kubectl create -f /path/to/pod-definition.yaml
```
**If you want to specify namespace in command**
```
kubectl create -f /path/to/pod-definition.yaml -namespace=dev
```

----------------------------------------------------------

## Create YAML file by create POD command
1. execute
```
kubectl run <pod-name> --image=<docker-image-name> --dry-run=client -o yaml > pod-definition.yaml
```
**OR**
```
kubectl run --generator=run-pod/v1 <pod-name> --image=<docker-image-name> --dry-run=client -o yaml > pod-definition.yaml
```

----------------------------------------------------------

## Update POD created by YAML
1. Update pod definition YAML file

2. Apply command
```
kubectl apply -f /path/to/pod-definition.yaml
```

----------------------------------------------------------

## Delete POD created by YAML
```
kubectl delete -f /path/to/pod-definition.yaml
```

----------------------------------------------------------

## Get info about the POD
```
kubectl describe pod <name-pod>
```

----------------------------------------------------------

## Get Replication Controllers
```
kubectl get replicationcontroller
```

----------------------------------------------------------

## Create Replication Controller
1. Create Replication Controller definition YAML

2. Create command with File YAML 
```
kubectl create -f /path/to/rc-definition.yaml
```

----------------------------------------------------------

## Get Replica Set
```
kubectl get replicaset
```

----------------------------------------------------------

## Create ReplicaSet
1. Create ReplicaSet definition YAML

2. Create command with File YAML 
```
kubectl create -f /path/to/replicaset-definition.yaml
```

----------------------------------------------------------

## Delete ReplicaSet
Also deletes all underlying PODs
```
kubectl delete -f /path/to/replicaset-definition.yaml
```

## Info ReplicaSet
```
kubectl describe replicaset.apps <NAME>
```

----------------------------------------------------------

## Increse number of replicaSet updating YAML file
1. Update 'replicas' section with another number

2. Execute
```
kubectl replace -f /path/to/replicaset-definition.yaml
```

----------------------------------------------------------

## Increse number of replicaSet with kubectl command
This will not change file replicas
```
kubectl scale --replicas=6 -f /path/to/replicaset-definition.yaml
```

**OR**
```
kubectl scale --replicas=6 <TYPE=replicaset> <NAME=myapp-replicaset>
```

----------------------------------------------------------

## Edit ReplicaSet
You can fix image problems or some error in replica set PODs 
using 'kubectl edit' command
```
kubectl edit replicaset.apps <NAME>
```

## Info ReplicaSet
```
kubectl describe replicaset.apps <NAME>
```

----------------------------------------------------------

## Create Deployment
1. Create Deployment definition YAML

2. Create command with File YAML 
```
kubectl create -f /path/to/deployment-definition.yaml
```
Can Automatically create a ReplicaSet and all the Pods specified in number of replicas

----------------------------------------------------------

## Create Deployment with command kubectl
```
kubectl create deployment --image=nginx nginx
```

----------------------------------------------------------

## Generate Deployment definition YAML with command kubectl
```
kubectl create deployment --image=nginx nginx --dry-run -o yaml > nginx-deployment.yaml
```

----------------------------------------------------------

## List Deployments
```
kubectl get deployments
```

----------------------------------------------------------

## Get info about the Deployment
```
kubectl describe deployment <name-deployment>
```

----------------------------------------------------------

## Create Namespace
1. Create Namespace definition YAML

2. Create command with File YAML 
```
kubectl create -f /path/to/namespace-definition.yaml
```

----------------------------------------------------------

## Create Namespace with command kubectl
```
kubectl create namespace dev
```

----------------------------------------------------------

## Create Service
1. Create Service definition YAML

2. Create command with File YAML 
```
kubectl create -f /path/to/service-definition.yaml
```

----------------------------------------------------------

## Create YAML Service with command kubectl
```
kubectl expose deployment [name-deployment] --name=[service-name] --targetPort=8080 --tyoe=NodePort --port=8080 --dry-run=client -o yaml > service-definition.yaml
```

----------------------------------------------------------

## Get services
```
kubectl get services
```


--------------------------------------------------------------------------------------------------------------
