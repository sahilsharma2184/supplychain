//modules
const { MongoClient, MongoCryptKMSRequestNetworkTimeoutError } = require("mongodb");
const logEvents = require("../middlewares/logEvents.js");
const eventEmitter = require("events");
const jwt = require('jsonwebtoken');

//connection string
const uri = process.env.MONGODB_CONNECTION_URI;

//model access
const client = new MongoClient(uri); 

//event and log handlers
const myEmitter = new eventEmitter();
myEmitter.on("log",async (msg) => await logEvents(msg)); 


const generateAccessToken = ({ id }) => {
    const accessToken = jwt.sign (
        {'id' : id},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : '300s' }
    )
    return accessToken;
}

const generateRefreshToken = ( { id }) => {
    const refreshToken = jwt.sign (
        {'id' : id},
        process.env.REFRESH_TOKEN_SECRET,
        { 'expiresIn' : '1d'}
    )
    return refreshToken;
}

const validateLogistics = async (req,res) => {
    myEmitter.emit("log","/login-logistics");
    try {
        const db = client.db("logistics");
        const collection = db.collection("emp_data");
        const id = await collection.findOne({"ID":parseInt(req.body.id)});

        if(id === null){
            return res.json("failed");
        }
        else{
            if(id.password === req.body.passwd) {  
                const accessToken = generateAccessToken(req.body.id);
                const refreshToken = generateRefreshToken(req.body.id);
                await collection.updateOne({"ID":parseInt(req.body.id)},{ $set : { refreshToken : refreshToken}});
                res.cookie('jwt', accessToken, { httpOnly:true ,expiresIn : 3*60 });
                return res.status(200).json({"message":"success",accessToken:accessToken});
            }
            else
                return res.status(500).json("failed");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : error.message});
    } 
}

const validateRetailer = async (req,res) => {
    myEmitter.emit("log","/login-retailer");
    try {
        await client.connect();
        const db = client.db("retailer");
        const collection = db.collection("ret_data");
        const id = await collection.findOne({"ID":parseInt(req.body.id)});

        if(id === null){
            return res.json("failed");
        } 
        else{
            if(id.password === req.body.passwd)
                return res.json("success");
            else
                return res.json("failed");
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({error : error.message});
    } 
}

const refreshToken_logistics = async (req,res) => {
    myEmitter.emit("log","/token");
    try {
        await client.connect();
        const db = client.db("logistics");
        const collection = db.collection("emp_data");
        const refreshToken = await collection.findOne({"ID" : parseInt(req.body.id)});

        if(refreshToken === null){
            return res.sendStatus(403);
        }
        else{
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, user) => {
                    if(err) return res.json("token expired");
                    const accessToken = generateAccessToken(user.id);
                    res.cookie("jwt",accessToken, { httpOnly:true, expiresIn:5*60});
                }
            )
        }

    } catch (error) {
        console.error(error);
    }
}

module.exports = { validateLogistics, validateRetailer,refreshToken_logistics };

