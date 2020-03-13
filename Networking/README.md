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
sw1-f1(config-line)# exit
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
