#### Build jveverka/file-server in Docker
```
sudo docker run -d --name file-server-1.2.3 [--restart unless-stopped] -e SERVER_PORT=8888 -e APP_CONFIG_PATH=/opt/data/config/application.yml -v /home/viti/labs/file-server-data/files:/opt/data/files -v /home/viti/labs/file-server-data/config:/opt/data/config -p 8888:8888 jurajveverka/file-server:1.2.3
```

---------------------------------------------------------------------------------------------------------------------------------------------------------

### Rest Endpoints
All REST endpoints use 'dynamic' path. This means that path ``**`` is used as relative path in *base directory*.
See also [postman collection example](docs/FileServer.postman_collection.json).

#### Get list of files  
* __GET__ http://localhost:8888/services/files/list/** - list content directory or subdirectory
  ``curl -X GET http://localhost:8888/services/files/list/ -b /tmp/cookies.txt``

#### Download file  
* __GET__ http://localhost:8888/services/files/download/** - download file on path. file must exist. 
  ``curl -X GET http://localhost:8888/services/files/download/path/to/001-data.txt -b /tmp/cookies.txt``

#### Upload file
* __POST__ http://localhost:8888/services/files/upload/** - upload file, parent directory(ies) must exist before upload
 ``curl -F 'file=@/local/path/to/file.txt' http://localhost:8888/services/files/upload/path/to/001-data.txt -b /tmp/cookies.txt``

#### Delete files and/or directories
* __DELETE__ http://localhost:8888/services/files/delete/** - delete file or directory
  ``curl -X DELETE http://localhost:8888/services/files/delete/path/to/001-data.txt -b /tmp/cookies.txt``

#### Create empty directory
* __POST__ http://localhost:8888/services/files/createdir/** - create empty directory
  ``curl -X POST http://localhost:8888/services/files/createdir/path/to/directory -b /tmp/cookies.txt``

#### Move file or directory
* __POST__ http://localhost:8888/services/files/move/** - move file or directory. If source is file, destination must be also a file, If source is directory, destination must be directory as well.
  ``curl -X POST http://localhost:8888/services/files/move/path/to/source -b /tmp/cookies.txt -d '{ "destinationPath": "path/to/destination" }''``

#### Get audit data
* __GET__ http://localhost:8888/services/files/audit/** - get audit data for the resource.
  ``curl -X GET http://localhost:8888/services/files/audit/path/to/source -b /tmp/cookies.txt``

### Security
In order to use file server REST endpoints above, user's http session must be authorized.
Users have defined their roles and access rights to files and directories. 
See this [example](src/main/resources/application.yml) of server configuration.

#### login
* __POST__ http://localhost:8888/services/auth/login
  ``curl -X POST http://localhost:8888/services/auth/login -H "Content-Type: application/json" -d '{ "userName": "master", "password": "secret" }' -c /tmp/cookies.txt``

#### logout
* __GET__ http://localhost:8888/services/auth/logout
  ``curl -X GET http://localhost:8888/services/auth/logout -b /tmp/cookies.txt``

### Admin access
Selected role ``fileserver.admin.role`` is used for admin access. Users with this role have access to special dedicated REST endpoints.
See this [example](src/main/resources/application.yml) of server configuration.
Refer to [attached postman collection](docs/FileServer.postman_collection.json) for all admin APIs.