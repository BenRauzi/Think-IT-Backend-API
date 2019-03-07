import "reflect-metadata"; // this shim is required
import {createExpressServer, useExpressServer} from "routing-controllers";
import * as Controllers from "./controllers"
import * as cors from 'cors';
import * as circular_json from 'circular-json'
import { sign, verify, TokenExpiredError } from 'jsonwebtoken';

declare const JWT_SECRET;
const app = createExpressServer({
controllers: Object.values(Controllers) // we specify controllers we want to use
});
    
app.use(cors({
    origin: 'http://localhost:4200'
}));
    
useExpressServer(app, {
    // controllers: Object.values(Controllers)
});
    
app.get('/test',cors(), (req, res, next) => {
    res.json({ msg: 'coolio!'});
});

app.post('/api/verify', cors(), (req, res, next) => {
    try{
        const verified = verify(req.headers.authorization, JWT_SECRET);
    }
    catch(TokenExpiredError){
        res.json({verified: false, msg: "Sent!"});
        return;
    }
    res.json({verified: true, msg: "Sent!"});
})
// run express application on port 3000
const server = app.listen(3000, () => {
    console.log("Server started on port " + server.address().port);
});
