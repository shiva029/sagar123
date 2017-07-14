var mongoose=require('mongoose');
bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
var userSchema=new mongoose.Schema({
    
FirstName:String,
LastName:String,
MobileNo:String,
Email:String, 
Password:String
        
            
});
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('Password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.Password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.Password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.Password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};
var User=module.exports=mongoose.model('User',userSchema);
module.exports.addUser=function(newUser,callback){
    User.create(newUser,callback);
}
module.exports.updateUser=function(id,newUser,callback){
    User.findByIdAndUpdate(id,newUser,callback);
}
module.exports.deleteUser=function(id,callback){
    User.findByIdAndRemove(id,callback);
}
module.exports.getUser=function(id,callback){
    User.findById(id,callback);
}
module.exports.getUsers=function(callback){
    User.find(callback);
}




