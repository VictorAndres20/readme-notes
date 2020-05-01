# NETWORKING

## Some theory

### OSI Layer Model
7. Application ........... Data
6. Presentation
5. Session
4. Transport .............. Segment ...... TCP/UDP, Port
3. Network ................ Packet ....... IP Address
2. Data Link .............. Frame
1. Physical

## Example Incomming Data Frame readed by Layer 1

1. Example Data Frame in Hexa
```
45 F5 45 D8 5E AA 21 34 C5 6D 8F EE 90 FF FE 36 78 A5 F6 B2 D9 36 78 A5 F6
B1 D9 1E C0 0A 0A 05 C0 0A 0A 14 89 72 48 41 20 45 4F 43 4F 4E 54 52 41 44
4F 20 45 4C 20 4D 53 47 D0 0F FF FE 24 5D 9F FE C0 00 DE D1 F5 C1 3C 68 84
8D 8E 90 FA 0F 4B 9B 04 5B 6A 45 67 7E 3F F1 11 93 EA 12 34 FD 11 3E C0
```

2. Structure
```
Preamble -- MAC Dest. -- MAC Orig. -- Package Size -- |Data Package| -- Check Frame -- Preamble
2 Bytes --- 6 Bytes ---- 6 Bytes ---- 1 Bytes ------- |0-1500 Bytes| -- 2 Bytes ------ 2 Bytes
                                                     |              |
												            |                        |
										           |                                    |
                                    |IP Orig. -- IP Dest. -- Upper Layers -- DATA (ASCII)|
									         |4 Bytes --- 4 Bytes --- 2 Bytes ------- Rest Bytes  | 
```

3. With preamble 11111111 11111110
11111111 : FF
11111110 : FE
Preamble HEX: FF FE

4. Data Frame to analyze
```
FF FE 36 78 A5 F6 B2 D9 36 78 A5 F6
B1 D9 1E C0 0A 0A 05 C0 0A 0A 14 89 72 48 41 20 45 4F 43 4F 4E 54 52 41 44
4F 20 45 4C 20 4D 53 47 D0 0F FF FE 
```

5. MACs
Dest: 36:78:A5:F6:B2:D9
Orig: 36:78:A5:F6:B1:D9
Laast 3 Bytes = MANUFACTURER

6. Pakcage Size = 1E

7. IPs
Orig: C0 0A 0A 05 -> 192.10.10.5
Dest: C0 0A 0A 14 -> 192.10.10.20

8. Upper Layers = 89 72


9. Check Frame = D0 0F
So, invert
0FD0 = 4048

To check,
Add all bytes from "MAC dest." to "DATA" and need to be equals "Check Farme Inverted".

36 + 78 + A5 + F6 + B2 + D9 + 36 + 78 + A5 + F6 +
B1 + D9 + 1E + C0 + 0A + 0A + 05 + C0 + 0A + 0A +
14 + 89 + 72 + 48 + 41 + 20 + 45 + 4F + 43 + 4F +
4E + 54 + 52 + 41 + 44 + 4F + 20 + 45 + 4C + 20 + 
4D + 53 + 47 = 0FD0


10. DATA
```
48 41 20 45 4F 43 4F 4E 54 52 41 44
4F 20 45 4C 20 4D 53 47
```
IN ASCII = "HA EOCONTRADO EL MSG"



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

## IPs A,B,C,D - Public and Privates
**Invalid address available**
0.0.0.0 - 0.255.255.255
127.0.0.0 - 127.255.255.255

**Class A - Very large number of hosts**
- Default Mask: 8
- Range:
1.0.0.0 - 126.0.0.0/8
1.0.0.0 - 126.255.255.255
- Private Addresses reserved:
10.0.0.0 - 10.255.255.255

**Class B - Medium number of hosts**
- Default Mask: 16
- Range:
128.0.0.0 - 191.255.0.0/16
128.0.0.0 - 191.255.255.255
- Private Addresses reserved:
172.16.0.0 - 172.31.255.255

**Class C - Small number of hosts**
- Default Mask: 24
- Range:
192.0.0.0 - 223.255.255.0/24
192.0.0.0 - 223.255.255.255
- Private Addresses reserved:
192.168.0.0 - 192.168.255.255

**Class D - Multicast addresses**
Not fot hosts
- Default Mask: NA
- Range:
224.0.0.0 - 239.255.255.255

**Class D - Experimental addresses**
- Default Mask: NA
- Range:
240.0.0.0 - 255.255.255.255

## Subnetting

**TABLE MASK Subnetting Class B**
------- Mask ----------------- Subnets --------- Total-Hosts ---------- Available-Hosts
255.255.0.0/16 ---------------- 1 ------------- 65536 ----------------- 65534
255.255.128.0/17 -------------- 2 ------------- 32768 ----------------- 32766
255.255.192.0/18 -------------- 4 ------------- 16384 ----------------- 16382
255.255.224.0/19 -------------- 8 ------------- 8192 ------------------ 8190
255.255.240.0/20 -------------- 16 ------------ 4096 ------------------ 4094
255.255.248.0/21 -------------- 32 ------------ 2048 ------------------ 2046
255.255.252.0/22 -------------- 64 ------------ 1024 ------------------ 1022
255.255.254.0/23 -------------- 128 ----------- 512 ------------------- 510
255.255.255.0/24 -------------- 256 ----------- 256 ------------------- 154
255.255.255.128/25 ------------ 512 ----------- 128 ------------------- 126
255.255.255.192/26 ------------ 1024 ---------- 64 -------------------- 62
255.255.255.224/27 ------------ 2048 ---------- 32 -------------------- 30
255.255.255.240/28 ------------ 4096 ---------- 16 -------------------- 14
255.255.255.248/29 ------------ 8192 ---------- 8 --------------------- 6
255.255.255.252/30 ------------ 16384 --------- 4 --------------------- 2
255.255.255.254/31 ------------ 32768 --------- 2 --------------------- 0
255.255.255.255/32 ------------ 65536 --------- 1 --------------------- 0

**TABLE MASK Subnetting Class C**
------- Mask --------------- Subnets --------- Total-Hosts ---------- Available-Hosts
255.255.255.0/24 --------------- 1 ------------ 256 ------------------- 154
255.255.255.128/25 ------------- 2 ------------ 128 ------------------- 126
255.255.255.192/26 ------------- 4 ------------ 64 -------------------- 62
255.255.255.224/27 ------------- 8 ------------ 32 -------------------- 30
255.255.255.240/28 ------------- 16 ----------- 16 -------------------- 14
255.255.255.248/29 ------------- 32 ----------- 8 --------------------- 6
255.255.255.252/30 ------------- 64 ----------- 4 --------------------- 2
255.255.255.254/31 ------------- 128 ---------- 2 --------------------- 0
255.255.255.255/32 ------------- 256 ---------- 1 --------------------- 0

**Example**
You need to create 4 subnets
- Subnet 1: 63 hosts
- Subnet 2: 20 hosts
- Subnet 3: 10 hosts
- Subnet 4: 2 hosts
Starting with 192.168.14.0

1. You calculate in which mask are available as less hosts you can
Do not forget that first available IP is for GATEWAY

- Subnet 1:
MASK: 25
IP NETWORK: 192.168.14.0/25
IP BROADCAST: 192.168.0.127/25

- Subnet 2: 20 hosts
MASK: 27
IP NETWORK: 192.168.14.128/27
IP BROADCAST: 192.168.0.159/27

- Subnet 3: 10 hosts
MASK: 28
IP NETWORK: 192.168.14.160/28
IP BROADCAST: 192.168.0.175/28

- Subnet 4: 2 hosts
MASK: 29
IP NETWORK: 192.168.14.176/29
IP BROADCAST: 192.168.0.183/29

2. Now, You can create 4 VLANs


### Routing

    X.X.1.0/24          X.X.2.0/24      X.X.3.0/24        X.X.4.0/24
PC1 --------------- R1 ------------- R2 ------------- R3 ------------- PC2
X.X.1.10       Fa0/0  Fa0/1     Fa0/0  Fa0/1     Fa0/0  Fa0/1        X.X.4.10
              .1.1    .2.1      .2.2   .3.1      .3.2   .4.1


**Table routing R1**
Net ---------- Jumps ------------- IP next Jump ------------ Interface
X.X.1.0/24 --- 0 ----------------- Connected --------------- Fa0/0
X.X.2.0/24 --- 0 ----------------- Connected --------------- Fa0/1
X.X.3.0/24 --- 1 ----------------- X.X.2.2 ----------------- Fa0/1
X.X.4.0/24 --- 2 ----------------- X.X.2.2 ----------------- Fa0/1

**Table routing R2**
Net ---------- Jumps ------------- IP next Jump ------------ Interface
X.X.1.0/24 --- 1 ----------------- X.X.2.1 ----------------- Fa0/0
X.X.2.0/24 --- 0 ----------------- Connected --------------- Fa0/0
X.X.3.0/24 --- 0 ----------------- Connected --------------- Fa0/1
X.X.4.0/24 --- 1 ----------------- X.X.3.2 ----------------- Fa0/1

**Table routing R3**
Net ---------- Jumps ------------- IP next Jump ------------ Interface
X.X.1.0/24 --- 2 ----------------- X.X.3.1 ----------------- Fa0/0
X.X.2.0/24 --- 1 ----------------- X.X.3.1 ----------------- Fa0/0
X.X.3.0/24 --- 0 ----------------- Connected --------------- Fa0/0
X.X.4.0/24 --- 0 ----------------- Connected --------------- Fa0/1


### Static routes.
- Only if this network is small.
- Need to configure manualy

### Dynamic Routing.
**Types by Mask**
- Nets with same Mask:
	- Classfull
	
- Nets with diffrentes Mask:
	- Classless

**Protocols**
- IGP: LAN
	- RIP: 
		Look Jumps. 
		Update currently. 
		Incomplete Topology.
		Max jumps 15
			V1: Classfull
			V2: Classless
	- IGRP: Look Jump CISCO
	- EIGRP:
	- OSPF: See ping, see brandwith. Dont update currently. Complete Topology
	
- EGP: External
	- BGP: Look Jumps




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

**Router secure remote Telnet / SSH access. VTY lines (0-15)**
```
sw1-f1(config)# line vty 0 15
sw1-f1(config-line)# password MyPassword
sw1-f1(config-line)# login
sw1-f1(config-line)# transport input {ssh | telnet}
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

#### Verify routes in Router
```
R1# show ip route
```

#### Maybe delete some config, put 'no' at the beginning
Example delete
```
R1(config)# no ip route 192.168.1.2 255.255.255 192.168.2.1
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


-----------------------------------------------------------------------------------

## Router basic configure
Same as IOS commands

-----------------------------------------------------------------------------------

## Routting

1. Configure Router Interfaces
- Show run to show Interfaces
```
r1# show run
```

- Select sub interface on physical interface 0/0
```
r1# config t
r1(config)# interface GigabitEthernet 0/0.2
```

- Encapsulation dot1Q to last number Interface
```
r1(config-subif)# encapsulation dot1Q 2
```

- Set IP. REMEMBER THIS IS FIRST AVAILABLE IP ON SEGMENT
```
r1(config-subif)# ip address 192.168.14.1 255.255.255.128
r1(config-subif)# exit
```

2. Configure sub interfaces you need on physical interface 0/0. SAME in all
- Select interface
```
r1# config t
r1(config)# interface GigabitEthernet 0/0.3
```

- Encapsulation dot1Q to last number Interface
```
r1(config-subif)# encapsulation dot1Q 3
```

- Set IP. REMEMBER THIS IS FIRST AVAILABLE IP ON SEGMENT
```
r1(config-subif)# ip address 192.168.14.130 255.255.255.224
r1(config-subif)# exit
```

3. When you finish configure virtual interfaces, SAVE changes in physical interface
```
r1(config)# interface GigabitEthernet 0/0
r1(config-if)# no shutdown
r1(config-if)# end
r1# show run
```


4. May be, you need to connect this router to Switches with VLANs. In Switch:
- Config interface in trunk mode allowing any VLANs you want
```
sw-1# show run
sw-1# config t
sw-1(config)# interface GigabitEthernet 0/1
sw-1(config)# switchport trunk encapsulation dot1q ######## THIS COMMAND MAY FAIL IN PACKET TRACER
sw-1(config-if)# switchport mode trunk
sw-1(config-if)# switchport trunk allowed vlan 2,3,4,...X
sw-1(config-if)# no shutdown
sw-1(config-if)# end
sw-1# show interface trunk
```

- Repeat STEP above with any switch that connect with router

5. Command to route IPs
```
r1# show ip route
```

6. Configure default GATEWAY IP in PCs connected to switches.
This IP GATEWAY is the assigned to Router in PC´s same netwotk
Then use ping


-----------------------------------------------------------------------------------

### Configure Static Routes with Routing multiple jumps

    X.X.1.0/24          X.X.2.0/24      X.X.3.0/24        X.X.4.0/24
PC1 --------------- R1 ------------- R2 ------------- R3 ------------- PC2
X.X.1.10       GB0/0  GB0/1     GB0/0  GB0/1     GB0/0  GB0/1        X.X.4.10
              .1.1    .2.1      .2.2   .3.1      .3.2   .4.1
			  
0. CRETAE ROUTERS TABLE
See theory section

1. Configure interfaces in Routers
**R1**
```
R1(config)# interface GigabitEthernet 0/0
R1(config-if)# ip address 192.168.1.1 255.255.255.0
R1(config-if)# no shutdown
R1(config-if)# exit
R1(config)# interface GigabitEthernet 0/1
R1(config-if)# ip address 192.168.2.1 255.255.255.0
R1(config-if)# no shutdown
R1(config-if)# end
R1# show run
```

**R2**
```
R2(config)# interface GigabitEthernet 0/0
R2(config-if)# ip address 192.168.2.2 255.255.255.0
R2(config-if)# no shutdown
R2(config-if)# exit
R2(config)# interface GigabitEthernet 0/1
R2(config-if)# ip address 192.168.3.1 255.255.255.0
R2(config-if)# no shutdown
R2(config-if)# end
R2# show run
```

**R3**
```
R3(config)# interface GigabitEthernet 0/0
R3(config-if)# ip address 192.168.3.2 255.255.255.0
R3(config-if)# no shutdown
R3(config-if)# exit
R3(config)# interface GigabitEthernet 0/1
R3(config-if)# ip address 192.168.4.1 255.255.255.0
R3(config-if)# no shutdown
R3(config-if)# end
R3# show run
```

2. Configure Routes for Jumps
With ip route command sintax
ip route TAGET_NETWORK_IP TARGET_MASK TABLE_GATEWAY

**R1**
```
R1(config)# ip route 192.168.3.0 255.255.255.0 192.168.2.2
R1(config)# ip route 192.168.4.0 255.255.255.0 192.168.2.2
R1(config)# end
R1# show ip route
```

**R2**
```
R2(config)# ip route 192.168.1.0 255.255.255.0 192.168.2.1
R2(config)# ip route 192.168.4.0 255.255.255.0 192.168.3.2
R2(config)# end
R2# show ip route
```

**R3**
```
R3(config)# ip route 192.168.1.0 255.255.255.0 192.168.3.1
R3(config)# ip route 192.168.2.0 255.255.255.0 192.168.3.1
R3(config)# end
R3# show ip route
```

3. Create PCs in nets with IP, Mask and GATEWAY


-----------------------------------------------------------------------------------

### Dynamic Routing

- Router 2911

**Example topology**

				                             |
                                         |  192.168.4.0 /24
                                         |
                                         |
								                 |
								                0/1
								                 |
                                         R2
                                        |  |
									           0/0  0/2
									           |      |
			   172.16.20.0/30           |        |        172.16.20.4/30
									         |          |
								        0/1              0/1	
192.168.2.0 /24                  |                |               192.168.3.0 /24
---------------------- 0/0 -- R1 --0/2--------0/0-- R3 ---0/2-----------------------------

                                   172.16.20.8/30 

0. Config IP Analysis
**R1**
Gb 0/0 -> 192.168.2.1 255.255.255.0
Gb 0/1 -> 172.16.20.1 255.255.255.252
Gb 0/2 -> 172.16.20.10 255.255.255.252

**R2**
Gb 0/0 -> 172.16.20.2 255.255.255.252
Gb 0/1 -> 192.168.4.1 255.255.255.0
Gb 0/2 -> 172.16.20.5 255.255.255.252

**R3**
Gb 0/0 -> 172.16.20.9 255.255.255.252
Gb 0/1 -> 172.16.20.6 255.255.255.252
Gb 0/2 -> 192.168.3.1 255.255.255.0

1. Configure interfaces in Routers
**R1**
```
R1(config)# interface GigabitEthernet 0/0
R1(config-if)# ip address 192.168.2.1 255.255.255.0
R1(config-if)# no shutdown
R1(config-if)# exit
R1(config)# interface GigabitEthernet 0/1
R1(config-if)# ip address 172.16.20.1 255.255.255.252
R1(config-if)# no shutdown
R1(config-if)# exit
R1(config)# interface GigabitEthernet 0/2
R1(config-if)# ip address 172.16.20.10 255.255.255.252
R1(config-if)# no shutdown
R1(config-if)# end
R1# show run
```

**R2**
```
R2(config)# interface GigabitEthernet 0/0
R2(config-if)# ip address 172.16.20.2 255.255.255.252
R2(config-if)# no shutdown
R2(config-if)# exit
R2(config)# interface GigabitEthernet 0/1
R2(config-if)# ip address 192.168.4.1 255.255.255.0
R2(config-if)# no shutdown
R2(config-if)# exit
R2(config)# interface GigabitEthernet 0/2
R2(config-if)# ip address 172.16.20.5 255.255.255.252
R2(config-if)# no shutdown
R2(config-if)# end
R2# show run
```

**R3**
```
R3(config)# interface GigabitEthernet 0/0
R3(config-if)# ip address 172.16.20.9 255.255.255.252
R3(config-if)# no shutdown
R3(config-if)# exit
R3(config)# interface GigabitEthernet 0/1
R3(config-if)# ip address 172.16.20.6 255.255.255.252
R3(config-if)# no shutdown
R3(config-if)# exit
R3(config)# interface GigabitEthernet 0/2
R3(config-if)# ip address 192.168.3.1 255.255.255.0
R3(config-if)# no shutdown
R3(config-if)# end
R3# show run
```


2. Set dynamic routing in routers. 

In rip, you set NEIGHBOR NETWORKS
Only IP Network, without Mask

**R1**
```
R1(config)# router rip
R1(config-router)# version 2
R1(config-router)# network 192.168.2.0
R1(config-router)# network 172.16.20.0
R1(config-router)# network 172.16.20.8
R1(config-router)# end
```

**R2**
```
R2(config)# router rip
R2(config-router)# version 2
R2(config-router)# network 172.16.20.0
R2(config-router)# network 192.168.4.0
R2(config-router)# network 172.16.20.4
R2(config-router)# end
```

**R3**
```
R3(config)# router rip
R3(config-router)# version 2
R3(config-router)# network 172.16.20.4
R3(config-router)# network 172.16.20.8
R3(config-router)# network 192.168.3.0
R3(config-router)# end
```

3. Connect PCs and set IP, Mask, Gateway


-----------------------------------------------------------------------------------


