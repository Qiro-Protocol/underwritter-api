import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies);
  const token = req.cookies.token;
  const privateKey = process.env.JWT_TOKEN_SECRETE;
  if (token && privateKey) {
    try {
      const userid = jwt.verify(token, privateKey);
      if (userid) {
        req.body.id = userid.toString();
        next();
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(403);
    res.json({
      error: "no token",
    });
  }
};
