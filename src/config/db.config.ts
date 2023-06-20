import dotenv from "dotenv"

dotenv.config()

const host = process.env.DB_HOST
const port = process.env.DB_PORT
const username = process.env.DB_USER
const password = process.env.DB_PASS
const database = process.env.DB_NAME
const dialect = process.env.DB_DIALECT

export const CONF_DB:{[key:string]:any} = {
  development: {
    username:"root",
    password:"abc@123",
    database:"bello_development",
    host:"localhost",
    port:3306,
    dialect:"mariadb",
  },
  production:{
    username,
    password,
    database,
    host,
    port,
    dialect,
  }
}