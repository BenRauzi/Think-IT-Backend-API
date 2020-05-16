import App from './app';
import { UserController, AuthController, NoticesController, StudentController } from './controllers';
const app = new App(
    [
        new UserController(),
        new AuthController(),
        new NoticesController(),
        new StudentController()
    ],
    3000,
);console.log("serverscript run")

app.listen();
