## Create file and execute

1. create file .sh
```
$ vi file.sh
```
2. Write Code
```
#!/bin/bash
echo "Hello World"
```

3. make file executable 
```
$ chmod +x file.sh
```

4. Execute with 
```
$ ./file.sh
```
**or** 
```
$ sh file.sh
```
--------------------------------------------------------------------------------------------------------------------

## Write on screen

**echo**
```
#!/usr/bin/env bash
echo Hello World works!
var1="Hello"
echo "Has dicho, $var1"
```

**printf**
```
#!/usr/bin/env bash
#Variable declare
# NOTE no space between variableName'='variableValue
wordVar="World"
#Use printf
printf "Hello, %s\n" "$wordVar"
```


--------------------------------------------------------------------------------------------------------------------

## Work with variables

**Inside code**
```
#!/usr/bin/env bash
#Variable declare
#NOTE no space between variableName'='variableValue
wordVar="World"
#Use printf
printf "Hello, %s\n" "$wordVar"
```

**Passing paramenters out of file**

1. Code
```
#!/usr/bin/env bash
printf "Hello, %s\n" "$1"
```
2. Execute
```
./file param1
```


--------------------------------------------------------------------------------------------------------------------

## Read data input on keyboard
```
#!/usr/bin/env bash
echo "Quién eres?"
read name
echo "Eres $name"
```

--------------------------------------------------------------------------------------------------------------------


## if statemnet - BE CAREFUL WITH SPACES!!!!
```
if [ $((i%2))-eq0 ]
then
    suma=$((suma+i))
fi
```

**Comparing strings**
```
# global variables for create image
porjectPath=$1;
imageVersion=$2;
imageName=$3;

# Validations
if [ "$porjectPath" = "" ]
then
    printf "Project path empty\n\n";
fi

if [ "$imageVersion" = "" ]
then
    printf "Image version empty\n\n";
fi

if [ "$imageName" = "" ]
then
    printf "Image name empty\n\n";
fi
```


--------------------------------------------------------------------------------------------------------------------

## For loop
```
suma=0
for((i=1;i<=1000000;i++))
do
	suma=$(($suma+i))
	echo "$suma"
done
```

**For in**
```
for i in {1..1000000};
do
    echo "$i"
done
```


**For with commando variable storage**
```
A=`ls -ltr /home/usuario21/general | grep ^- | awk '{print $5}'`;
cont=0;
suma=0;
for a in $A
do
    suma=$(($suma+$a));
    cont=$(($cont+1));
    echo "$a";
done
echo "Total archivos $cont";
echo "Peso total es de $suma bytes";
```


--------------------------------------------------------------------------------------------------------------------

# Functions

```
function adition(){
    echo "$1 + $2 = $(($1 + $2))";
}
function division(){
    if [ $2 -eq 0 ]
    then
        echo "No se puede dividir por cero";
    else
        echo "$1 / $2 = $(($1/$2))";
    fi
}
echo "Valor 1";
read n1;
echo "Valor 2";
read n2;
adition $n1 $n2;
```


--------------------------------------------------------------------------------------------------------------------

# Split on bash
```
IFS=';' read -r -a array <<< "$a";
```


--------------------------------------------------------------------------------------------------------------------

# Example start jar
```
jarname="app-1.0.jar";
today=`date +%m-%d-%Y`;
java -jar -Dspring.config.location=/path/to/application.properties /path/to/$jarname >> logs/app_$today.log & disown
```

--------------------------------------------------------------------------------------------------------------------

# Dialog boxes

https://aplicacionesysistemas.com/dialog-crear-menus-tus-scripts/
http://linuxcommand.org/lc3_adv_dialog.php

**Input Box**
```
exec 3>&1;
input2=$(dialog --title "Dato" --clear --inputbox "¿Cuántos comandos desea ver?" 16 51 2>&1 1>&3);
```

- Get dialog's exit status
```
return_value=$?;
```

- Close file descriptor 3
```
exec 3>&-
clear;
```

- Act on the exit status
```
case $return_value in
  0 )
    echo "Result: $input2";;
  1 )
    echo "Cancel pressed.";;
  2 )
    echo "Help pressed.";;
  3 )
    echo "Extra button pressed.";;
  4 )
    echo "Item-help button pressed.";;
  255 )
    echo "ESC pressed."
    ;;
esac
```

**Menu**
```
exec 3>&1;
input=$(dialog --backtitle "Título de fondo" --title "Título principal" --menu "La mejor tortilla es:" 0 0 0 1 "Opcion 1" 2 "Opcion 2" 3 "Opcion 3" 2>&1 1>&3);
exec 3>&-
  case $exit_status in
    1 )
      clear
      echo "Cancelado"
      exit
      ;;
    255 )
      clear
      echo "Abortado" >&2
      exit 1
      ;;
  esac
clear;
  case $input in
    0 )
      echo "Progrma terminado"
      ;;
    1 )
      echo "Pulsado opcion 1";
      ;;
    2 )
      echo "Opcion 2";
      ;;
    3 )
      echo "Opcion 3";
      ;;
  esac
```


--------------------------------------------------------------------------------------------------------------------

# Script to build docker image
```
#!/usr/bin/env bash
function stopScript(){
    printf "\n\nSTOPING SCRIPT...\n\n";
    exit 1;
}


printf "\n\nCreating image...\n\n";

# global variables for create image
porjectPath=$1;
imageName=$2;
imageVersion=$3;

# Validations
if [ "$porjectPath" = "" ]
then
    printf "Project path empty\n\n";
    stopScript;
fi

if [ "$imageName" = "" ]
then
    printf "Image name empty\n\n";
    stopScript;
fi

if [ "$imageVersion" = "" ]
then
    printf "Image version empty\n\n";
    printf "Image version as actual date\n\n";
    imageVersion=`date +%Y.%m.%d`
fi

# Display info
printf "Project path: %s\n" "$porjectPath";
printf "Image version: %s\n" "$imageVersion";
printf "Image name: %s\n" "$imageName";

# create image
commandExec="docker build $porjectPath -t $imageName:$imageVersion";
printf "\nCommand to exec:\n";
printf "%s\n" "$commandExec";
res=`docker build $porjectPath -t $imageName:$imageVersion`;
echo "$res";
```

--------------------------------------------------------------------------------------------------------------------