import * as express from 'express';
import * as sql from 'mssql';
import { AuthService } from '../services';
import * as uuid from 'uuid';
import { debug } from 'util';

export class NoticesController {
    public router = express.Router();
    private auth: AuthService;
    constructor() {
        console.log("InitializedRoutes '/notices'")
        this.intializeRoutes();
        this.auth = new AuthService();
    }

    public intializeRoutes() {
        this.router.post('/notices', this.addNotice);
        this.router.get('/notices', this.getNotices);
        console.log("InitializedRoutes '/notices'")
    }

    addNotice = async (req, res) => {
        console.log("recieved Addnotice request");
        const request = new sql.Request();
        const RiotID = req.body.RiotID;
        const PlayersNeeded = req.body.PlayersNeeded;
        const Language = req.body.Language;
        const NeedMic = req.body.NeedMic;
        const enddate = req.body.enddate;
        // tslint:disable-next-line: max-line-length
        request.query(`insert into lfgrequests(RiotID, PlayersNeeded, Language, NeedMic, enddate) values('${RiotID}','${PlayersNeeded}','${Language}','${NeedMic}', '${enddate}')`, (err, result) => {
            if (err) { console.log(err); }

            if (enddate !== undefined) {
                setTimeout(() => {
                    new sql.Request().query(`DELETE FROM lfgrequests WHERE enddate='${enddate}'`, (err2, result2) => {
                        if(err2) { console.log(err2); }

                    });
                }, (new Date(enddate).getTime() - new Date().getTime()));
            }

            res.json({msg: 'Notice Created'});
        });
    }
    

    getNotices = async (req, res) => {
        console.log("recieved Getnotice request");
        const request = new sql.Request();
        request.query(`select * from lfgrequests`, (err, result) => {
            if (err) { console.log(err); }
            res.send(result.recordset);
        });
    }

}
