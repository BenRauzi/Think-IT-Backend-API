import * as express from 'express';
import * as sql from 'mssql';
import { AuthService } from '../services';
import * as uuid from 'uuid';

export class NoticesController {
    public router = express.Router();
    private auth: AuthService;
    constructor() {
        this.intializeRoutes();
        this.auth = new AuthService();
    }

    public intializeRoutes() {
        this.router.post('/notices', this.addNotice);
        this.router.get('/notices', this.getNotices);
    }

    addNotice = async (req, res) => {
        const authToken = req.headers.authorization;
        if (this.auth.isExpired(authToken)) {
        res.send(401);
        } else {
            if (await this.auth.isPermitted(authToken, 'Teacher')) {
                const request = new sql.Request();
                const id = uuid();
                const title = req.body.title;
                const information = req.body.information;
                const enddate = req.body.enddate;
                const user = await this.auth.getUserByToken(authToken);
                const teacher = user.Name;
                // tslint:disable-next-line: max-line-length
                request.query(`insert into Notices(id, title, information, teacher, enddate) values('${id}','${title}','${information}','${teacher}', '${enddate}')`, (err, result) => {
                    if (err) { console.log(err); }

                    if (enddate !== undefined) {
                        setTimeout(() => {
                            new sql.Request().query(`DELETE FROM Notices WHERE enddate='${enddate}'`, (err2, result2) => {
                                if(err2) { console.log(err2); }

                            });
                        }, (new Date(enddate).getTime() - new Date().getTime()));
                    }

                    res.json({msg: 'Notice Created'});
                });
            } else {
                res.send(401);
            }
        }
    }

    getNotices = async (req, res) => {
        const request = new sql.Request();
        request.query(`select * from Notices`, (err, result) => {
            if (err) { console.log(err); }
            res.send(result.recordset);
        });
    }

}
