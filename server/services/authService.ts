import { User } from '../models';
import { verify } from 'jsonwebtoken';
import * as sql from 'mssql';

declare const JWT_SECRET;

export class AuthService {
    constructor() { }

    isExpired(token): boolean {
        try {
            verify(token, JWT_SECRET);
        } catch (TokenExpiredError) {
            return true;
        }
        return false;
    }

    async isPermitted(token: string, requestedRole: string): Promise<boolean> {
        return new Promise( async (resolve) => {
                const user = await this.getUserByToken(token);
                if (user.AccountType === requestedRole) {
                    resolve(true);
                } else if (user.AccountType === 'Administrator') {
                    resolve(true);
                } else {
                    resolve(false);
                }
        });
    }

    async getUserByToken(token: string): Promise<User> {
        const verifiedToken = verify(token, JWT_SECRET);
        // tslint:disable-next-line: max-line-length
        return new Promise((resolve, reject) => { const request = new sql.Request(); request.query(`select * from Users where UserID = '${verifiedToken.userId}'`, (err, recordset) => {
                if (err) { console.log(err); }

                if (recordset.rowsAffected[0] !== 0) {
                    const result: User = recordset.recordset[0];
                    return resolve(result);
                } else {
                    return reject('Error!');
                }
            });
        });
    }
}
