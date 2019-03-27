import 'reflect-metadata'; // this shim is required
import {createExpressServer, useExpressServer} from 'routing-controllers';
import * as Controllers from './controllers';
import * as cors from 'cors';
import * as circular_json from 'circular-json';
import { sign, verify, TokenExpiredError } from 'jsonwebtoken';
import { UserDto } from './dto';
import * as bodyParser from 'body-parser';
import * as sql from 'mssql';
import * as uuid from 'uuid/v4';
import { response } from 'express';
import { TokenService } from './services';

declare const JWT_SECRET;

const tokenService: TokenService = new TokenService();
const app = createExpressServer({
controllers: Object.values(Controllers) // we specify controllers we want to use
});

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

useExpressServer(app, {
    // controllers: Object.values(Controllers)
});

app.get('/ping', cors(), (req, res, next) => {
    res.json({ msg: 'pong!'});
});

app.get('/api/users', cors(), (req, res, next) => {
    const request = new sql.Request();
    // query to the database and get the records
    request.query('select * from Users', function(err, recordset) {

        if (err) { console.log(err); }

        // send records as a response
        res.send(recordset);

    });

});
app.post('/api/verify', cors(), (req, res, next) => {
    try {
        const verified = verify(req.headers.authorization, JWT_SECRET);
    } catch (TokenExpiredError) {
        res.json({verified: false, msg: 'Sent!'});
        return;
    }
    res.json({verified: true, msg: 'Sent!'});
});

app.post('/api/login', cors(), (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const request = new sql.Request();
    request.query(`select * from Users where Username = '${username}'`, function(err, recordset) {
        if (err) { console.log(err); }
        const recordsets: Array<UserDto> = recordset;
        if (recordset.rowsAffected[0] !== 0) {
            if (recordset.recordset[0].Password.trim() === password) {
                const userID = recordset.recordset[0].UserID;
                const role = recordset.recordset[0].AccountType;
                const username = recordset.recordset[0].Username;
                const jwtToken = sign({userId: userID}, JWT_SECRET, {expiresIn: '300 seconds'});
                res.json({ token: jwtToken, user: { username, role }});
            } else {
                res.send({msg: 'Password incorrect'});
            }
        } else {
            res.send({msg: 'User not found!'});
        }
    });
});

app.post('/api/register', cors(), (req, res, next) => {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const role = req.body.role;
    const userId = uuid();
    const request = new sql.Request();
    request.query(`select * from Users where Username = '${username}'`, function(err, recordset) {
        if (err) { console.log(err); }
        if (recordset.rowsAffected[0] === 0) {
// tslint:disable-next-line: max-line-length
            request.query(`insert into Users ("Username", "Name", "Password", "AccountType", "UserID") values ('${username}', '${name}', '${password}', '${role}', '${userId}');`, function(err, result) {
                if (err) { console.log(err); }

                res.send(result);
            });
        } else {
            res.json({msg: 'User already exists!'});
        }
    });
});

app.post('/api/authenticate', cors(), (req, res, next) => {
    const token = req.body.token;
    try {
        verify(token, JWT_SECRET);
    } catch (TokenExpiredError) {
        res.json({msg: 'Token Expired'});
        return;
    }
    res.json({msg: 'Token Cleared'});
});

app.post('/api/notices', cors(), async (req, res, next) => {
    const authToken = req.headers.authorization;
    if(isExpired(authToken)){
        res.send(401);
    } else {
        if(await isPermitted(authToken, 'Teacher')){
            const request = new sql.Request();
            const id = uuid();
            const title = req.body.title;
            const information = req.body.information;
            const user = await getUser(authToken);
            const teacher = user.Name;
// tslint:disable-next-line: max-line-length
            request.query(`insert into Notices(id, title, information, teacher) values('${id}','${title}','${information}','${teacher}')`, (err, result) => {
                if (err) { console.log(err) }

                res.send(result);
            });
        }
    }
});

app.get('/api/notices', cors(), (req, res, next) => {
    const request = new sql.Request();
    request.query(`select * from Notices`, (err, result) => {
        if (err) { console.log(err) }
        res.json({notices: result.recordset});
    });
});

function isExpired(token): boolean {
    try {
        verify(token, JWT_SECRET);
    } catch (TokenExpiredError) {
        return true;
    }
    return false;
}

async function isPermitted(token: string, requestedRole: string): Promise<boolean> {
    return new Promise( async (resolve) => {
            const user = await getUser(token);
            if (user.AccountType === requestedRole) {
                resolve(true);
            } else if(user.AccountType === 'Administrator') {
                resolve(true);
            } else{
                resolve(false);
            }
    });
}

async function getUser(token: string): Promise<UserDto>{
    const verifiedToken = verify(token, JWT_SECRET);
    // tslint:disable-next-line: max-line-length
    return new Promise((resolve, reject) => { const request = new sql.Request(); request.query(`select * from Users where UserID = '${verifiedToken.userId}'`, (err, recordset) => {
            if (err) { console.log(err); }

            const result: UserDto = recordset.recordset[0];
            if (recordset.rowsAffected[0] !== 0) {
                return resolve(result);
            } else {
                return reject('Error!');
            }
        });
    });
}

// run express application on port 3000
const server = app.listen(3000, () => {
    console.log('Server started on port ' + server.address().port);
    const config = {
        user: 'root',
        password: 'Oofman1',
        server: '104.153.109.42',
        database: 'Project Thing'
    };
    sql.connect(config, (err) => {
        if (err) { console.log(err); }
    });
});
