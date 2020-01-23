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

# Modules
To import modules you can use absolute packages
if you have this structure
- src
  - package1
    - module1.py
  - package 2
    - module2.py
main.py

In module1 you can import module2 using
```
from src.package2.module2 import ClassModule2
from src.package2.module2 import func2
from src.package2.module2 import variable2 
```

In main you can import module2 using
```
from src.package1.module1 import ClassModule1
from src.package1.module1 import func1
from src.package1.module1 import variable1
from src.package2.module2 import ClassModule2
from src.package2.module2 import func2
from src.package2.module2 import variable2 
```




----------------------------------------------------------------------------------

# ORM peewee

1. Install pewee
```
$ pip3 install peewee
```

2. Example structure
- src/entities
- src/repo
- src/service
- src/config/db.py
main.py

3. Config db.py
```
from peewee import SqliteDatabase, MySQLDatabase, PostgresqlDatabase

# Connect to SQLite
db_SQLite = SqliteDatabase('./data/employees.db')

# Connect to MySQL
mysql_db = MySQLDatabase('database', user='app', password='db_password', host='10.1.0.8', port=3306)

# Connect to a PostgreSQL database.
pg_db = PostgresqlDatabase('database', user='postgres', password='secret', host='10.1.0.9', port=5432)

# Switch db instance
db = db_SQLite

def connect():
    db.connect()

def create_tables(tables):
    db.create_tables(tables, safe=True)

def is_disconnected():
    return db.is_closed()

def disconnect():
    db.close()
```

4. Create BaseModel for entities
```
from peewee import Model
from src.config.db import db

class BaseModel(Model):
	class Meta:
		database = db
```

5. Create some entities
Enterprise
```
from peewee import CharField
from src.entities.BaseModel import BaseModel

class Enterprise(BaseModel):
	name = CharField(max_length=300, unique=True)
```

Employee
```
import datetime
from peewee import CharField, DoubleField, ForeignKeyField, DateTimeField
from src.entities.BaseModel import BaseModel
from src.entities.Enterprise import Enterprise

class Employee(BaseModel):
	#None of the fields are initialized with primary_key=True, an auto-incrementing primary key will automatically be created and named “id”
	username = CharField(max_length=255, unique=True)
	salary = DoubleField(default=0)
	created_date = DateTimeField(default=datetime.datetime.now)
	enterprise = ForeignKeyField(Enterprise, backref='employees')
```

6. Create repository
EnterpriseRepo
```
from src.entities.Enterprise import Enterprise

class EnterpriseRepo:

    def create_enterprise(self, name):
        return Enterprise.create(name=name)

    def find_by_name(self, name):
        return Enterprise.get(name=name)

    def edit(self, enterprise):
        enterprise.save()
    
    def find_all(self):
        return Enterprise.select().order_by(Enterprise.name.desc())
```

EmployeeRepo
```
from src.entities.Employee import Employee

class EmployeeRepo:

    def create(self, employee):
        return Employee.create(username=employee.username, salary=employee.salary, enterprise=employee.enterprise)

    def find_by_id(self, id):
        return Employee.get(id=id)

    def find_by_salary(self, salary):
        return Employee.select().where(Employee.salary == salary)

    def edit(self, employee):
        employee.save()
    
    def find_all(self):
        return Employee.select().order_by(Employee.username.asc())
```

7. Create service
EnterpriseService
```
from src.entities.Enterprise import Enterprise
from src.repo.EnterpriseRepo import EnterpriseRepo

class EnterpriseService:

    def __init__(self):
        self.repo = EnterpriseRepo()

    def create(self, name):
        self.repo.create_enterprise(name)

    def find_by_name(self, name):
        try:
            return self.repo.find_by_name(name)
        except:
            return None

    def edit(self, name, new_name):
        enterprise = self.find_by_name(name)
        if(enterprise == None):
            return False
        else:
            enterprise.name = new_name
            self.repo.edit(enterprise)
            return True

    def find_all(self):
        return self.repo.find_all()
```

EmployeeService
```
from src.entities.Employee import Employee
from src.repo.EmployeeRepo import EmployeeRepo

class EmployeeService:

    def __init__(self):
        self.repo = EmployeeRepo()

    def create(self, employee_dict):
        employee = Employee(username = employee_dict['username'], salary = employee_dict['salary'], enterprise = employee_dict['enterprise'])
        self.repo.create(employee)

    def find_by_id(self, id):
        try:
            return self.repo.find_by_id(id)
        except:
            return None

    def edit(self, id, username):
        employee = self.find_by_id(id)
        if(employee == None):
            return False
        else:
            employee.username = username
            self.repo.edit(employee)
            return True

    def find_all(self):
        return self.repo.find_all()
```

8. main
```
from src.config.db import connect, create_tables, is_disconnected, disconnect
from src.entities.Enterprise import Enterprise
from src.entities.Employee import Employee
from src.service.EnterpriseService import EnterpriseService
from src.service.EmployeeService import EmployeeService
	
enterprice_service = EnterpriseService()
employee_service = EmployeeService()

def enterprise_creators():
    enterprice_service.create("PSL")
    enterprice_service.create("Globant")
    enterprice_service.create("Platzi")
    enterprice_service.create("Udemyy")

def employee_creators():
    employee_service.create({'username':"vapedraza",'salary':5500000,'enterprise':1})


# MAIN
if __name__ == '__main__':
    connect()
    create_tables([Enterprise, Employee])
    #enterprise_creators()
    #employee_creators()
    enterprise_record = enterprice_service.find_by_name("PSL")
    if(enterprise_record == None):
        print("Doesn't exist")
    else:
        print(enterprise_record.name)
    print(enterprice_service.edit('Udemyy','Udemy'))
    for row in enterprice_service.find_all():
        print(row.name)
    employee_record = employee_service.find_by_id(1)
    if(employee_record == None):
        print("Doesn't exist employee")
    else:
        print(employee_record.username)
    for row in employee_service.find_all():
        print(row.enterprise.name)
    print(is_disconnected())
    disconnect()
    print(is_disconnected())

```





----------------------------------------------------------------------------------
