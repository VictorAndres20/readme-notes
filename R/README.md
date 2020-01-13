# Install R Ubuntu 16.04
https://www.r-bloggers.com/how-to-install-r-ubuntu-16-04-xenial/

1. Add repository
```
$ sudo echo "deb http://cran.rstudio.com/bin/linux/ubuntu xenial/" | sudo tee -a /etc/apt/sources.list
```

2. Ubuntu Keyring
```
$ gpg --keyserver keyserver.ubuntu.com --recv-key E084DAB9
$ gpg -a --export E084DAB9 | sudo apt-key add -
```

3. Install
```
$ sudo apt-get update
$ sudo apt-get install r-base r-base-dev
```

4. Enter command prompt
```
$ sudo -i R
```

# Install RStudio
https://rstudio.com/products/rstudio/download/#download
https://www.r-bloggers.com/how-to-install-r-ubuntu-16-04-xenial/

download .deb and install it

**MAY BE need to install** 
```
$ sudo apt-get -f install libgstreamer-plugins-base0.10-0 libgstreamer0.10-0 libjpeg62
```

-------------------------------------------------------------------------------------------

# Libraries

## Install libraries

In console
```
> install.packages("lib-name")
```

## Use library
```
> library(lib-name)
```

### Some libraries used

- magic : Tu handle magic squares
- 


## Help R libraries

```
> help("lib-name")
```


-------------------------------------------------------------------------------------------

## Rmd RmarkDowns

### To execute code and print output code
```{r cars}
summary(cars)
```

## Prevent printing of the R code that generated
```{r pressure, echo=FALSE}
plot(pressure)
```

## Using different programming languages in Rmd

### Python

**Use Python in Rmd**
1. Install reticulate package
```
> install.packages("reticulate")
```

2. Use python
```{python}
import sys
print(sys.version)
print(sys.executable)
x = 67;
print(x);
```

**Specify Python path interpreter**
```{python, engine.path = '/usr/bin/python3'}
import sys
print(sys.version)
print(sys.executable)
x = 67;
print(x);
```

**Install python packages**
1. Load reticulate
```
> library(reticulate)
> py_install("lib")

2. Use this package in Rmd
```{python}
import lib
x = 5;
print(5)
```

### Specify language to interprate

1. Setup path interpreter
```{r setup, include=FALSE}
knitr::opts_chunk$set(echo = TRUE)
knitr::opts_chunk$set(engine.path = list(
  #python = '/usr/local/bin/python3',
  node = '/usr/local/bin/node'
))
```

2. Write chunk
```{node}
let x = 45;
console.log(x);
```


-------------------------------------------------------------------------------------------

## R and Python with reticulate

### Create Python files with functions and use them in R

1. Create a .py file in the same folder

2. Write some functions in python
```
def add(number1, number2):
	return number1 + number2
```

3. Invoke .py source files in R code
```{r}
library(reticulate)


source_python("./PythonFunctions.py")
x = add(1, 2)
print(x)
```

-------------------------------------------------------------------------------------------