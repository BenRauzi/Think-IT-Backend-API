import {Controller, Param, Body, Get, Post, Put, Delete, Header, Res, Req, Params} from "routing-controllers";
import * as fs from 'fs';
import { sign, verify } from 'jsonwebtoken';
import { AuthRequest } from '../dto';
import { inspect } from 'util'
declare const JWT_SECRET: string;
declare const JWT_ISSUER: string;

@Controller("/api")
export class UserController {


    @Get("/users")
    @Header('Access-Control-Allow-Origin','*')
    getAll(@Res() response) {
    // response.send(401);
    const token = sign({}, JWT_SECRET, {
        audience: "Helol!",
        expiresIn: "50 seconds", //expiry
        issuer: JWT_ISSUER,
        subject: "useremail@email.com"
    });
    const test = verify(token, JWT_SECRET);
    return {token: test};
    }

    @Post("/login")
    @Header('Access-Control-Allow-Origin','*')
    @Header('Access-Control-Allow-Headers', 'Content-Type')
    loginUser(@Res() res, @Req() req){
        //verifyLogin()
        const token = sign({userId:"0800-83-83-83"}, JWT_SECRET, {
            expiresIn: "5 seconds"
        });
        return {token: token};
    }

    // @Post("/verify")
    // @Header("Access-Control-Allow-Origin","localhost:4200")
    // veriUser(@Req() req){
    //     return {body: req.query}
    // }

    // @Post("/verify")
    // @Header('Access-Control-Allow-Origin','*')
    // @Header('Access-Control-Allow-Headers', 'x-access-token')
    // verifyUser(@Res() res, @Req() req: AuthRequest){
    //     // const id = typeof req.userId;
    //     // res.send(200);
    //     // res.send(inspect(req));
    //     // return id;
    //     // return id;
    //     // return req.Headers;
    //     // return {userId: req, another: "TEST!"};
    //     // const test = verify(token, JWT_SECRET);
    //     // return test;
    // }

    // @Post("/verify")
    // verifyUser(@Req() req){
    //     return req;
    // }
}