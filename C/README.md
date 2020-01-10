# Compile with gcc
```
$ gcc -o executeName file.c
```



-----------------------------------------------------------------------------

# Concat on printf function
```
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char character="A";
    char name[]="Hello";
    int number=5;
    double decimal=5.6;
    printf("Hello world! %c %s %d %f\n",character,name,number,decimal);
    return 0;
}
```



-----------------------------------------------------------------------------

# Get data from console
```
#include <stdio.h>
#include <stdlib.h>

int main()
{
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

int main()
{
    int numbers1[]={1,2,3,4,5,6};
    char numbers2[7];
    char strings[][10]={"Hola","Mundo"};
    numbers2[3]=5;
    printf("%d %d %s %s",numbers1[3],numbers2[3],strings[0],strings[1]);
    return 0;
}
```



-----------------------------------------------------------------------------