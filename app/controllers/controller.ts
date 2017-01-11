import { Router, Request, Response } from 'express';

const INTERNAL_SERVER_ERROR: number = 500;
const NOT_FOUND: number = 404;
const OK: number = 200;

export function handleResult(res: Response, error: string, result: any | [any]) {
    if (error) {
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json({ error: error });
    }
    if (result == null) {
        return res
            .status(NOT_FOUND)
            .json({});
    }
    res.status(OK).json(result);
}
