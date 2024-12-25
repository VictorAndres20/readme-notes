# Install python in Ubuntu 16.04
https://linoxide.com/install-python-ubuntu/
https://linuxize.com/post/how-to-install-python-3-7-on-ubuntu-18-04/
http://ubuntuhandbook.org/index.php/2017/07/install-python-3-6-1-in-ubuntu-16-04-lts/
https://docs.python-guide.org/starting/install3/linux/


1. Update repos
```
$ sudo apt-get update
$ sudo apt-get autoremove
```

2. Install software-properties-common and 
```
$ sudo apt-get install software-properties-common
```

3. Install gcc and g++ compiler

4. Update
```
$ sudo apt-get update
$ sudo apt-get autoremove
```

5. Download and extract tar from python.org. Read README to install
Maybe get 1 error in test with test_pdb, i installed any way and work fine at the moment
```
./configure --prefix=/usr/local --enable-shared LDFLAGS="-Wl,-rpath /usr/local/lib"
make
make test
sudo make install
```

6. Maybe install
```
$ sudo apt-get python3-dev
$ sudo apt-get python-dev
```


**OPTION Install python 3.7**
```
$ sudo add-apt-repository ppa:deadsnakes/ppa
$ sudo apt-get update
$ sudo apt-get autoremove
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

**Upgrade pip**
```
python3 -m pip install --upgrade pip
```

**Upgrade packages**
```
python3 -m pip install package-name --upgrade
```

**pip errors**
*pip is configured with locations that require TLS/SSL, however the ssl module in Python is not available.*
*Could not fetch URL https://pypi.org/simple/pandas/: There was a problem confirming the ssl certificate*
https://askubuntu.com/questions/1164352/cannot-use-pip-ubuntu-pip-is-configured-with-locations-that-require-tls-ssl

1. Install necessary packages for Python and ssl
```
sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev
```
2. Download python tar from python.org and execite tar -xvf to extract it.

3. Install or re install. See README in Python folder downloaded
```
./configure --prefix=/usr/local --enable-shared LDFLAGS="-Wl,-rpath /usr/local/lib"
make
make test
sudo make install
```

4. Try python3 -m pip install [module]



*Defaulting to user installation because normal site-packages is not writeable*
```
python3.10 -m pip install --user [module]
```

----------------------------------------------------------------------------------

# Virtual Environment

Create a virtual environment.

**In Ubuntu or Xubuntu Install python3-venv
```
sudo apt-get update
sudo apt-get autoremove
sudo apt-get upgrade
sudo apt-get install python3-venv
```

Create virtual venv
```
python3 -m venv /path/to/project/venv
```

Activate virtual env
```
source venv/bin/activate
```

In virtual env you can generate file with dependencies to easy install

----------------------------------------------------------------------------------

# Requirements.txt
```
pip freeze > requirements.txt
```

In virtual env to install packages
```
pip install -r requirements.txt
```

**NOTE: Be sure to use same python versions**

Maybe need to upgrade packages
```
cat requirements.txt | cut -f1 -d= | xargs pip install -U
```
After that update requirements.txt
```
pip freeze > requirements.txt
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

# Create Docker container

- Add .dockerignore file to project
```
venv
```

- Add Dockerfile to project
```
FROM python:3.6

WORKDIR /usr/src/app

COPY . .
RUN pip --version
RUN python --version
RUN pip install -r requirements.txt


CMD [ "python", "./main.py" ]
```

- Build image
```
sudo docker build /path/Dockerfile/ -t app_name
```

- Now you can run container!!!
```
sudo docker run --name app_name -p 9002:9002 -d app_name
```

----------------------------------------------------------------------------------
# Fetch or request API
```
pip install requests
```

```
import requests
import json


def fetch_api():
    data = None
    try:
        response_api = requests.get('http://127.0.0.1:8000/organization/all/notify')
        data = json.loads(response_api.text)
    except Exception as e:
        print(str(e))
    finally:
        return data

```


----------------------------------------------------------------------------------
# Send mail
Utils mime_multipart
```
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List
from email import encoders
from email.mime.base import MIMEBase
import os


def build_mime_multi_msg(sender_email, recipients, subject, msg):
    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = ", ".join(recipients)
    message.attach(MIMEText(msg, "html"))
    return message


def build_att_dict(mime_base: MIMEBase, path_file, filename):
    return {"path_file": path_file, "filename": filename, "mime_base": mime_base}


def add_attachment(message: MIMEMultipart, mime_base: MIMEBase, path_file, filename):
    with open(os.path.join(path_file, filename), "rb") as attachment:
        # part = MIMEBase("application", "octet-stream")
        part = mime_base
        part.set_payload(attachment.read())
    encoders.encode_base64(part)
    part.add_header(
        "Content-Disposition",
        f"attachment; filename= {filename}",
    )
    message.attach(part)
    return message


def add_many_attachments(message: MIMEMultipart, attach_conf_list: List[dict]):
    mime_message = message
    for att_conf in attach_conf_list:
        path_file = att_conf['path_file']
        filename = att_conf['filename']
        mime_base = att_conf['mime_base']
        mime_message = add_attachment(mime_message, mime_base, path_file, filename)
    return mime_message

```

Utils HTML message
```
def build_html_message(message):
    return """\
    <html>
      <body>
        <p><strong>Estimados, </strong><br>
           """ + message + """<br>
        </p>
        <p>Saludos.</p>
      </body>
    </html>
    """

```

Abstract Class Mail
```
class Mail:

    def __init__(self, host, port, user, password):
        self.host = host
        self.port = port
        self.user = user
        self.password = password

```

Sender SMTP
```
import smtplib
import ssl
from src.services.mail.mail import Mail
from src.utils.html_mails import build_html_message
from src.utils.mime_multipart import build_mime_multi_msg, add_many_attachments


class SMTPSender(Mail):

    def __init__(self, host, port, user, password, name_from):
        super().__init__(host, port, user, password)
        self.name_from = name_from
        if port != 465 and port != 587:
            raise Exception("Port " + str(self.port) + " unsupported")

    def send_ssl(self, recipients, subject, msg):
        context = ssl.create_default_context()
        message = build_mime_multi_msg(self.name_from, recipients, subject, build_html_message(msg))
        with smtplib.SMTP_SSL(self.host, self.port, context=context) as server:
            server.login(self.user, self.password)
            server.sendmail(self.user, recipients, message.as_string())

    def send_tls(self, recipients, subject, msg):
        context = ssl.create_default_context()
        message = build_mime_multi_msg(self.name_from, recipients, subject, build_html_message(msg))
        with smtplib.SMTP(self.host, self.port) as server:
            server.ehlo()  # Can be omitted
            server.starttls(context=context)
            server.ehlo()  # Can be omitted
            server.login(self.user, self.password)
            server.sendmail(self.user, recipients, message.as_string())

    def send_ssl_with_attachments(self, recipients, subject, msg, attach_conf_list):
        context = ssl.create_default_context()
        message = build_mime_multi_msg(self.name_from, recipients, subject, build_html_message(msg))
        message = add_many_attachments(message, attach_conf_list)
        with smtplib.SMTP_SSL(self.host, self.port, context=context) as server:
            server.login(self.user, self.password)
            server.sendmail(self.user, recipients, message.as_string())

    def send_tls_with_attachments(self, recipients, subject, msg, attach_conf_list):
        context = ssl.create_default_context()
        message = build_mime_multi_msg(self.name_from, recipients, subject, build_html_message(msg))
        message = add_many_attachments(message, attach_conf_list)
        with smtplib.SMTP(self.host, self.port) as server:
            server.ehlo()  # Can be omitted
            server.starttls(context=context)
            server.ehlo()  # Can be omitted
            server.login(self.user, self.password)
            server.sendmail(self.user, recipients, message.as_string())

    def send_mail(self, recipients, subject, msg, attachment_list=None):
        if self.port == 465:
            if attachment_list is not None:
                self.send_ssl_with_attachments(recipients, subject, msg, attachment_list)
            else:
                self.send_ssl(recipients, subject, msg)
        elif self.port == 587:
            if attachment_list is not None:
                self.send_tls_with_attachments(recipients, subject, msg, attachment_list)
            else:
                self.send_tls(recipients, subject, msg)
        else:
            raise Exception("Port " + str(self.port) + " unsupported")

    def test_ssl(self):
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(self.host, self.port, context=context) as server:
            server.login(self.user, self.password)

    def test_tls(self):
        context = ssl.create_default_context()
        with smtplib.SMTP(self.host, self.port) as server:
            server.ehlo()  # Can be omitted
            server.starttls(context=context)
            server.ehlo()  # Can be omitted
            server.login(self.user, self.password)

    def test_mail(self):
        if self.port == 465:
            self.test_ssl()
            return "Conectado correctamente con puerto para SSL."
        elif self.port == 587:
            self.test_tls()
            return "Conectado correctamente con puerto para TLS."
        else:
            raise Exception("Port " + str(self.port) + " unsupported")

```

# Read mails
https://medium.com/paul-zhao-projects/sending-emails-with-python-c084b55a2857

IMAP reader mails
```
import os
from imbox import Imbox
from src.services.mail.mail import Mail


class IMAPReader(Mail):

    def __init__(self, host, port, user, password, download_folder):
        super().__init__(host, port, user, password)
        self.download_folder = download_folder
        if self.port == 465:
            self.ssl = True
            self.tls = False
        elif self.port == 587:
            self.ssl = False
            self.tls = True
        else:
            raise Exception("Port " + str(self.port) + " unsupported")

    def verify_download_folder(self):
        if not os.path.isdir(self.download_folder):
            os.makedirs(self.download_folder, exist_ok=True)

    def download_att(self):
        success = True
        mail = Imbox(self.host, username=self.user, password=self.password, ssl=self.ssl,
                     ssl_context=None, starttls=self.tls)
        messages = mail.messages(unread=True)  # get unread messages
        print("Cantidad de mensajes: " + str(len(messages)))
        try:
            for (uid, message) in messages:
                mail.mark_seen(uid)  # mark message as read

                for idx, attachment in enumerate(message.attachments):
                    att_fn = attachment.get('filename')
                    download_path = f"{self.download_folder}/{att_fn}"
                    # print(download_path)
                    with open(download_path, "wb") as fp:
                        fp.write(attachment.get('content').read())
        except Exception as e:
            print(str(e))
            success = False

        mail.logout()
        return success

    def read_emails(self):
        mail = Imbox(self.host, username=self.user, password=self.password, ssl=self.ssl,
                     ssl_context=None, starttls=self.tls)
        messages = mail.messages(unread=True)  # get unread messages
        print("Cantidad de mensajes: " + str(len(messages)))
        return len(messages)

```

----------------------------------------------------------------------------------

# Connect to printer with socket
```
import socket


def send_to_zebra(payload):
    zebra_addr = ('192.0.0.84', 6101)
    s = socket.socket()
    try:
        s.connect(zebra_addr)
        s.send(payload)
    except Exception as e:
        print(str(e))
    finally:
        if s is not None:
            s.close()
```

----------------------------------------------------------------------------------

# Iterate pandas dataframe
```
for index, row in df.iterrows():
    print(row['c1'], row['c2'])
```

----------------------------------------------------------------------------------

# Read Excel from path as DataFrame and convert to list of dict of indexes

```
def read_excel_to_list_dict(path_file: str) -> List:
    list_dict = []

    if path_file.endswith('.xlsx'):
        xls = pd.ExcelFile(path_file, engine='openpyxl')
    else:
        xls = pd.ExcelFile(path_file)
    for sheet_name in xls.sheet_names:
        df = pd.read_excel(xls, sheet_name=sheet_name, dtype=str)
        df = df.fillna("")
        # df = xls.parse(sheet_name)
        list_dict.append(df.to_dict('index'))

    return list_dict
```

----------------------------------------------------------------------------------

# Read Excel from bytes as DataFrame
Need to install
```
pip install pandas
pip install xlrd
pip install openpyxl
```

```
import base64
import io
import pandas as pd


class ByteReader:

    @staticmethod
    def read_bytes(bytes_64: str, extension: str) -> pd.DataFrame:
        decrypted = base64.b64decode(bytes_64)
        toread = io.BytesIO()
        toread.write(decrypted)  # pass your `decrypted` string as the argument here
        toread.seek(0)  # reset the pointer
        if extension == 'xlsx':
            df = pd.read_excel(toread, engine='openpyxl')
        else:
            df = pd.read_excel(toread, dtype=str)
        df = df.fillna('')
        print(df.head())
        return df
``` 

----------------------------------------------------------------------------------

# Create enums
```
from enum import Enum


class KeyboardEvents(Enum):
    PRESS = 'press'
    TYPE = 'type'

```

To use it is like
```
KeyboardEvents.PRESS.value
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

# Usage of Flask

1. package structure
- src/config/server.py
- src/config/templates
- main.py

2. server.py
```
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello world"

@app.route('/params')
def param(name='world'):
    name = request.args.get('name')
    return "Hello {}".format(name)

@app.route('/query')
@app.route('/query/<name>')
def query(name='mundo'):
    return "Hello {}".format(name) 

@app.route('/add/<int:num1>/<int:num2>')
@app.route('/add/<float:num1>/<float:num2>')
@app.route('/add/<int:num1>/<float:num2>')
def add(num1, num2):
    return "Adition: {} + {} = {}".format(num1, num2, num1 + num2) 

@app.route('/template')
def template():
    context = {'var': "Works!"}
    return render_template("index.html", **context)

def start():
    app.run(debug=True, port=8000, host='0.0.0.0')
```

3. main.py
```
from src.config.server import start

if(__name__ == "__main__"):
    start()
```



----------------------------------------------------------------------------------

# Repeat Every seconds with fastapi 
```
pip install fastapi
pip install uvicorn[standard]
pip install fastapi-utils
``` 

**project-name/main.py**
```
from fastapi import FastAPI
from fastapi_utils.tasks import repeat_every
from src.api.entry_points import integration, email_fact, email_notification, schedule_integration
from src.services.tasks.process_task_scheduled import process_by_task, MINUTES_EXECUTE
import uvicorn

app = FastAPI()


@app.on_event("startup")
@repeat_every(seconds=60*MINUTES_EXECUTE)
def integration_task_scheduled():
    process_by_task()


if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=9002, reload=True)

```

----------------------------------------------------------------------------------

# Schedule or crontab
```
pip install schedule
pip install pytz
``` 

**project-name/main.py**
```
import schedule
import time

def job():
    # Very important to handle error inside job function
    # beacause if an error raise the shcedule restart execution an enter in an infinite loop
    try:
        print("I'm working...")
    except Exception as e:
        print(str(e))


schedule.every(10).minutes.do(job)
schedule.every().hour.do(job)
schedule.every().day.at("10:30").do(job)
schedule.every().monday.do(job)
schedule.every().wednesday.at("13:15").do(job)
schedule.every().day.at("12:42", "Europe/Amsterdam").do(job)
schedule.every().minute.at(":17").do(job)


if __name__ == '__main__':
    while True:
        try:
            schedule.run_pending()
            time.sleep(1)
        except Exception as e:
            print(str(e))

```

----------------------------------------------------------------------------------

# UUID as primary key example
```
from uuid import uuid4
from sqlalchemy import Column, String
from src.api.config import Base


class User(Base):

    __tablename__ = "users"
    __table_args__ = {
        'schema': 'ks'
    }

    uuid = Column(String(100), primary_key=True, default=uuid4)
    seller_cod = Column(String(10))
    full_name = Column(String(80))
    login = Column(String(90))
    password = Column(String(100))
    rol = Column(String(6))
    state = Column(String(6))

```

----------------------------------------------------------------------------------

# Structure for API with fastapi 
```
pip install fastapi
pip install "uvicorn[standard]"
pip install pydantic
pip install SQLAlchemy
pip install python-dotenv
``` 

Install db driver depending your database for SQL Alchemy
https://docs.sqlalchemy.org/en/14/core/engines.html

Postgres
```
pip install psycopg2-binary
```

- project-name/src/api/controllers
- project-name/src/api/mappers
- project-name/src/api/entry_points
- project-name/src/api/models
- project-name/src/api/services
- project-name/src/api/repo
- project-name/src/api/routes
- project-name/main.py

**project-name/src/api/models/response.py**
```
class RestResponse(BaseModel):
    code: Optional[int] = 200
    ok: bool
    msg: Optional[str] = None
    error: Optional[str] = None
    data_list: Optional[List] = []
    data: Optional[dict] = None

```

**project-name/src/api/models/my_model.py**
```
from pydantic import BaseModel


class MyModel(BaseModel):
    # All attributes
    company_id: int

```

**project-name/src/api/repo/my_repo.py**
```
This need to use with SQLAlquemy 


class MyRepo():
    

```

**project-name/src/api/services/my_service.py**
```
from src.api.repo.my_repo import MyRepo


class MyService:
    def __init__(self):
        self.repo = MyRepo()

    def service_action():
        #Action
```

**project-name/src/api/mappers/my_mapper.py**
```
from src.api.mappers.my_mapper import MyMapper


class MyMapper:

    def static entity_to_Model(entity):
        #USE pydantic for this. checkout https://pydantic-docs.helpmanual.io/usage/exporting_models/
```

**project-name/src/api/controllers/rest_controller.py

```
from src.api.models.response import Response


class RestController:

    @staticmethod
    def build_ok_response() -> Response:
        return Response(ok=True, message='Process Finished')

    @staticmethod
    def build_ok_response_with_data(data) -> Response:
        return Response(ok=True, message='Process Finished', data=data)

    @staticmethod
    def build_error_response(error: str) -> Response:
        return Response(ok=False, error=error)

```

**project-name/src/api/controllers/my_controller.py**
```
from src.api.services.my_service import MyService
from src.api.mappers.my_mapper import MyMapper
from src.api.controller.rest_controller import RestController


class MyController(RestController):
    def __init__(self):
        self.service = MyService()

    def controller_action():
		try:
            return self.build_ok_response_with_data(MyMapper.entity_to_model(self.service.service_action()))
        except Exception as e:
            return self.build_error_response(str(e))

```

**src/api/models/response.py**

```
from pydantic import BaseModel
from typing import Generic, TypeVar, Optional

T = TypeVar('T')


class Response(BaseModel, Generic[T]):
    ok: bool = True
    error: str = ''
    message: str = ''
    data: Optional[T] = None

```


**project-name/src/api/entry_points/my_entry_point.py**
```
from fastapi import APIRouter

from src.api.models.request import DataStorageRequest, DataCaptureRequest
from src.api.models.response import Response
from src.api.controllers.my_controller import MyController

controller = MyController()

router = APIRouter(
    prefix="/data-storage",
    responses={
        404: {"Description": "Not found"}
    }
)


@router.post("/list-files")
async def list_files() -> Response:
    return controller.list_files()


@router.post("/get-data")
async def get_data(req: DataCaptureRequest) -> Response:
    return controller.get_data(req)


@router.post("/get-iterations")
async def get_data(req: DataCaptureRequest) -> Response:
    return controller.get_iterations(req)

```

**project-name/src/api/routes/routes.py**
```
from src.api.entry_points import my_entry_point
from fastapi import FastAPI


def set_api_routes(app: FastAPI):
    app.include_router(my_entry_point.router)

```

**project-name/src/api/middlewares/cors_middleware.py**
```
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def set_cors(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

```

**project-name/main.py**
```
from fastapi import FastAPI
from src.api.routes.routes import set_api_routes
from src.api.middlewares.cors_middleware import set_cors
import uvicorn
from dotenv import dotenv_values

app = FastAPI()

# Middlewares
set_cors(app)


@app.get("/")
def read_root():
    return {"data": "Hello there!"}


# Routes
set_api_routes(app)

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=9001, reload=True)

```

----------------------------------------------------------------------------------

# SQLAlchemy entities and repos pattern

Install
```
pip install pydantic
pip install SQLAlchemy
pip install python-dotenv
```
Postgres
```
pip install psycopg2-binary
```

**Create .env file in root**
```
DB_URI=postgresql+psycopg2://postgres:password@127.0.0.1/db_name
```

**Create Folders and config file**
- src/model/entities
- src/model/repos
- src/model/config.py
```
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from dotenv import dotenv_values
config = dotenv_values(".env")

DB_URI = config['DB_URI']


def get_db_uri():
    return DB_URI


ENGINE = create_engine(get_db_uri(), echo=True, isolation_level="SERIALIZABLE")

SESSION_FACTORY = scoped_session(
    sessionmaker(bind=ENGINE, autocommit=False, expire_on_commit=False)
)


def get_db_session():
    return SESSION_FACTORY


Base = declarative_base(metadata=MetaData(schema='ks'))
Base.query = SESSION_FACTORY.query_property()

```

**Entity Creation**
src/model/entities/products

```

```

**Repo Creation**
src/model/repos/products_repo

```

```


----------------------------------------------------------------------------------

# SQLAlchemy insert many

```
from typing import List
from sqlalchemy import insert
from src.bussiness.reader.byte_reader import ByteReader
from src.api.config import ENGINE
from sqlalchemy import Table, Column, String, MetaData, Date, DECIMAL
meta = MetaData()

table = Table(
    'pocket_balance', meta,
    Column('seller', String),
    Column('seller_name', String),
    Column('nit', String),
    Column('client', String),
    Column('client_name', String),
    Column('bill_date', Date),
    Column('bill_exp_date', Date),
    Column('bill_number', String),
    Column('total_value', DECIMAL),
    schema='ks'
)


def transform_obj(data_list) -> List:
    data_obj = []
    for i in data_list:
        if i[0] != '':
            data_obj.append({
                "seller": i[11].strip(),
                "seller_name": i[0].strip(),
                "nit": str(i[9]).strip(),
                "client": i[10].strip(),
                "client_name": i[3].strip(),
                "bill_date": str(i[4]) if str(i[4]) != '0' else None,
                "bill_exp_date": str(i[5]) if str(i[5]) != '0' else None,
                "bill_number": str(i[8]).strip(),
                "total_value": i[18],
            })
    return data_obj


class PocketBalanceService:

    def __init__(self):
        self.reader = ByteReader()
        self.engine = ENGINE

    def save(self, bytes_64: str, extension: str):
        bytes_only = bytes_64.split(',')
        if len(bytes_only) > 0:
            data = self.reader.read_bytes(bytes_only[1], extension)
            data_list = data.values.tolist()
            data_obj = transform_obj(data_list)
            with self.engine.connect() as conn:
                conn.execute("TRUNCATE TABLE ks.pocket_balance")
                conn.execute(insert(table), data_obj)
        else:
            data_obj = []
            raise Exception('No bytes')
        return data_obj

```

----------------------------------------------------------------------------------

# Django and pyinstaller

main.py

```
import os
from django.core.management import execute_from_command_line

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_test.settings")

def run_server():
    execute_from_command_line(["manage.py", "runserver", "--noreload"])

if __name__ == "__main__":
    run_server()

```

----------------------------------------------------------------------------------


