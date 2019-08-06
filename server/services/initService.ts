import * as sql from 'mssql';
import { Notice } from 'server/models';

export class InitService{
    constructor(){

    }

    public async noticesTimeout(){
        const request = new sql.Request();
        request.query(`SELECT * FROM Notices`, (err, result) => {
            const recordset: Notice[] = result.recordset;
            if (err) { console.log(err); }

            for (const record of recordset) {
                if (record.enddate !== null) {
                    setTimeout(() => {
                        new sql.Request().query(`DELETE FROM Notices WHERE enddate='${record.enddate}'`, (err2, result2) => {
                            if (err2) { console.log(err2); }

                            console.log(result2);
                        });
                    }, (new Date(record.enddate).getTime() - new Date().getTime()));
                }
            }
        });
    }
}