var db = require("../db");
module.exports.auth = (req, res, next) =>{
    console.log(req.cookies);
    if(!req.cookies)
    {
        res.redirect("/login");
        return;
    }
    var user = db.get("users").find({id:req.cookies.userId}).value();
    if(!user)
    {
       
        res.redirect("/login");
        return;
    }
    next();
}