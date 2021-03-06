var express = require("express");
const shortid = require("shortid");
var db = require("./db.js");
var connect = {
  lists: db.get("userList").value(),
  list: db.get("listBook").value()
};
var lists = db.get("userList").value();

module.exports.changeUser = function(request, response) {
  var id = request.params.id;
  var findUser = db
    .get("userList")
    .find({ id: id })
    .value();
  response.render("changeUser.pug", { user: findUser });
};
module.exports.deleteUser = (request, response) => {
  var id = request.params.id;
  db.get("userList")
    .remove({ id: id })
    .write();
  response.render("index.pug", connect);
};
module.exports.user = (req,res)=>{
  res.render("createUser.pug")
}
module.exports.createUser = (req, res) => {
  req.body.id = shortid.generate();
  var errors =[];
  if(req.body.user.split("").length > 30){
    errors.push("name user too long")
  }
  if(!req.body.user){
    errors.push('Name is required')  
  }
  if(!req.body.phone){
    errors.push('Phone is required')  
  }
  if(errors.length){
    res.render("createUser.pug",{
      errors: errors,
      values: req.body
    })
    return
  }
  db.get("userList")
    .push(req.body)
    .write();
  res.render("index.pug", connect);
};
module.exports.updateUser = (req, res) => {
  var id = req.params.id;
  var newUser = req.body.user;
  db.get("userList")
    .find({ id: id })
    .assign({ user: newUser })
    .value();
  res.render("index.pug", connect);
};
