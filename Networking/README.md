# NETWORKING

## Some theory

### Intermediary devices
- Wireless Router
- Router
- LAN switch
- Multilayer switch
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
sw1-f1> enable
```


### Show interfaces
```
sw1-f1# show interfaces
sw1-f1# sh int
```

### Reload
```
sw1-f1# reload
```

### Configuration 

**To configure device, must enter global configuration**
```
sw1-f1# config t
sw1-f1(config)#
```
**OR**
```
sw1-f1# configure terminal
sw1-f1(config)#
```

#### Set host name
Rules:
- Start letter
- End letter or digit
- Use letters, digits, and -
- Less than 64 characters
```
sw1-f1(config)# hostname my-name
```

#### Line Configuration Mode: Configure console, AUX, SSH.
```
sw1-f1(config)# line console 0
sw1-f1(config-line)#
```

#### Interface configuration mode: Configure sw1-f1 port, Router network interface.
```
sw1-f1(config)# interface FastEthernet 0/1
(config-if)# 
```
**or**
```
sw1-f1(config)# interface vlan 1
(config-if)# 
```

#### PASSWORD
**privilege EXEC mode (root)**
```
sw1-f1(config)# enable secret MyPassword
sw1-f1(config)# exit
sw1-f1#
```

**user EXEC mode**
```
sw1-f1(config)# line console 0
sw1-f1(config-line)# password MyPassword
sw1-f1(config-line)# login
sw1-f1(config-line)# end
sw1-f1#
```

**secure VTY lines (0-15)**
```
sw1-f1(config)# line vty 0 15
sw1-f1(config-line)# password MyPassword
sw1-f1(config-line)# login
sw1-f1(config-line)# end
sw1-f1#
```

**Encrypt password**
```
sw1-f1(config)# service password-encryption
sw1-f1(config-line)# end
sw1-f1# show running-config
```

**Banner display**
```
sw1-f1(config)# banner motd #Authorized Access Only#
```

#### Startup Config
Configuration when startup
This write in NVRAM
```
sw1-f1# show startup-config
```

#### Save Configuration
```
sw1-f1# copy running-config startup-config
```

#### Reset Configuration
```
sw1-f1# copy startup-config running-config
```

#### Ls in 
```
sw1-f1# dir
sw1-f1# dir nvram
sw1-f1# dir ?
```

#### Up interface
```
sw1-f1(config)# interface vlan 1
sw1-f1(config-if)# no shutdown
```

#### Switch Virtual Interface (SVI)
To access remotely need IP address
```
sw1-f1(config)# interface vlan 1
sw1-f1(config-if)# ip address 192.168.1.10 255.255.255.0
sw1-f1(config-if)# no shutdown
```

#### Verify condition of switch interfaces 
```
sw1-f1# show ip interface brief
```

-----------------------------------------------------------------------------------

## Create VLAN
**START ALWAYS WITH VLAN 2**

1. Create vlans and name it
```
sw1(config)# vlan 2
sw1(config-vlan)# name MyVLAN1
sw1(config-vlan)# end
sw1# show vlan
```

2. Config interfaces
```
sw1(config)# interface FastEthernet 0/1
sw1(config-if)# switchport access vlan 2
sw1(config-if)# no shutdown
sw1(config-if)# end
sw1# show vlan
```
```
sw1(config)# interface FastEthernet 0/2
sw1(config-if)# switchport access vlan 2
sw1(config-if)# no shutdown
sw1(config-if)# end
sw1# show vlan
```
```
sw1(config)# interface FastEthernet 0/3
sw1(config-if)# switchport access vlan 2
sw1(config-if)# no shutdown
sw1(config-if)# end
sw1# show vlan
```

**OR with range to configure more than one interface**
```
sw1(config)# interface range FastEthernet 0/1-3
sw1(config-if)# switchport access vlan 2
sw1(config-if)# no shutdown
sw1(config-if)# end
sw1# show vlan
```

3. Connect end devices to interfaces configured, and assign IP MASK

-----------------------------------------------------------------------------------

## Create VLAN with two switches
**START ALWAYS WITH VLAN 2**

1. Create vlans and name it
```
sw1(config)# vlan 2
sw1(config-vlan)# name MyVLAN1
sw1(config-vlan)# end
sw1# show vlan
```

2. Config interfaces
```
sw1(config)# interface range FastEthernet 0/1-3
sw1(config-if)# switchport access vlan 2
sw1(config-if)# no shutdown
sw1(config-if)# end
sw1# show vlan
```

3. Connect end devices to interfaces configured, and assign IP MASK

4. Create vlans and name it
```
sw2(config)# vlan 2
sw2(config-vlan)# name MyVLAN1
sw2(config-vlan)# end
sw2# show vlan
```

5. Config interfaces
```
sw2(config)# interface range FastEthernet 0/1-3
sw2(config-if)# switchport access vlan 2
sw2(config-if)# no shutdown
sw2(config-if)# end
sw2# show vlan
```

6. Connect end devices to interfaces configured, and assign IP MASK

7. Connect switches and config interface with switchport mode trunk allowed vlan 2,3,4,...n
```
sw1(config)# interface GigabitEthernet 0/1
sw1(config-if)# switchport mode trunk
sw1(config-if)# switchport trunk allowed vlan 2
sw1(config-if)# no shutdown
sw1(config-if)# end
sw1# show vlan
```
```
sw2(config)# interface GigabitEthernet 0/1
sw2(config-if)# switchport mode trunk
sw2(config-if)# switchport trunk allowed vlan 2
sw2(config-if)# no shutdown
sw2(config-if)# end
sw2# show vlan
```