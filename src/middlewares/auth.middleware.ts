import { NextFunction,Request,Response } from 'express'
import {validationResult} from 'express-validator'
import {sign, verify} from "jsonwebtoken"
import {randomBytes, createHmac} from "crypto"
import dotenv from 'dotenv'

const jwtSecret = process.env.TOKEN_SECRET || "TOKEN_SECRET"

const validate = (req:Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const generateJWT= (req:Request, res:Response, next:NextFunction) => {
  try {
    const refreshId = req.body.userId + jwtSecret;
    const salt = randomBytes(16).toString('base64');
    const hash = createHmac('sha512', salt).update(refreshId).digest("base64");
    req.body.refreshKey = salt;
    const token = sign(req.body, jwtSecret);
    const b = Buffer.from(hash);
    const refresh_token = b.toString('base64');
    res.status(201).send({accessToken: token, refreshToken: refresh_token});
  } catch (err) {
      res.status(500).send({errors: err});
  }
}

const verifyJWT = (req:Request, res:Response, next:NextFunction) => {
  if (req.headers['authorization']) {
    try {
      let authorization = req.headers['authorization'].split(' ');
      if (authorization[0] !== 'Bearer') {
          return res.status(401).send();
      } else {
          req.body.jwt = verify(authorization[1], jwtSecret);
          return next();
      }
    } catch (err) {
        return res.status(403).send();
    }
  }else{
    return res.status(401).send();
  }
}
const permission=(required_permission:string[])=>{
  return (req:Request, res:Response, next:NextFunction) => {
    const user_permission = (req.body.jwt.role);
    if (required_permission.includes(user_permission)) {
        return next();
    } else {
        return res.status(403).send();
    }
  }
}

export const AuthMidleware = {validate, generateJWT, verifyJWT, permission}