# NETWORKING

## Some theory

### Intermediary devices
- Wireless Router
- Router
- LAN Switch
- Multilayer Switch
- Firewall Appliance


### Diagrams
**Physical Topology**
Physical location of: 
- intermediary devices
- Cable installation
- Some end devices
- Rooms where are located

**Logical Topology**
Illustrate
- Devices
- Posrts
- Addressing scheme
- Which end devices are connected to which intermediay devices.

-----------------------------------------------------------------------------------

## Commands CISCO IOS

### ROOT
```
switch> enable
```


### Show interfaces
```
switch# show interfaces
switch# sh int
```


### Configuration 

**To configure device, must enter global configuration**
```
switch# config t
switch(config)#
```
**OR**
```
switch# configure terminal
switch(config)#
```

- Line Configuration Mode: Configure console, AUX, SSH.
```
switch(config)# line console 0
switch(config-line)#
```

- Interface configuration mode: Configure Switch port, Router network interface.
```
switch(config)# interface FastEthernet 0/1
(config-if)# 
```
**or**
```
switch(config)# interface vlan 1
(config-if)# 
```


