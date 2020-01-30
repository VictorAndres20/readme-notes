# Compile in linux with gcc.
```
$ gcc -o executeName file.c
$ gcc -o executeName.exe file.c
```

# Compile with Makefile!
1. Makefile
```
CC = gcc

OBJECTS = main.o util.o code.o

executableBundle: $(OBJECTS)
	$(CC) $(OBJECTS) -o executeme
	$(CC) $(OBJECTS) -o executeme.exe

main.o: main.c util.h code.h
	$(CC) -c main.c

util.o: util.c util.h
	$(CC) -c util.c

code.o: code.c code.h
	$(CC) -c code.c

cleanAll:
	-@echo "Cleaning..."
	-rm executeme
	-rm executeme.exe
	-rm program
	-rm program.exe
	-rm $(OBJECTS)
	-@echo "Clean"

cleanObjects:
	-@echo "Cleaning objects..."
	-rm $(OBJECTS)
	-@echo "Clean"

executable: program.c
	$(CC) program.c -o program
	$(CC) program.c -o program.exe

all: executableBundle executable
```

2. cd nect to Makefile and execute make
```
$ make
```

**Windows installation with cygwin**
1. Download installer cygwin.
2. Execute installer
3. In Select packages section, 'View' select Full
4. Search for
gcc-core - Select Version in 'New' column - (7.4.0-1)
gdb      - Select Version in 'New' column - (8.1.1-1)
libgdbm4 - Select Version in 'New' column - (1.13-1)
make     - Select Version in 'New' column - (4.2.1-2)
5. Click next
6. Add cygwuin/bin to environment variable in path variable
```
C:\cygwin64\bin
```
7. Open CMD an execute
```
> cygcheck --version
> gcc --version
> make --version
```
8. Compile like linux!!



-----------------------------------------------------------------------------

# Steps

1. Define program objectives
Requirements, Clear idea of what the program will do

2. Design
User interface be like
Organization of the code

3. Write the code
Happy hacking!!

4. Compile and run

5. Test and Debug

6. Maintain!!


-----------------------------------------------------------------------------

# Preprocessor directives
- Instruction to the compiler to do something before compile
- Cloud be anywhere in your code. Recommend at first
- Identified by: #

**include**
Similar to import in JAVA or require() in Node
To include Header files (The define information about functions)
```
#include <file.h>
```

For example
```
#include <stdio.h>
```
stdio.h contains printf function



-----------------------------------------------------------------------------

# Header file sintax
```
// myheader.h

//May be define directives
//#define 

/* 
* type definitions: 
*/
typedef struct names_st names; 

/* 
* function prototypes 
*/
void get_names(names *);
void show(const names *);
char * gets(char * st, int n);
```


-----------------------------------------------------------------------------


# Format specifiers on printf function
```
#include <stdio.h>
#include <stdlib.h>

int main(){
    char character='A';
    char name[]="Hello";
    int number=5;
    double dec1=5.6;
    double dec2=5.6234234;
    _Bool boolean=1; /* 1=true, 0=false */
    printf("Hello world! %c %s %d %f %.2f %i\n",character,name,number,dec1,dec2, boolean);
    return 0;
}
```



-----------------------------------------------------------------------------

# Get data from console

1. scanf()
```
#include <stdio.h>

int main(){

    char string[20] = "";
    int integer = 0;
    double decimal = 0;
    char character = '';
    printf("Enter a word integer decimal letter:\n");
    scanf("%s %d %lf %c", string, &integer, &decimal, &character);
    printf("%s - %d - %lf - %c",string,integer,decimal,character);
    return 0;
}
```

2. fgets()
```
#include <stdio.h>
#include <stdlib.h>

int main(){
    char name[50]="";
    int age=0;
    double decimal=0;
    printf("Dame tu nombre:");
    /** Get string with spaces */
    fgets(name,50,stdin);
    printf("Dame tu Edad:");
    scanf("%d",&age);
    printf("Dame un decimal:");
    scanf("%lf",&decimal);
    printf("Tu nombre es: %s y tu Edad es: %d Decimal: %f",name,age,decimal);
    return 0;
}
```



-----------------------------------------------------------------------------

# Arrays
```
#include <stdio.h>
#include <stdlib.h>

int main(){
    int numbers1[]={1,2,3,4,5,6};
    char numbers2[7];
    char strings[][10]={"Hola","Mundo"};
    numbers2[3]=5;
    printf("%d %d %s %s",numbers1[3],numbers2[3],strings[0],strings[1]);
    return 0;
}
```



-----------------------------------------------------------------------------

# Enums
```
#include <stdio.h>

int main(){
    
    /* Define enum */
    enum month {January, Febrary, March April, May, June};
    enum direction {up, down, left = 10, right};
    enum gender {female, male};
    /* Use enum */
    enum gender myGender = male;
    enum gender otherGender = female;
    
    if(myGender == otyherGender){
        printf("Gender equals");
    }
    
    return 0;
}
```


-----------------------------------------------------------------------------

# Command line arguments
```
#include <stdio.h>

_Bool validateArgs(int count){
    if(count == 1){
        return 0;
    } else {
        return 1;
    }
}

void showWarn(){
    printf("No argument passed... --help\n");
}

int main(int argc, char *argv[]){
    
    int countArguments = argc;
    char *arg1 = argv[0]; /* executed command */
    char *arg2 = argv[1];
    char *arg3 = argv[2]; 
    
    if(! validateArgs(countArguments)){
        showWarn();
    } else {
        printf("Number of arguments = %d\n", countArguments);
        printf("Arguments = %s %s\n", arg2, arg3);
    }
    return 0;
}
```

-----------------------------------------------------------------------------