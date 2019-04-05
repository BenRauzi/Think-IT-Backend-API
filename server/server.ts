import 'reflect-metadata'; // this shim is required
import {createExpressServer, useExpressServer} from 'routing-controllers';
import * as Controllers from './controllers';
import * as cors from 'cors';
import * as circular_json from 'circular-json';
import { sign, verify, TokenExpiredError } from 'jsonwebtoken';
import { UserDto, Student } from './dto';
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
                const jwtToken = sign({userId: userID}, JWT_SECRET, {expiresIn: '1800 seconds'});
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

                if (role === 'Student') {
                    const request2 = new sql.Request();
                    request2.query(`insert into StudentDetails ("UUID") values ('${userId}')`, function(err2, result2){
                        if (err2) { console.log(err2); }

                        res.send(result2);
                    });
                } else {
                    res.send(result);
                }
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
        } else {
            res.send(401);
        }
    }
});

app.get('/api/notices', cors(), (req, res, next) => {
    const request = new sql.Request();
    request.query(`select * from Notices`, (err, result) => {
        if (err) { console.log(err) }
        res.send(result.recordset);
    });
});

app.get('/api/getuser', cors(), async (req, res) => {
    const token = req.headers.authorization;
    const user = await getUser(token);
    res.json({role: user.AccountType});
});

app.get('/api/student/names', cors(), async (req, res) => {
    const authToken = req.headers.authorization;
    if(!isExpired(authToken)){
        if(await isPermitted(authToken, 'Administrator')){
            const request = new sql.Request();
            request.query(`SELECT Name, UserID FROM Users WHERE AccountType = 'Student'`, (err, result) => {
                if(err){ console.log(err) }
                res.send(result.recordset);
            })
        }
    }
    else{
        res.send(401);
    }
});

app.get('/api/student/details', cors(), async(req, res) => {
    const authToken = req.headers.authorization;
    if(!isExpired(authToken)){
        if(await isPermitted(authToken, 'Student')){
            const request = new sql.Request();
            const token = verify(authToken, JWT_SECRET);
            const UUID = token.userId;
            request.query(`select * from StudentDetails WHERE UUID = '${UUID}'`, (err, result) => {
                if (err) { console.log(err); }

                if(result.rowsAffected !== 0 ){
                    res.send(result.recordset[0]);
                } else {
                    // error
                }
            });
        } else {
            res.send(401);
        }
    } else {
        res.send(401);
    }
});
app.post('/api/student/details', cors(), async (req, res) => {
    const authToken = req.headers.authorization;
    const userId = req.body.userId;
    if(!isExpired(authToken)){
        if(await isPermitted(authToken, 'Administrator')){
            const request = new sql.Request();
            request.query(`select * from StudentDetails WHERE UUID = '${userId}'`, (err, result) => {
                if(err){ console.log(err)}
                res.send(result.recordset[0]);
            });
        }
    }
    else{
        res.send(401);
    }
});

app.put('/api/student/details', cors(), async(req, res) => {
    const authToken = req.headers.authorization;
    let student: Student;
    student = req.body;
    const userId = student.UUID;
    if(!isExpired(authToken)){
        if(await isPermitted(authToken, 'Administrator')) {
            const request = new sql.Request();
            // tslint:disable-next-line: max-line-length
            request.query(`update StudentDetails set FirstName = '${student.FirstName}', ForeNames = '${student.ForeNames}', LastName = '${student.LastName}', DateOfBirth = '${student.DateOfBirth}', NSN = '${student.NSN}', HomePhone = '${student.HomePhone}', PhysicalUnitNo = '${student.PhysicalUnitNo}', PhysicalNumber = '${student.PhysicalNumber}', PhysicalStreet = '${student.PhysicalStreet}', PhysicalRuralDelivery = '${student.PhysicalRuralDelivery}', PhysicalSuburb = '${student.PhysicalSuburb}', PhysicalPostcode = '${student.PhysicalPostcode}', PostalUnitNo = '${student.PostalUnitNo}', PostalNumber = '${student.PostalNumber}', PostalStreet = '${student.PostalStreet}', PostalRuralDelivery = '${student.PostalRuralDelivery}', PostalSuburb = '${student.PostalSuburb}', PostalPostcode = '${student.PostalPostcode}', CaregiverOneRelationship = '${student.CaregiverOneRelationship}', CaregiverOneName = '${student.CaregiverOneName}', CaregiverOneAddress = '${student.CaregiverOneAddress}', CaregiverOneHomePhone = '${student.CaregiverOneHomePhone}', CaregiverOneMobilePhone = '${student.CaregiverOneMobilePhone}', CaregiverOneOccupation = '${student.CaregiverOneOccupation}', CaregiverOneWorkPhone = '${student.CaregiverOneWorkPhone}', CaregiverOneEmail = '${student.CaregiverOneEmail}', CaregiverTwoRelationship = '${student.CaregiverTwoRelationship}', CaregiverTwoName = '${student.CaregiverTwoName}', CaregiverTwoAddress = '${student.CaregiverTwoAddress}', CaregiverTwoHomePhone = '${student.CaregiverTwoHomePhone}', CaregiverTwoMobilePhone = '${student.CaregiverTwoMobilePhone}', CaregiverTwoOccupation = '${student.CaregiverTwoOccupation}', CaregiverTwoWorkPhone = '${student.CaregiverTwoWorkPhone}', CaregiverTwoEmail = '${student.CaregiverTwoEmail}', EmergencyContactRelationship = '${student.EmergencyContactRelationship}', EmergencyContactName = '${student.EmergencyContactName}', EmergencyContactAddress = '${student.EmergencyContactAddress}', EmergencyContactHomePhone = '${student.EmergencyContactHomePhone}', EmergencyContactMobilePhone = '${student.EmergencyContactMobilePhone}', EmergencyContactOccupation = '${student.EmergencyContactOccupation}', EmergencyContactWorkPhone = '${student.EmergencyContactWorkPhone}' where UUID = '${userId}'`, (err, result) => {
                if(err){ console.log(err); }

                res.send(result);
            });
        }
    } else {
        res.send(401);
    }
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
