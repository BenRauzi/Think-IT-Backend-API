import * as express from 'express';
import * as sql from 'mssql';
import { AuthService } from '../services';
import { verify } from 'jsonwebtoken';
import { async } from 'q';
import { Student } from 'server/dto';

declare const JWT_SECRET;

export class StudentController {
    public router = express.Router();
    private auth: AuthService;
    constructor() {
        this.intializeRoutes();
        this.auth = new AuthService();
    }

    public intializeRoutes() {
        this.router.get('/student/names', this.getStudentNames);
        this.router.get('/student/details', this.getStudentDetailsAsStudent);
        this.router.post('/student/details', this.getStudentDetailsAsAdmin);
        this.router.put('/student/details', this.replaceStudentDetails);
    }

    getStudentNames = async (req, res) => {
        const authToken = req.headers.authorization;
        if (!this.auth.isExpired(authToken)) {
            if (await this.auth.isPermitted(authToken, 'Teacher')) {
                const request = new sql.Request();
                request.query(`SELECT Name, UserID FROM Users WHERE AccountType = 'Student'`, (err, result) => {
                    if (err) { console.log(err); }
                    res.send(result.recordset);
                });
            }
        } else {
            res.send(401);
        }
    }

    getStudentInfo = async (req, res) => {
        const authToken = req.headers.authorization;
        if (!this.auth.isExpired(authToken)) {
            if (await this.auth.isPermitted(authToken, 'Teacher')) {
                const request = new sql.Request();
                request.query(`SELECT Name, UserID FROM studentInfo WHERE AccountType = 'Student'`, (err, result) => {
                    if (err) { console.log(err); }
                    res.send(result.recordset);
                });
            }
        } else {
            res.send(401);
        }
    }

    getStudentDetailsAsStudent = async (req, res) => {
        const authToken = req.headers.authorization;
        if (!this.auth.isExpired(authToken)) {
            if (await this.auth.isPermitted(authToken, 'Student')) {
                const request = new sql.Request();
                const token = verify(authToken, JWT_SECRET);
                const UUID = token.userId;
                request.query(`select * from StudentDetails WHERE UUID = '${UUID}'`, (err, result) => {
                    if (err) { console.log(err); }

                    if (result.rowsAffected !== 0 ) {
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
    }

    getStudentDetailsAsAdmin = async (req, res) => {
        const authToken = req.headers.authorization;
        const userId = req.body.userId;
        if (!this.auth.isExpired(authToken)) {
            if (await this.auth.isPermitted(authToken, 'Administrator')) {
                const request = new sql.Request();
                request.query(`select * from StudentDetails WHERE UUID = '${userId}'`, (err, result) => {
                    if (err) { console.log(err); }
                    res.send(result.recordset[0]);
                });
            }
        } else {
            res.send(401);
        }
    }

    replaceStudentDetails = async (req, res) => {
        const authToken = req.headers.authorization;
        let student: Student;
        student = req.body;
        const userId = student.UUID;
        if (!this.auth.isExpired(authToken)) {
            if (await this.auth.isPermitted(authToken, 'Administrator')) {
                const request = new sql.Request();
                // tslint:disable-next-line: max-line-length
                request.query(`update StudentDetails set FirstName = '${student.FirstName}', ForeNames = '${student.ForeNames}', LastName = '${student.LastName}', DateOfBirth = '${student.DateOfBirth}', NSN = '${student.NSN}', HomePhone = '${student.HomePhone}', PhysicalUnitNo = '${student.PhysicalUnitNo}', PhysicalNumber = '${student.PhysicalNumber}', PhysicalStreet = '${student.PhysicalStreet}', PhysicalRuralDelivery = '${student.PhysicalRuralDelivery}', PhysicalSuburb = '${student.PhysicalSuburb}', PhysicalPostcode = '${student.PhysicalPostcode}', PostalUnitNo = '${student.PostalUnitNo}', PostalNumber = '${student.PostalNumber}', PostalStreet = '${student.PostalStreet}', PostalRuralDelivery = '${student.PostalRuralDelivery}', PostalSuburb = '${student.PostalSuburb}', PostalPostcode = '${student.PostalPostcode}', CaregiverOneRelationship = '${student.CaregiverOneRelationship}', CaregiverOneName = '${student.CaregiverOneName}', CaregiverOneAddress = '${student.CaregiverOneAddress}', CaregiverOneHomePhone = '${student.CaregiverOneHomePhone}', CaregiverOneMobilePhone = '${student.CaregiverOneMobilePhone}', CaregiverOneOccupation = '${student.CaregiverOneOccupation}', CaregiverOneWorkPhone = '${student.CaregiverOneWorkPhone}', CaregiverOneEmail = '${student.CaregiverOneEmail}', CaregiverTwoRelationship = '${student.CaregiverTwoRelationship}', CaregiverTwoName = '${student.CaregiverTwoName}', CaregiverTwoAddress = '${student.CaregiverTwoAddress}', CaregiverTwoHomePhone = '${student.CaregiverTwoHomePhone}', CaregiverTwoMobilePhone = '${student.CaregiverTwoMobilePhone}', CaregiverTwoOccupation = '${student.CaregiverTwoOccupation}', CaregiverTwoWorkPhone = '${student.CaregiverTwoWorkPhone}', CaregiverTwoEmail = '${student.CaregiverTwoEmail}', EmergencyContactRelationship = '${student.EmergencyContactRelationship}', EmergencyContactName = '${student.EmergencyContactName}', EmergencyContactAddress = '${student.EmergencyContactAddress}', EmergencyContactHomePhone = '${student.EmergencyContactHomePhone}', EmergencyContactMobilePhone = '${student.EmergencyContactMobilePhone}', EmergencyContactOccupation = '${student.EmergencyContactOccupation}', EmergencyContactWorkPhone = '${student.EmergencyContactWorkPhone}' where UUID = '${userId}'`, (err, result) => {
                    if (err) { console.log(err); }

                    res.send(result);
                });
            }
        } else {
            res.send(401);
        }
    }
}
