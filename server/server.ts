import "reflect-metadata"; // this shim is required
import {createExpressServer} from "routing-controllers";
import {UserController} from "./UserController";
import * as cors from 'cors';

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
controllers: [UserController] // we specify controllers we want to use
});

app.use(cors());
// console.log(cors());

// app.all('/*', (req, res, next) => {
//     // CORS headers
//     res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     // Set custom headers for CORS
//     res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key');
//     if (req.method === 'OPTIONS') {
//         res.status(200).end();
//     } else {
//         next();
//     }
// });


// run express application on port 3000
app.listen(3000, () => {
    console.log("Server started!");
});