# MongoDB commands
------------------------------------------------------------------------------------------
## Connect
**Execute**
```
$ mongo
```
**If you haave running mongo on docker container**
```
$ sudo docker exec -it <container-id> bash
$ mongo
```

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

## Authenticate to database and logout
```
> db.auth("root", "passwd");

> db.logout();
```

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