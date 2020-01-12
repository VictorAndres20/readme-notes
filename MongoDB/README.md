# MongoDB commands
------------------------------------------------------------------------------------------
## Connect
**Execute**
```
$ mongo --host example.com --port 27017 -u root -p secret
```

*OR*

```
$ mongo [db] --host example.com --port 27017 -u user_db -p secret
```
**If you haave running mongo on docker container**
```
$ sudo docker exec -it <container-id> bash
$ mongo -u root -p secret
```

*OR*

```
$ sudo docker exec -it <container-id> bash
$ mongo [db] --host localhost -u user_db -p secret
```

------------------------------------------------------------------------------------------

## List databases
```
> show dbs;
```

## Create or use database
```
> use <databasename>;
```

## Show current database
```
> db;
```

## Create user to auth db
```
> db.createUser({user:"root",pwd:"passwd",roles:[{role:"readWrite",db:"<DB NAME>"}]});
```

**roles**
https://docs.mongodb.com/manual/reference/built-in-roles/

- read 
- readWrite
- dbOwner
- readAnyDatabase
- readWriteAnyDatabase
- dbAdminAnyDatabase

## Authenticate to database and logout
```
> db.auth("root", "passwd");

> db.logout();
```

------------------------------------------------------------------------------------------

## List collections
```
> show collections;
```
**OR**
```
> db.getCollectionNames();
```

## List users of current database
```
> show users;
```
**OR**
```
> db.getUsers();
```

## List all roles
```
> show roles;
```

## Create collection on current db
```
> db.createCollection("collectionName");
```

## Insert single document in collection
```
> db.<collectionName>.insert({field1: "value", field2: "value"});
```

## Insert many documents in collection
```
> db.<collectionName>.insert([{field1: "value1"}, {field1: "value2"}]);
```

## Update document, or if not exist _id create document
```
> db.<collectionName>.save({"_id": new ObjectId("jhgsdjhgdsf"), field1: "value", field2: "value"});
```

## Retrive all documents
```
> db.<collectionName>.find();
```

## Retrive limited documents
```
> db.<collectionName>.find().limit(10);
```

## Retrive document by ID
```
> db.<collectionName>.find({"_id": ObjectId("someid")});
```

## Retrive document by ID specifing fileds
```
> db.<collectionName>.find({"_id": ObjectId("someid")}, {field1: 1, field2: 1});
```

## Retrive document by ID specifing fileds
```
> db.<collectionName>.find({"_id": ObjectId("someid")}, {field1: 0, field2: 0});
```

## Retrive collection count
```
> db.<collectionName>.count();
```

## Get the collection statistics 
```
> db.<collectionName>.stats();
```

## Collection size
```
> db.<collectionName>.dataSize() // Size of the collection
> db.<collectionName>.storageSize() // Total size of document stored in the collection
> db.<collectionName>.totalSize() // Total size in bytes for both collection data and indexes
> db.<collectionName>.totalIndexSize() // Total size of all indexes in the collection
```

## Quit
```
> quit();
```

------------------------------------------------------------------------------------------

## Backups
https://github.com/wekan/wekan/wiki/Export-Docker-Mongo-Data

### Create Backup
```
$ cd /
$ mongodump --port 27017 -u root -p secret -o /dump/
``` 

**If mongo run on docker**
1. Dump inside container
```
$ sudo docker exec -it <container-id> bash
$ cd /
$ mongodump --port 27017 -u root -p secret -o /dump/
$ exit
``` 
2. Copy backup on your machine
```
$ cd /path/to/mongo-backup
$ sudo docker cp <CONTAINER ID>:/dump .
```

### Restore Backup
```
$ mongorestore --port 27017 --drop --db <DB NAME> /path/to/restore/dump/db_name/
``` 

**If mongo run on docker**
1. If you have backup on your machine, copy inside container
```
$ cd /path/to/restore/
$ docker cp dump <CONTAINER ID>:/restore-mongo/
``` 
2. Restore inside container
```
$ sudo docker exec -it <container-id> bash
$ mongorestore --port 27017 --drop --db <DB NAME> /restore-mongo/db_name/
$ exit
------------------------------------------------------------------------------------------
