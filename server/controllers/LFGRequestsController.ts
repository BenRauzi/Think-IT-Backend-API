import * as express from 'express';
import * as sql from 'mssql';
//import { AuthService } from '../services';
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
        this.router.post('/lfgRequests', this.addLFGRequest);
        this.router.get('/lfgRequests', this.getLFGRequests);
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

        const riotID = req.body.riotID;
        const playersNeeded = req.body.playersNeeded;
        const language = req.body.language;
        const needMic = req.body.needMic;
        const enddate = req.body.enddate;

        sqlRequest.query(`insert into lfgrequests( RiotID, PlayersNeeded, Language, NeedMic, enddate) values('${riotID}','${playersNeeded}','${language}','${needMic}', '${enddate}')`, (err, result) => {
            if (err) { console.log(err); }

            if (enddate !== undefined) {
                setTimeout(() => {
                    new sql.Request().query(`DELETE FROM lfgrequests WHERE enddate='${enddate}'`, (err2, result2) => {
                        if(err2) { console.log(err2); }

                    });
                }, (new Date(enddate).getTime() - new Date().getTime()));
            }

            res.json({msg: 'LFG Post Created'});
        });
    }



    //grab all from database
    getLFGRequests = async (req, res) => {
        const request = new sql.Request();
        request.query(`select * from lfgrequests`, (err, result) => {
            if (err) { console.log(err); }
            res.send(result.recordset);
        });
    }
}