const db = require("../auth/user-model")

module.exports = async (res, req, next) => {
    if(!req.body.username || !req.body.password){
        next({
            status: 401,
            message: "Username and password required!"
        })
    }else{
        try{
            const users = await db.findBy({
                username: req.body.username
            })
            if(users.length){
                req.user = users[0];
                next();
            }else{
                next({
                    status: 401,
                    message: "Invalid credentials"
                })
            }
        }catch(err){
            next(err)
        }
    }
}