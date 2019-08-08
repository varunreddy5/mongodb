// mongoose library to modify the database in some fashion

// src/user.js will be used to connect mongoose with mongo

// mocha - testing framework

/*

After you have connected to mongod with command mongo.

List databases with command show dbs
iot:PRIMARY> show dbs
    admin  0.000GB
    iot    0.020GB
    local  0.042GB
    test   0.000GB
    testi  0.000GB

Select one of the DB's with use iot command
iot:PRIMARY> use iot

switched to db iot

List collections on that DB with show collections command
iot:PRIMARY> show collections
data
header
key

Make query to one of those collections
iot:PRIMARY> db.header.find()
{ "_id" : "1b5caa", "temp1" : "Temperature", "pressure1" : "Pressure", "humidity1" : "Humidity", "uv1" : "UV", "BusV1" : "Solar Panel (V)", "Current1" : "Solar Panel Current (mA)", "BusV2" : "Battery (V)", "Current2" : "Battery Current (mA)" }
{ "_id" : "30444", "temp1" : "Temperature", "pressure1" : "Pressure", "humidity1" : "Humidity" }
{ "_id" : "239684", "temp1" : "Temperature", "pressure1" : "Pressure", "humidity1" : "Humidity" }

So, you need to be connected WANTED database with use command and you need to show the one collection what you want to query with db.<collection_name>.find()
*/