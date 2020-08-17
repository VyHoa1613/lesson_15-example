var db = require("../db");
var bcrypt = require('bcrypt');

var md5 = require('md5');


module.exports.getLogin = (req, res) =>{
    res.render("login/login")
}
module.exports.postLogin = (req, res) =>{
    var email = req.body.email;
    var user = db.get("users").find({email:email}).value();


    if(!user)
    {
        res.render("login/login",{
            errors: ["user does not exist"],
            values:req.body
        })
        return;
    }
    var password = req.body.password;
    var hashPassword = md5(password);
    var saltRounds = 10;
    var hash = user.password;
    var count =  user.wrongLoginCount
    if(user.wrongLoginCount > 3)
    {
        res.render("login/login",{
            errors: ["user can not Login"],
            values:req.body
        })
        return;
    }
    if(user.password !== hashPassword && !bcrypt.compareSync(req.body.password, hash))
    {
        count++;
        console.log(count);
         db.get("users").find({email:email}).assign({wrongLoginCount: count}).write();
        res.render("login/login",{
            errors: ["password is wrong"],
            values:req.body
        })

        return;
    }
    res.cookie("userId",user.id, {
        signed: true
    });
    res.redirect("/users");
}