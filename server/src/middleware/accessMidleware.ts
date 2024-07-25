import { Request, Response, NextFunction } from 'express';

import {RequestCustom} from "../services/verifyJWT";

export const forAdminOnly = async (req: Request, res: Response, next: NextFunction) => {
    if(!(req as RequestCustom).roles.some(role => role === 'admin')) {
        return res.status(403).json({
            error: 'only for admin',
        });
    }
    next();
}

export  const forManagerOnly = async (req: Request, res: Response, next: NextFunction) => {
    if(!(req as RequestCustom).roles.some(role => role === 'manager')) {
        return res.status(403).json({
            error: 'only for manager',
        });
    }
    next();
}