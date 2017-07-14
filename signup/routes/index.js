var express = require('express');
var router = express.Router();
var session=require('express-session');
var User=require('./model');

router.post('/login',function(req,res){
 var Email=req.body.Email;
var Password=req.body.Password;

User.findOne({Email:Email},function(err,user){
if(err){
 return res.status(500).send();
}
if(!user){
 return res.status(404).send();
}
user.comparePassword(Password,function(err,isMatch){
if(isMatch && isMatch == true){
  req.session.user=user;
return res.status(200).send(user);
  
}
else{
  return res.status(401).send();
}
});

});
});
router.get('/login',function(req,res){
if(!req.session.user){
 return res.status(401).send({message:"Invalid Email or Password"});
}
return res.status(200).send({message:"successfully login"});
});
router.get('/logout',function(req,res){
req.session.destroy();
return res.status(200).send("successfully logout");
});
router.post('/signup',function(req,res){
var newUser={
  FirstName:req.body.FirstName,
  LastName:req.body.LastName,
  MobileNo:req.body.MobileNo,
  Email:req.body.Email,
  Password:req.body.Password
}
User.addUser(newUser,function(err,User){
if(err){
  return res.status(500).send();
}
return res.status(200).json(User);
});
});
router.put('/signup/:_id',function(req,res){
var update={
  FirstName:req.body.FirstName,
  LastName:req.body.LastName,
  MobileNo:req.body.MobileNo,
  Email:req.body.Email,
  Password:req.body.Password
}
User.updateUser(req.params._id,update,function(err,User){
if(err){
  return res.status(500).send();
}
return res.status(200).json(User);
});
});
router.delete('/signup/:_id',function(req,res){
User.deleteUser(req.params._id,function(err,User){
if(err){
  return res.status(500).send();
}
return res.status(200).json(User);
});
});
router.get('/signup/:_id',function(req,res){
User.getUser(req.params._id,function(err,User){
if(err){
  return res.status(500).send();
}
return res.status(200).json(User);
});
});
router.get('/signup',function(req,res){
User.getUsers(function(err,Users){
if(err){
  return res.status(500).send();
}
return res.status(200).json(Users);
});
});
module.exports = router;
