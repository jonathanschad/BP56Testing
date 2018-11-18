//MongoDB Stuff
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//SocketIO Stuff
const io = require('socket.io')();

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = {
    id: 1,
    messages: []
  };
  if (!dbo.collection("chats").findOne({ id: 1 }))
    dbo.collection("chats").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      //db.close();
    });

  //Socket Stuff from here on
  io.on('connection', (client) => {
    console.log("A client connected.");
    //Get all Messages to the Client at First
    dbo.collection("chats").findOne({ id: 1 }, (err, result) => {
      if (err) throw err;
      let chats = result.messages;
      client.emit("init", chats);
    });

    //Client sends Message
    client.on("sendMessage", (data) => {
      console.log("Message Received: " + data.text);
      //Save to DB
      dbo.collection("chats").updateOne({ id: 1 }, { $push: { messages: data.text } });
      //ReEmit to others
      client.broadcast.emit("onMessage", data);
    });
  });

  //Start Listening
  io.listen(8000);
  console.log('listening on port ', 8000);

});