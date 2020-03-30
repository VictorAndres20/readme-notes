# VMware vSphere 6.7

## VMware vSphere management clients
- VMware Host Client ------------------|-->
- vSphere Web Client --|--> vCenter ---|--> ESXi Host
- cSphere Client ------|--> Server ----|-->

**VMware Host Client**
To use it: 
- open web browser
- https://Host_IP_ESXi-Host/ui

**vSphere web Client - ADOBE**
To use it: 
- open web browser
- https://Host_IP_vCenter/vsphere-client
Internal redirect to port 9443

**vSphere Client - HTML pure**
To use it: 
- open web browser
- https://Host_IP_vCenter/ui
Internal redirect to port 9443

----------------------------------------------------------------------------------------

## VM files

- VM_name/VM_name.vmx
Configuration

- VM_name/VM_name.vswp
- vmx-VM_name.vswp
Swaps

- VM_name/VM_name.nvram
BIOS

- VM_name/vmware.log
LOG

- VM_name/VM_name.vmtx
Template

- VM_name/VM_name.vmdk
Descriptivo DISK

- VM_name/VM_name-flat.vmdk
Data DISK

- VM_name/VM_name-rdm(p).vmdk
Raw device map

- VM_name/VM_name-#####.vmdk
Snapshot DISK

- VM_name/VM_name.vmsd
Snapshot DATA

- VM_name/VM_name-Snapshot#.vmsn
Snapshot STATE

- VM_name/VM_name-Snapshot#.vmen
Snapshot memory

- VM_name/VM_name-*.vmss
Suspend state

- VM_name/VM_name-*.vmem
Suspended memory



----------------------------------------------------------------------------------------

## Installing ESXi Host and vCenter

1. Download ISOs from my VMware downloads.
https://my.vmware.com/web/vmware/downloads

2. Click on VMware vSphere >> Download product

3. In Essential
- VMware vSphere Hypervisor (ESXi) 6.7U3b >> Go to Downloads
- VMware vCenter Server 6.7U3b >> Go to Downloads

4. To download need to login

5. ISOs
- VMware-VMvisor-installer-6.7.0-8169922.x86_64.iso
- VMware-VCSA-all-6.7.0-8217866.iso

6. Install VMware vSphere Hypervisor (ESXi) in a server with ISO
In lab porpuse use VMware Wokstation or Virtual Box and create ESXi as VM
Prod Reqs:
- 8 CPUs Min
- 32 Gb RAM Min
- 500 Gb Disk
- 2 network adapter

Lab Reqs:
- 2 CPUs Min
- 4 Gb RAM Min
- 40 Gb Disk
- 1 network adapter

7. Select Configs and Password

8. Install "f11"

9. Remove installation media and reboot 

10. Start again and when show you, press f2 to enter DCUI (Direct Console User Interface)

11. Change IP to Static

12. Configure DNS and hostname
- Select Use the following DNS server addresses and hostname
- Change hostname: esxi.home.lab

13. Verify changes saved

14. Enable SSH
- Click troubleshooting opions
- Enable SSH

15. Verify access from ssh
```
vmware -v
```

16. Enter from browser
https://Host_IP_ESXi-Host/ui
User: root
Password: [YOU PUT IT ON INSTALLATION]

17. Active NTP



## Active NTP
- Enter VMware Host Client
- Side Bar Network (Redes) >> Firewall Rules (Reglas de Firewall)
- Search bar hit ntp
- Click button Actions (Acciones). Is above
- Click Enable (Habilitar)
- Go to vSphere Client
- MORE
- MORE
- MORE

----------------------------------------------------------------------------------------