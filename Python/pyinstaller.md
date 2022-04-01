# PyInstaller to create executables for Linux, Windows and Mac Os X
**Is important to use it in OS than you need to generate execuatble**

## Steps to create executable.

1. Install pyinstaller
```
pip install pyinstaller
```

2. Generate executable
```
pyinstaller --name YourAppName main.py
```
*Use --windowed flg to hide console in double click Window exe*

3. Executable generated in
*Windows*
```
dist/YourAppName/YourAppName.exe
```

*Linux*
```
dist/YourAppName/YourAppName
```

------------------------------------------------------------------------------------------------------------------------------------------------

## Issues
**Input error. module not found**
Maybe not found some modules in different OS, so need to add --hiden-import param in pyinstaller command
Be carefull with module._[os]

*Linux*
```
pyinstaller --name MyRPA --hidden-import="pynput_robocorp.keyboard._xorg" --hidden-import="pynput_robocorp.mouse._xorg" main.py
```

*Windows*
```
pyinstaller --name MyRPA --hidden-import="pynput_robocorp.keyboard._win32" --hidden-import="pynput_robocorp.mouse._win32" main.py
```

------------------------------------------------------------------------------------------------------------------------------------------------
