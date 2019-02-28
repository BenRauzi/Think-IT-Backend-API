import {Controller, Param, Body, Get, Post, Put, Delete, Header, Res} from "routing-controllers";
import * as fs from 'fs';
import { sign, verify } from 'jsonwebtoken';

declare const JWT_SECRET: string;
declare const JWT_ISSUER: string;

@Controller()
export class UserController {


    @Get("/api/users")
    @Header('Access-Control-Allow-Origin','*')
    getAll(@Res() response) {
    // response.send(401);
    const token = sign({}, JWT_SECRET, {
        audience: "Helol!",
        expiresIn: "50 seconds",
        issuer: JWT_ISSUER,
        subject: "potato"
    });
    const test = verify(token, JWT_SECRET);
    return {token: test};
    }
}