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

## Drop collection
```
> db.<collectionName>.drop();
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

## Update One
```
> db.<collectionName>.updateOne({_id: new ObjectId("5e3467aaf9d29b0564188149")}, {$set:{field1:"value"}});
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
1. Dump inside container. Optional database name. If not, you need to be root
```
$ sudo docker exec -it <container-id> bash
$ cd /
$ mongodump --port 27017 [-d db_name] -u user -p secret -o /dump/
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

# Some find queries
https://docs.mongodb.com/manual/tutorial/query-documents/

**AND condition**
*SELECT * FROM inventory WHERE status = "A" AND qty < 30*
```
> db.inventory.find( { status: "A", qty: { $lt: 30 } } );
```

**OR condition**
*SELECT * FROM inventory WHERE status = "A" OR qty < 30*
```
> db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } );
```

**AND with OR Condition**
*SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%")*
```
> db.inventory.find({status:"A", $or:[{qty:{$lt:30}},{item:/^p/}]});
```

**COUNT**
*SELECT COUNT(*) AS count FROM sales*
```
> db.sales.aggregate([{$group:{_id: null,count:{$sum:1}}}]);
```

------------------------------------------------------------------------------------------


# Some cool queries with aggregate

**Project**
*SELECT _id, title, author FROM books*
```
db.books.aggregate( [ { $project : { title : 1 , author : 1 } } ] );
```

**Lookup**
```
db.city.aggregate([
   {
     $lookup:
       {
         from: "country",
         localField: "country",
         foreignField: "_id",
         as: "countries"
       }
  }
]);
```

If you dont want lookup join be an array, use unwind
FOR EXAMPLE: 
- You can match with city params:
- shop as only one city.
```
db.shop.aggregate([
  {
    $lookup:
      {from:"city", localField:"city", foreignField:"_id", as:"city"}
  },
  {
    $unwind:
      {path:"$city",preserveNullAndEmptyArrays:true}
  },
  {
    $match:
      {'city.name':"Bogotá"}
  }
]);
```


https://docs.mongodb.com/manual/reference/operator/aggregation/match/#pipe._S_match
**Match**
```
db.users.aggregate([
  {$lookup:
     {from:"user_state", localField:"state", foreignField:"_id", as : "state"}
  },
  {$lookup:
     {from:"roles",localField:"roles",foreignField:"_id", as:"roles"}
  },
  {$match:
     {mail:"vapedraza1706@gmail.com"}
  }
]);
```

**JS RegExp**
*SELECT * FROM products WHERE sku like "%789";*
```
> db.products.find( { sku: { $regex: /789$/ } } );
```

**Match with JS RegExp**
```
db.shop.aggregate([
  {
    $lookup:
      {from:"city", localField:"city", foreignField:"_id", as:"city"}
  },
  {
    $unwind:
      {path:"$city",preserveNullAndEmptyArrays:true}
  },
  {
    $match:
      {'city.name':{$regex:/^Bog/}}
  }
]);
```

**Group**
*SELECT item,Sum((price*quantity)) AS totalSaleAmount FROM sales GROUP BY item HAVING totalSaleAmount >= 100*
```
db.sales.aggregate(
  [
    // First Stage
    {
      $group :
        {
          _id : "$item",
          totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } }
        }
     },
     // Second Stage
     {
       $match: { "totalSaleAmount": { $gte: 100 } }
     }
   ]
 )
```

**Sort, AVG, Count, Sum**
*SELECT date,Sum((price*quantity)) AS totalSaleAmount,Avg(quantity) AS averageQuantity,Count(*) AS Count FROM sales GROUP BY Date(date) ORDER BY totalSaleAmount DESC*
```
db.sales.aggregate([
  // First Stage
  {
    $match : { "date": { $gte: new ISODate("2014-01-01"), $lt: new ISODate("2015-01-01") } }
  },
  // Second Stage
  {
    $group : {
       _id : { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
       totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
       averageQuantity: { $avg: "$quantity" },
       count: { $sum: 1 }
    }
  },
  // Third Stage
  {
    $sort : { totalSaleAmount: -1 }
  }
 ])
```

**Search Shop's products, group and count by type**
```
db.product.aggregate([
  {
    $match: {shop:ObjectId("5e643fe778e1441e15069a3c")}
  },
  {
    $lookup:{
      from:"product_type",
      localField:"type",
      foreignField:"_id",
      as:"type"
    }
  },
  {
    $group:{_id:"$type.name", count:{$sum:1}}
  }
]);
```

**SQL Comparison**
https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/
```
WHERE	                 $match
GROUP BY	         $group
HAVING	                 $match
SELECT	                 $project
ORDER BY	         $sort
LIMIT	                 $limit
SUM()	                 $sum
COUNT()	                 $sum $sortByCount
join	                 $lookup
SELECT INTO NEW_TABLE	 $out
MERGE INTO TABLE	 $merge (Available starting in MongoDB 4.2)
```

------------------------------------------------------------------------------------------
