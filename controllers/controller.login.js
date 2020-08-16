var db = require("../db");
var bcrypt = require('bcrypt');
var saltRounds = 10;
var myPlaintextPassword = 's0/\/\P4$$w0rD';
var someOtherPlaintextPassword = 'not_bacon';
var md5 = require('md5');


module.exports.getLogin = (req, res) =>{
    res.render("login/login")
}
module.exports.postLogin = (req, res) =>{
    var email = req.body.email;
    var user = db.get("users").find({email:email}).value();
    var password = req.body.password;
    var hashPassword = md5(password);
     var salt = bcrypt.genSaltSync(saltRounds);
    // console.log(salt);
     var hash = bcrypt.hashSync(myPlaintextPassword, salt);
    // console.log(hash)
    // var hash1 = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    // console.log(hash1);
    // console.log(bcrypt.compareSync(myPlaintextPassword, hash))
    // console.log(bcrypt.compareSync(someOtherPlaintextPassword, hash1))
        //... fetch user from a db etc.
    if(!user)
    {
        res.render("login/login",{
            errors: ["user does not exist"],
            values:req.body
        })
        return;
    }
    if(user.password !== hashPassword)
    {
        res.render("login/login",{
            errors: ["password is wrong"],
            values:req.body
        })
        return;
    }
    res.cookie("userId",user.id);
    res.redirect("/users");
}