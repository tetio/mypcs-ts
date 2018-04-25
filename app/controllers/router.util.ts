import { Router, Request, Response } from 'express';
import { AUTHENTICATION_ERROR, AUTHORIZATION_ERROR } from '../logic/user.logic'

const INTERNAL_SERVER_ERROR: number = 500;
const NOT_FOUND: number = 404;
const OK: number = 200;
const KO_AUTHENTICATION: number = 403;
const KO_AUTHORIZATION: number = 401;

export function handleResult(res: Response, error: string, result: any | any[]) {
    if (error) {
        if (error === AUTHENTICATION_ERROR) {
            return res.status(KO_AUTHENTICATION).json({});
        } else if (error === AUTHORIZATION_ERROR) {
            return res.status(KO_AUTHORIZATION).json({});
        } else {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: error });
        }
    }
    if (result == null) {
        return res
            .status(NOT_FOUND)
            .json({});
    }
    return res.status(OK).json(result);
}
