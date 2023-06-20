import {
  User
}from "../models/user.model"
import {QueryTypes } from 'sequelize'
import sequelize,{prefix_db} from "../db/db"
import { NextFunction,Request,Response } from 'express'
import Logger from "../utils/logger"

const tb_name=`${prefix_db}_users`
const log=Logger("UserController")

const getUser = async (req:Request, res:Response, next:NextFunction) =>{
  const { id } = req.params
  if(!id) return res.status(401).json({
    errors: [
      {
        param: 'id',
        msg: 'pass id to body'
      }
    ]
  })
  
  try{
    const users:User[] = await sequelize.query(`SELECT id,username,status,role,name,phonenumber,createdAt,updatedAt FROM ${tb_name} where id=$1`,{
      type:QueryTypes.SELECT,
      bind:[id]
    })
    // const user = await UserDB.findOne({ where: { id: id } });
    if(users && users.length>0){
      return res.status(201).send(users[0])
    }
  }catch(e){
    log.debug(e.stack)
  }
  return res.status(404).send()
}
const getAllUser = async (req:Request, res:Response, next:NextFunction) =>{
  try{
    const users:User[]= await sequelize.query(`SELECT id,username,status,role,name,phonenumber,createdAt,updatedAt FROM ${tb_name}`,{
      type:QueryTypes.SELECT
    })
    // const users = await UserDB.findAll()
    if(users&& users.length>0){
      return res.status(201).send(users)
    }
  }catch(e){}
  return res.status(404).send()
}
const updateInfoUser = async(req:Request, res:Response, next:NextFunction) =>{
  const { id } = req.params
  if(!id) return res.status(401).json({
    errors: [
      {
        param: 'id',
        msg: 'pass id to params'
      }
    ]
  })
  const users:User[] =  await sequelize.query(`SELECT id,username,status,role,name,phonenumber,createdAt,updatedAt FROM ${tb_name} where id=$1`,{
    type:QueryTypes.SELECT,
    bind:[id]
  })
  if(!users && users.length==0) return res.status(404).send()
  const {name,phonenumber,status} = req.body
  const new_user={...users[0], name, phonenumber,status}
  try{
    await sequelize.query(`UPDATE ${tb_name} SET name=$1, phonenumber=$2, status=$3 where id=$4`,{
      bind:[new_user.name,new_user.phonenumber,new_user.status, id],
      type:QueryTypes.UPDATE
    })
    return res.status(201).send(new_user)
  }catch(e){
    log.debug(e.stack)
    return res.status(404).send()
  }
}

const updateRoleAndStatusUser = async(req:Request, res:Response, next:NextFunction) =>{
  const { id } = req.params
  if(!id) return res.status(401).json({
    errors: [
      {
        param: 'id',
        msg: 'pass id to params'
      }
    ]
  })
  const users:User[] =  await sequelize.query(`SELECT id,username,status,role,name,phonenumber,createdAt,updatedAt FROM ${tb_name} where id=$1`,{
    type:QueryTypes.SELECT,
    bind:[id]
  })
  if(!users && users.length==0) return res.status(404).send()
  const {role, status} = req.body
  const new_user={...users[0], role:role , status:status}
  try{
    await sequelize.query(`UPDATE ${tb_name} SET role=$1, status=$2 where id=$3`,{
      bind:[new_user.role,new_user.status, id],
      type:QueryTypes.UPDATE
    })
    return res.status(201).send(new_user)
  }catch(e){
    log.debug(e.stack)
    return res.status(404).send()
  }
}

export const UserController={getUser,getAllUser, updateInfoUser, updateRoleAndStatusUser}