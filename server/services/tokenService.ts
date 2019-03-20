import { verify, TokenExpiredError } from 'jsonwebtoken';

declare const JWT_SECRET;
export class TokenService{
    isExpired(token): boolean{
        try{
            verify(token, JWT_SECRET);
        }
        catch(TokenExpiredError){
            return true;
        }
        return false;
    }
}