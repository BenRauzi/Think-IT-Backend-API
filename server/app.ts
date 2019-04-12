import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as sql from 'mssql';

class App {

    public app: express.Application;
    public port: number;

    constructor(controllers: Array<any>, port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddleware();
        this.initializeServer();
        this.initializeControllers(controllers);
    }

    private initializeMiddleware() {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: 'http://localhost:4200'
        }));
    }

    private initializeServer() {
        const config = {
            user: 'thinkitadmin',
            password: 'Jufo9295',
            server: 'thinkitccs.database.windows.net',
            database: 'ThinkIT',
            encrypt: true
        };
        sql.connect(config, (err) => {
            if (err) { console.log(err); }
        });
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/api', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
}

export default App;
