var db = require("../db");
module.exports.getLogin = (req, res) =>{
    res.render("login/login")
}
module.exports.postLogin = (req, res) =>{
    var email = req.body.email;
    var user = db.get("users").find({email:email}).value();
    var password = req.body.password;
    if(!user)
    {
        res.render("login/login",{
            errors: ["user does not exist"],
            values:req.body
        })
        return;
    }
    if(user.password !== password)
    {
        res.render("login/login",{
            errors: ["password is wrong"],
            values:req.body
        })
        return;
    }
    res.cookie("userId",user.id);
    console.log(req.cookies)
    res.redirect("/users");
}