# Manual of packages
man <package>

##################################################

#create user
$ sudo su
 adduser <USERNAME>

# Delete user
$ sudo su
 deluser --remove-home <USERNAME>
         --remove-all-files
# Show users
$ sudo cat /etc/passwd

# show some info
$ sudo id <UserName>

# Agregar un usuario existente a un grupo existente

$ sudo usermod -a -G <GropuName> <UserName>

# Cambiar un usuario de grupo

$ sudo usermod -g <GropuName> <UserName>

# Change Password

$ sudo su
 cd /etc
 passwd <USERNAME>

# Unlock user and password
 	
$ sudo passwd -u <UserName>

# Show all users password status

$ sudo passwd -a -S

# Delete user password and set No Login
https://sharadchhetri.com/2011/12/02/how-to-delete-password-of-user-in-linux/

$ sudo passwd -d <UserName> -> Delete password encrypted on /etc/shadow
$ sudo usrmod -s /sbin/nologin <UserName> -> Set user:x:1001:1001::/home/user:/sbin/nologin on /etc/passwd

#################################################

# Create new group

$ sudo su
 groupadd <GroupName>

# Show gropus

$ sudo cat /etc/group

#################################################

# Enter to TTY

ctr + alt + F2

To GO MAIN SCREEN
ctr + alt + F7

#################################################

# Systemd Services

### Create service
1. Upload application or service
2. Create service file in /etc/systemd/system
```
$ cd /etc/systemd/system
$ sudo vi myapp.service
```
3. The looks is like this
```
[Unit]
Description=My Spring Boot App
After=network.target
Requires=network.service
[Service]
User=root
ExecStart=opt/jdk/bin/java -jar /opt/app/myapp.jar
WorkingDirectory=/opt/app
[Install]
WantedBy=multi-user.target
```
4. Description of file:
[Unit]
Description: Description of the service
After:
Requires:
StartLimitIntervalSec:
[Service]
User: User that is creating the service and has the privileges
ExecStart: Command to execute the service
Restart:
RestartSec:
WorkingDirectory:
[Install]
WantedBy:

### Commands
https://linoxide.com/linux-how-to/enable-disable-services-ubuntu-systemd-upstart/

$ systemctl start service-name
$ systemctl restart service-name
$ systemctl status apache2
$ systenctl stop apache2
$ systemctl enable apache2 -> To enable apache2 service on boot up run 
$ systemctl disable apache2 -> To disable apache2 service on boot up run 
$ systemctl is-enabled apache2

$ systemctl daemon-reload -> Reload systemd

$ systemctl list-unit-files | grep enabled -> list enabled
$ systemctl | grep running -> running services

#################################################

# Specific port used 

$ sudo lsof -i:22

#################################################

# command time, print time of execution at end of process

$ time bash process.sh

#################################################

# Command sleep

$ sleep 5; echo "5 seconds"
$ sleep 5m; echo "5 minutes"
$ sleep 5h; echo "5 hours"
$ sleep 5d; echo "5 days"

#################################################

# Procesos

# Show process
$ sudo ps -a
$ sudo ps -aux

# Show process tree
$ pstree

# Congelar proceso
$ sudo kill -19 <PID>

# Reanudar proceso
$ sudo kill -18 <PID>

# kill process
$ kill -9 <PID>

#################################################

# Background y Foreground

# Ejecutar proceso background
$ <COMANDO> & disown
**Ó**
Presionar CTRL+Z

# Pasar proceso Background a Foreground
$ jobs
$ fg <JOBID>

#################################################

# Permissions

Owner - Group -  All
 rwx  -  rwx  -  rwx
 421  -  421  -  421

- File
d Directory
p Archivo especial de cauce (pipe o tubería)

# Command chmod

$ sudo chmod -R 777 directory -> in this example ALL PERMISSIONS FOR ALL

#################################################

# Comprimir archivos .tar
$ sudo tar -cvf backup.tar /home/usuario21

# Ver contenido archivos .tar
$ sudo tar -tvf backup.tar

# Descomprimir archivos .tar
$ sudo tar -xvf /home/backup.tar

#################################################

# Manejo de > en terminal

# Vaciar archivo

$ sudo > archivo1

# Enviar datos a un archivo

$ sudo ls -ltr > salida
$ sudo cat archivo3 > salida -> Sobre escribe
$ sudo cat archivo3 >> salida -> Append

#################################################

# List with inodo
$ ls -ltri

# Links duros
$ ln /path/file/origin /path/file/destino

# Links duros recursivos
$ cp -rl /path/file/folderorigin /path/file/folderdestino

# Links simbólicos
$ ln -s /path/file/origin /path/file/destino

#################################################

# Use pipes

$ ls -ltr | grep ^-

# Use pipes

$ ls -ltr | grep ^- | awk '{print $5}'

#################################################

# Apache2 server

# Configure Apache2 Subdomain to works with specific projects - like api.domain.com

	1. Create Virtual host in project-name.conf in /etc/apache2/sites-available

		<VirtualHost *:80>
		 ServerName subdomain.domain.com
		 DocumentRoot /var/www/html/project-name/public
		 	<Directory "/var/www/html/me/public">
		     	AllowOverride All
		 	</Directory>
		</VirtualHost>

	2. Add this on /etc/hosts file

		$ nano /ect/hosts

		<PUBLIC IP> subdomain.domain.com
		34.54.235.64 subdomain.domain.com

	3. Enable Virtual host created

		$ sudo a2ensite project-name.conf

	4. Restart apache

		$ sudo service apache2 restart 

# Configure Apache to run project with path www.domain.com/project-name
1. 
	sudo chgrp -R www-data /var/www/html/project-name

2. On /etc/apache2/sites-available/000-default.conf ADD

		Alias /project-name /var/www/html/project-name/public/
		<Directory "/var/www/html/project-name/public">
        AllowOverride All
		</Directory>

3. sudo service apache2 restart

#################################################

# Install openssh-server
1. sudo apt-get install openssh-server
2. sudo service ssh status
3. sudo service ssh start

Configurations at /etc/ssh/sshd_config

#################################################

# IPTABLES Firewall

# Estructura de sentencia
https://www.hostinger.com/tutorials/iptables-tutorial

$ sudo iptables -A -i <interface (lo/wlan)> -p <protocol (tcp/udp/icmp)> [-s <IPs> OR -d <URLs>] --dport <port no.> -j <target (ACCEPT/DROP/RETURN)>

************************************************************
NOTA:
-s ES LA IP o URL de ORIGEN
-d ES LA IP o URL de DESTINO

Al realizar una regla con chain INPUT, es preferible usar -s
Al realizar una regla con chain OUTPUT, es preferible usar -d
************************************************************

-A -> Agregar regla
-D -> Borrar regla

# Bloquear ping de salida
$ sudo iptables -A OUTPUT -p icmp -d www.facebook.com -j DROP

# Bloquear ingreso a URL o IP
$ sudo iptables -A OUTPUT -p tcp -d www.eltiempo.com -j DROP
$ sudo iptables -A OUTPUT -p tcp -d 192.168.43.168 -j DROP

# Bloquear ping de entrada
$ sudo iptables -A INPUT -p icmp -s 192.168.43.59 -j DROP

# Bloquear acceso SSH
$ sudo iptables -A INPUT -p tcp --dport 22 -s 192.168.43.102 -j DROP

# Guardar cambios
$ sudo /sbin/iptables-save

##################################################

# CronTab
On /etc/crontab file specify 
time - user - script
m h dom mon dow user  command

1. sudo vi etc/crontab
2. Add 
50 15 * * * root bash /path/to/script/srcipt.sh
3. systemctl cron status
4. systemctl cron reload

# LEYEND
m -> Minutes or *
h -> Hours or *
dom -> Day of mounth or *
mon -> Month or *
dow -> Day of week 

##################################################
