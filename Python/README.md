# Install python 3.7 in Ubuntu 16.04
https://linuxize.com/post/how-to-install-python-3-7-on-ubuntu-18-04/
http://ubuntuhandbook.org/index.php/2017/07/install-python-3-6-1-in-ubuntu-16-04-lts/
https://docs.python-guide.org/starting/install3/linux/


1. Update repos
```
$ sudo apt-get update
$ sudo apt-get autoremove
```

2. Install software-properties-common
```
$ sudo apt-get install software-properties-common
```

3. Add repo deadsnakes
```
$ sudo add-apt-repository ppa:deadsnakes/ppa
```

4. Update
```
$ sudo apt-get update
$ sudo apt-get autoremove
```

5. Install python 3.7
```
$ sudo apt-get install python3.7
$ sudo apt-get install python3.7-gdbm
$ sudo apt-get install python3-pip
```

**Switch between python3 versions**

1. Show actual puthon3 version
```
$ python3 --version
$ ls /usr/bin | grep python
```

2. update alternatives
```
$ sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.5 1
$ sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.7 2
```

3. Switch between versions when execute python3 command
```
$ sudo update-alternatives --config python3
```

4. Show version
```
$ python3 --version
```

**Install pip**
```
$ sudo apt-get install python3.7-gdbm
$ sudo apt-get install python3-pip
$ pip3 --version
```



----------------------------------------------------------------------------------

# ORM peewee

1. Install pewee
```
$ pip3 install peewee
```

2. Eexample
```
import datetime
from peewee import *

db_SQLite = SqliteDatabase('./data/employees.db')

# Connect to MySQL
mysql_db = MySQLDatabase('database', user='app', password='db_password', host='10.1.0.8', port=3306)

# Connect to a PostgreSQL database.
pg_db = PostgresqlDatabase('database', user='postgres', password='secret', host='10.1.0.9', port=5432)


class BaseSQLiteModel(Model):
	class Meta:
		database = db_SQLite

class Enterprise(BaseSQLiteModel):
	name = CharField(max_length=300, unique=True)
		
class Employee(BaseSQLiteModel):
	#None of the fields are initialized with primary_key=True, an auto-incrementing primary key will automatically be created and named “id”
	username = CharField(max_length=255, unique=True)
	salary = DoubleField(default=0)
	created_date = DateTimeField(default=datetime.datetime.now)
	enterprise = ForeignKeyField(Enterprise, backref='employees')

def create_enterprise(name):
    Enterprise.create(name)
	

# MAIN
if __name__ == '__main__':
	db_SQLite.connect()
	db_SQLite.create_tables([Enterprise, Employee], safe=True)
    #create_enterprise('PSL')
```


----------------------------------------------------------------------------------
