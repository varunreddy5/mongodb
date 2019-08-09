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

/* Cleaning up middleware */
// Since the user is the root, if we delete a record like the user I want automatically clean up their blog posts as well

// To do resource clean up in this manner we're going to use a system in mongoose called middleware which are also referred as 'pre' and 'post' hooks

// How middleware works

// There's pre and post middlewares which are reference to which side of the event that the middleware runs

/* Example */

// One type of event that we might watch for is a save, so any time we are about to save a record to our database run middleware#1 and middleware#2, once the record is successfully saved run middleware#3 and middleware#4
// Important event: 'remove' which can be used for the cleanup 

// Middlewares are written in model files