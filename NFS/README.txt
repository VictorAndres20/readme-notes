/* CREATE SERVER NFS AND MOUNT ON CLIENTE*/
https://www.dummies.com/computers/operating-systems/linux/how-to-share-files-with-nfs-on-linux-systems/

-------------------------------
1. Configure On Server Machine
-------------------------------

1.1. Install packages
sudo apt-get install nfs-kernel-server nfs-common portmap

1.2. Create Dir or space for NFS storage. Maybe you can use an existing directory
mkdir /home/server/nfs

1.3. Configure /etc/exports adding
/home/server/nfs 192.168.10.11(fsid=root,rw,sync,no_subtree_check,root_squash) 192.168.10.12(fsid=root,ro,sync,no_subtree_check,root_squash)

Explain:
/path/to/nfs/space <IP SERVER>([OPTIONS]) <IP CLIENT>([OPTIONS])

General Options
------------------
secure ->  	Allows connections only from port 1024 or lower (default)
insecure -> 	Allows connections from port 1024 or higher
ro -> 	Allows read-only access (default)
rw -> 	Allows both read and write access
sync -> 	Performs write operations (writing information to the disk) when requested (by default)
async -> 	Performs write operations when the server is ready
no_wdelay -> 	Performs write operations immediately
wdelay ->	Waits a bit to see whether related write requests arrive and then performs them together (by default)
hide ->  	Hides an exported directory that’s a subdirectory of another exported directory (by default)
no_hide -> 	Causes a directory to not be hidden (opposite of hide)
subtree_check ->	Performs subtree checking, which involves checking parent directories of an exported subdirectory whenever a file is accessed (by default)
no_subtree_check -> 	Turns off subtree checking (opposite of subtree_check)
insecure_locks -> 	Allows insecure file locking

User ID Mapping Options
-----------------------
all_squash -> 	Maps all user IDs and group IDs to the anonymous user on the client
no_all_squash -> 	Maps remote user and group IDs to similar IDs on the client (by default)
root_squash -> 	Maps remote root user to the anonymous user on the client (by default)
no_root_squash -> 	Maps remote root user to the local root user
anonuid=UID -> 	Sets the user ID of anonymous user to be used for the all_squash and root_squash options
anongid=GID -> 	Sets the group ID of anonymous user to be used for the all_squash and root_squash options

THEN

$ exportfs -a

1.4. Se inicia el servicio rpc corriendo el script rpcbind y se inicia el servidor nfs ejecutando el script nfs-kernel-server
NOTA: Be sure that rpcbin.socket is active.
$ sudo systemctl status rpcbind.socket
$ sudo systemctl start rpcbind.socket
$ sudo bash /etc/init.d/rpcbind start
NOTA: portmap Maybe replace to rpcbind 
$ sudo bash /etc/init.d/nfs-kernel-server start

-------------------------------
2. Configure On Client Machine
-------------------------------

1. Create directory where the NFS will mount
$ mkdir /home/usuario21/nfs

2. Mount NSF
$ sudo mount 192.168.10.11:/home/server/nfs /home/usuario21/nfs

3. Use this space to do all stuff, depending OPTIONS server dive to you

4. Unmount NFS
$ sudo umount /home/usuario21/nfs