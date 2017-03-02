import { User, UserDao } from '../models/user';
import { config } from '../config';
// import  {CryptoJS} from 'CryptoJS';
import C = require('crypto-js');

export const AUTHENTICATION_ERROR = "user.logic 403";
export const AUTHORIZATION_ERROR = "user.logic 401";

export function create(username: string, companyId: string, password: string, appRolesId: string[], next: Function) {
    let user = new UserDao();
    user.username = username;
    user.createdOn = new Date();
    user.password = encrypt(password);
    user.companyId = companyId;
    user.save((err: any, aUser: User) => {
        next(err, aUser);
    });
}

export function authenticate(username: string, password: string, next: Function) {
    UserDao.findOne({ username: username }, (err: any, aUser: User) => {
        if (err) {
            next(err);
        } else if (aUser.password == encrypt(password)) {
            next(null, generateToken(aUser));
        } else {
            next(AUTHENTICATION_ERROR);
        }
    });
}

function encrypt(password: string): string {
    return C.AES.encrypt(
        C.enc.Hex.parse(password),
        C.enc.Hex.parse(config.KEY_ENCRYPTION),
        { mode: C.mode.ECB, padding: C.pad.NoPadding });
}

function generateToken(user: User): User {
    // TODO generate JWT
    user.token = 'TODO';
    return user;
}