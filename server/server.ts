import "reflect-metadata"; // this shim is required
import {createExpressServer} from "routing-controllers";
import * as Controllers from "./controllers"
import * as cors from 'cors';

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
controllers: Object.values(Controllers) // we specify controllers we want to use
});

app.use(cors());


// run express application on port 3000
app.listen(3000, () => {
    console.log("Server started!");
});