const express = require("express");
const bodyParser = require("body-parser");
const shortid = require("shortid");
const app = express();
app.set("views engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db = require('./db.js')

app.get("/", (request, response) => {
  var trans = []
  for(var item of db.get("transactions")){
    trans.push({user:db.get("userList").find({id:item.userId}).value().user,
    title:db.get("listBook").find({id:item.bookId}).value().title,isComplete:item.isComplete,transId:item.id})
  }  
  response.render("index.pug",{lists:db.get("userList").value(),list:db.get("listBook").value(),transactions:trans})
});
var userRoute = require('./user.route.js')
app.use("/users/deleteUser/:id", userRoute)
app.use("/users", userRoute)
app.use("/users/createUser", userRoute)
app.use("/users/changeUser/:id", userRoute)
app.use("/users/changeUser/update/:id", userRoute)
app.use("/users/phone", userRoute)
var bookRoute = require('./book.route.js')
app.use("/books", bookRoute)
app.use("/books/create", bookRoute)
app.use("/books/changeBook/:id", bookRoute)
app.use("/books/updateBook/:id", bookRoute)
app.use("/books/deleteBook/:id", bookRoute)
app.use("/books/searchBook", bookRoute)
var transRoute = require('./transactions.route.js')
app.use("/transactions", transRoute)
app.use("/transactions/create", transRoute)
app.use("/transactions/:id/complete", transRoute)
app.use(express.static('./views'))

//listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
