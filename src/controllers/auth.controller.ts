import {
  User
}from "../models/user.model"
import UserDB from "../db/createtb_db"
import { NextFunction,Request,Response } from 'express'
import {createHmac, randomBytes} from "crypto"
import Logger from "../utils/logger"

const log = Logger("AuthController")

const login = async (req:Request, res:Response, next:NextFunction) =>{
  const { username, password } = req.body
  const user = await UserDB.findOne({ where: { username: username } });
  if (!user) {
    return res.status(401).json({
      errors: [
        {
          param: 'username',
          msg: 'Invalid username or password'
        }
      ]
    })
  }else{
    const passwordFields = user.password.split('$')
    const salt = passwordFields[0];
    const hash = createHmac('sha512', salt).update(password).digest("base64");
    if(hash === passwordFields[1]){
      req.body={
        userId: user.id,
        username: user.username,
        name:user.name,
        role:user.role
      }
      return next()
    }
  }
  return res.status(401).json({
    errors: [
      {
        param: 'password',
        msg: 'Invalid username or password'
      }
    ]
  })
}

const register = async (req:Request, res:Response, next:NextFunction) =>{
  const { username, password, confirmPassword } = req.body
  const user = await UserDB.findOne({ where: { username: username } });
  if(user){
    return res.status(401).json({
      errors: [
        {
          param: 'username',
          msg: 'username already used'
        }
      ]
    })
  }
  if(password !== confirmPassword){
    return res.status(401).json({
      errors: [
        {
          param: 'password/confirmPassword',
          msg: 'password and confirmPassword not match'
        }
      ]
    })
  }
  const salt = randomBytes(16).toString('base64');
  const hash = createHmac('sha512',salt).update(password).digest("base64");
  const pass_save= salt + "$" + hash;
  try{
    const squser = await UserDB.create({
      username,
      password:pass_save
    })
    return res.status(201).json({username:username})
  }catch(err){
    return res.status(500).json(err)
  }
}

export const AuthController = {login, register}