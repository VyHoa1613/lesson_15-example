const db = require("../db");

module.exports.authAdmin = (req, res, next) =>{
    var user = db.get("users").find({id:req.cookies.userId}).value();
    var userTran = db.get("transaction").filter({userId: user.id}).value();
    var errors = []
    if(!user.isAdmin)
    {
        var takeUser = userTran.map(function(item) {
            return{
                user: db.get("users").find({id:item.userId}).value().name,
                book: db.get("books").find({id:item.bookId}).value().title,
                id: db.get("transaction").find({id:item.id}).value().id,
                isComplete: db.get("transaction").find({id:item.id}).value().isComplete
            }
        })
        res.render("transaction/borrow",{
            borrows:takeUser,
            errors:errors
            })
        return;
    }
    next();
}