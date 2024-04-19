//modules
require("dotenv").config();
const Express =  require('express');
const cors = require('cors');
const verifyJWT = require("./middlewares/verifyJWT.js");
const cookieParser = require("cookie-parser");
const app = Express();


const corsOptions = {
    origin : "http://localhost:5173",
    Credential : true,
}

//middlewares
app.use(Express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//port
const PORT = process.env.PORT || 8080; 


app.get('/Dashboard-logistics', verifyJWT, (req,res) => {
    console.log("success!");
    return res.json({"message":"success"});
});

app.listen(PORT, () => {
    console.log("Listening on port 8080");
})

