# Command Line

user: admin
password:[empty]

# Shutdown
```
/system shutdown
```

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

# In Winbox

# Verify interfaces
In sidebar, "Interfaces"
**Note trafic in one, thats WAN**
Yo can rename to label it with double click


# Give internet to router
- Go to sidebar IP
- DHCP Client
- Click +
- Select WAN Interface
- Apply
- If is stopped, rigth click and enable

# Check ping
- Sidebar Tools
- Ping
- Select interface WAN

# Config DHCP Server
- Set IP in LAN Interface
- Sidebar IP
- Addresses
- Click +
- Set Router address in LAN interface, make sure to setup the correct IP network
192.168.200.1/24
- Select LAN Interface
- Apply and OK
- Sidebar IP
- DHCP Server
- Click DHCP Setup
- Select LAN INterface
- Next, Next, Nextm Next
- Lease Time = 00:50:00, Next
- OK
**In IP >> DHCP Server >> Leases you can see machines conected**

# Rule to give machines in LAN internet
- Sidebar IP
- Firewall >> NAT
- Click +
- General
Chain: srcnat
out. interface: WAN interface
- Action
Action: masquerade

# Rules on Dest port and IP
- Sidebar IP
- Firewall >> NAT
- Click +
- General
Chain: dsnat
Dst. Address: RouterOS IP in WAN
Protocol: TCP (Or which one you need)
Dst. Port: Port solicited in external request
- Action
Action: dst-nat
To Address: Machine IP in LAN network
To Port: Port exposed in Machine LAN



---------------------------------------------------------------------------------------------------------------------------------------------------------------------

/ip firewall filter add chain=input protocol=tcp connection-limit=10,32 action=add-src-to-address-list address-list=blocked-addr address-list-timeout=1d

/ip firewall filter add chain=input protocol=tcp src-address-list=blocked-addr connection-limit=10,32 action=tarpit