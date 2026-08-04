# Solve DNS issue

There is a DNS issue where the server can't resolve any domain.

To see if we have the issue, do something like

```bash
curl -I https://google.com
```

If there is an error, to solve the error, do:

```bash
ls /etc/netplan/
cat /etc/netplan/YOUR_FILE_NAME.yaml

# Check `nameservers: addresses:`, needs to be like this folder file `00-installer-config.yaml`, so edit it to be like that
vi /etc/netplan/00-installer-config.yaml
```

Should look something like this

```yaml
# This is the network config written by 'subiquity'
network:
  ethernets:
    enp11s0:
      accept-ra: true
    enp6s0:
      addresses:
      - 192.168.100.253/24
      dhcp6: true
      match:
        macaddress: 40:f2:e9:33:b6:11
      nameservers:
        addresses:
          - 8.8.8.8
          - 8.8.4.4
        search: []
      routes:
      - to: default
        via: 192.168.100.200
      set-name: enp6s0
    enx42f2e933b614:
      accept-ra: true
      dhcp4: true
      dhcp6: true
  version: 2
```

After updated the file, restart the service

```bash
# Restart netplan
netplan apply

# Verify
curl -I https://google.com
```
