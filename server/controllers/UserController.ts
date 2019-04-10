import * as express from 'express';
import * as sql from 'mssql';
import { UserDto } from 'server/dto';
import { sign, verify } from 'jsonwebtoken';
import { User } from '../models';
import { AuthService } from '../services';
import * as uuid from 'uuid';

declare const JWT_SECRET;

export class UserController {
    public router = express.Router();

    private auth: AuthService;

    constructor() {
        this.intializeRoutes();
        this.auth = new AuthService();
    }

    public intializeRoutes() {
        this.router.get('/ping', this.ping);
        this.router.post('/login', this.login);
        this.router.get('/getuser', this.getUserByToken);
        this.router.post('/register', this.register);
    }

    getUserByToken = async (req, res) => {
        const authToken = req.headers.authorization;
        const user = await this.auth.getUserByToken(authToken);
        res.json({ role: user.AccountType });
    }

    login = async (req, res) => {
        const Username = req.body.username;
        const Password = req.body.password;
        const request = new sql.Request();
        request.query(`select * from Users where Username = '${Username}'`, (err, result) => {
            if (err) { console.log(err); }
            if (result.rowsAffected[0] !== 0) {
                const user: User = result.recordset[0];
                if (user.Password.trim() === Password) {
                    const userID = user.UserID;
                    const role = user.AccountType;
                    const username = user.Username;
                    console.log(JWT_SECRET);
                    const jwtToken = sign({userId: userID}, JWT_SECRET, {expiresIn: '1h'});
                    res.json({ token: jwtToken, user: { username, role }});
                } else {
                    res.send({msg: 'Password incorrect'});
                }
            } else {
                res.send({msg: 'User not found!'});
            }
        });
    }

    ping = (req, res) => {
        res.json({msg: 'pong'});
    }

    register = (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const role = req.body.role;
    const userId = uuid();
    const request = new sql.Request();
    request.query(`select * from Users where Username = '${username}'`, (err, recordset) => {
        if (err) { console.log(err); }
        if (recordset.rowsAffected[0] === 0) {
            // tslint:disable-next-line: max-line-length
            request.query(`insert into Users ("Username", "Name", "Password", "AccountType", "UserID") values ('${username}', '${name}', '${password}', '${role}', '${userId}');`, (err2, result) => {
                if (err2) { console.log(err2); }
                console.log(result);

                if (role === 'Student') {
                    const request2 = new sql.Request();
                    request2.query(`insert into StudentDetails ("UUID") values ('${userId}')`, (err3, result2) => {
                        if (err3) { console.log(err3); }
                        console.log(result2);

                    });
                }
                res.json({msg: 'Register Successful'});
            });
        } else {
            res.json({msg: 'User already exists!'});
        }
    });
    }

}
