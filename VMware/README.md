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