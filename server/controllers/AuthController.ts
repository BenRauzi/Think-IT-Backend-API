import * as express from 'express';
import { AuthService } from '../services';

export class AuthController {
    public router = express.Router();
    private auth: AuthService;
    constructor() {
        this.intializeRoutes();
        this.auth = new AuthService();
    }

    public intializeRoutes() {
        this.router.post('/authenticate', this.authenticate);
    }

    authenticate = async (req, res) => {
        const authToken = req.headers.authorization;
        if (this.auth.isExpired(authToken)) {
            res.json({msg: 'Token Expired'});
        } else {
            res.json({msg: 'Token Cleared'});
        }
    }
}
