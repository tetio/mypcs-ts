import { User, UserDao } from '../models/user';
import { config } from '../config';
// import  {CryptoJS} from 'CryptoJS';
import C = require('crypto-js');

var jwt = require('jsonwebtoken');

export const AUTHENTICATION_ERROR = 'user.logic 403';
export const AUTHORIZATION_ERROR = 'user.logic 401';
const AUTH0_CLIENT_SECRET = '9650CDBACF6C4D59F9F45D681D0ADA8B0D19174A6062DAC97D26B1364';
const AUTH0_CLIENT_ID = 'www.portic.net';

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

    //next(null, {'token':'AABBCC0011AABBCC'});
    UserDao.findOne({ username: username }, (err: any, aUser: User) => {
        if (err) {
            next(err);
        } else if (aUser && aUser.password === encrypt(password).toString()) {
            next(null, { token: generateToken(aUser) });
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

function generateToken(user: User): string {
    // TODO generate JWT
    let header = {
        "alg": "HS256",
        "typ": "JWT"
    };

    let claims = {
        "iat": Math.floor(Date.now() / 1000),
        'exp': Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        "data": user
    }
    let token = jwt.sign(claims, AUTH0_CLIENT_SECRET);
    return token;
}