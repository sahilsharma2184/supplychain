require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyJWT = ( req,res,next ) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    console.log(accessToken);
    if(!accessToken){
        return res.sendStatus(401) //unauthorized access
    }

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        ( err, user ) => {
            if(err){
                console.log("token expired")
                return res.json({"message":"expired"}) //forbidden access / token expired
            }
            req.id = user.id;
            next();
        }
    )
}

module.exports = verifyJWT;
