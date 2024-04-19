//modules
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Express = require('express');
const cors = require('cors');
const { validateLogistics, validateRetailer, refreshToken_logistics } = require("./controllers/moduleControls.js");

const app = Express();

const corsOptions = {
    origin : 'http://localhost:5173',
    credentials: true,
}

//middleware
app.use(Express.json());
app.use(cors(corsOptions));

app.post('/login-logistics', validateLogistics);

app.post('/token', refreshToken_logistics);

app.listen(5000, () => console.log("authServer instance running on port 5000"));
