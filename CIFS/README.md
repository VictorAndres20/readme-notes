## CIFS Windows like server - Linux ubuntu like client
----------------------------------------------------------------------------------
1. Configure server on windows
- 1. Create folder
- 2. Right click and properties
- 3. Share tab
- 4. Share button
- 5. Add some users
- 6. Advance Share button
- 7. Select "Share Folder"
- 8. Permissions
- 9. Check permissions and Accept, Accept and Close.

2. Mount CIFS on Linux using Windows Shared folder
- 1. ``$ sudo apt-get install cifs-utils``
- 2. Create dir where is going to mount
- 3. Mount with command 
```
$ sudo mount -t cifs //<IP SERVER>/sharedFolder /path/to/mount/dir -o username='<USER WINDOWS>',vers=2.0
```
- 4. Umount with command
		$ sudo umount /path/to/mount/dir