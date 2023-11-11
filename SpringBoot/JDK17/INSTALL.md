# Install on Ubunutu 22.04
---------------------------------------

**Download and install**

```
sudo apt-get update
sudo apt-get autoremove
sudo apt-get install libc6-x32 libc6-i386
cd Downloads
wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.deb
sudo dpkg -i jdk-17_linux-x64_bin.deb
sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-17-oracle-x64/bin/java 1
```

**Env variables**

```
sudo vi /etc/environment
```
Add last line
```
JAVA_HOME="/usr/lib/jvm/jdk-17-oracle-x64"
```
Save file

Excute
```
source /etc/environment
echo $JAVA_HOME
```

**Create class, compile and execute**

```
mkdir test
cd test
vi Main.java
```
Paste
```
public class Main{
    public static void main(String[] args){
        System.out.println("👋 Hello World!");
    }
}
```
Save
```
javac Main.class
java Main
```

