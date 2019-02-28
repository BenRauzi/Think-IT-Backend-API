import {Controller, Param, Body, Get, Post, Put, Delete, Header} from "routing-controllers";

@Controller()
export class UserController {

    @Get("/api/users")
    @Header('Access-Control-Allow-Origin','*')
    getAll() {
    return {text: "This action returns all users"};
    }
}