import "reflect-metadata"; // this shim is required
import {createExpressServer, useExpressServer} from "routing-controllers";
import * as Controllers from "./controllers"
import * as cors from 'cors';
import * as circular_json from 'circular-json'
import { sign, verify, TokenExpiredError } from 'jsonwebtoken';
import * as bodyParser from 'body-parser';


declare const JWT_SECRET;
const app = createExpressServer({
controllers: Object.values(Controllers) // we specify controllers we want to use
});
    
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

useExpressServer(app, {
    // controllers: Object.values(Controllers)
});
    
app.get('/ping',cors(), (req, res, next) => {
    res.json({ msg: 'pong!'});
});

app.get('/api/users', cors(), (req, res, next) => {
    res.json([{firstName:"John", lastName: "Smith"},{firstName:"Jo", lastName:"Doe"}]);
})
app.post('/api/verify', cors(), (req, res, next) => {
    try{
        const verified = verify(req.headers.authorization, JWT_SECRET);
    }
    catch(TokenExpiredError){
        res.json({verified: false, msg: "Sent!"});
        return;
    }
    res.json({verified: true, msg: "Sent!"});
});

app.post('/api/login', cors(), (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    // DATABASE CALL, GET USERID
    const userId = "0800838383" //returned userId from database call
    if(true){ //if user does exist
        const token = sign({userId: userId}, JWT_SECRET, {expiresIn: "300 seconds"}); //change expiresIn
        res.status(200);
        res.json({ token: token });
    }
    else{
        res.status(401);
    }
});
// run express application on port 3000
const server = app.listen(3000, () => {
    console.log("Server started on port " + server.address().port);
});
