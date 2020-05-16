import * as express from 'express';
import * as sql from 'mssql';
import { AuthService } from '../services';
import * as uuid from 'uuid';

export class LFGRequestsController {
    public router = express.Router();
    //do later
    //private auth: AuthService;
    constructor() {
        this.intializeRoutes();
        //this.auth = new AuthService();
    }

    public intializeRoutes() {
        //not sure what /notices does yet
        this.router.post('/notices', this.addLFGRequest);
        this.router.get('/notices', this.getLFGRequests);
    }

    addLFGRequest = async (req, res) => {
        //add to database
        const sqlRequest = new sql.Request();
        //const id = uuid();
        //const title = req.body.title;
        //const information = req.body.information;
        //const enddate = req.body.enddate;
        //const user = await this.auth.getUserByToken(authToken);
        //const teacher = user.Name;
    }



    //grab all from database
    getLFGRequests = async (req, res) => {
        const request = new sql.Request();
        request.query(`select * from Notices`, (err, result) => {
            if (err) { console.log(err); }
            res.send(result.recordset);
        });
    }
}