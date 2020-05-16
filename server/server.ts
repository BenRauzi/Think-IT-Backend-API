import App from './app';
import { UserController, AuthController, NoticesController, StudentController } from './controllers';
import { LFGRequestsController } from './controllers/LFGRequestsController';
const app = new App(
    [
        new UserController(),
        new AuthController(),
        new NoticesController(),
        new StudentController(),
        new LFGRequestsController()
    ],
    3000,
);

app.listen();
