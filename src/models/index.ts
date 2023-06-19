import {Sequelize} from 'sequelize'
import {CONF_DB} from "../config/db"

const env = process.env.NODE_ENV || 'development';
const config = CONF_DB[env]


let sequelize:any;
export async function connectDB() {
  if(typeof sequelize === 'undefined'){
    sequelize=config.url? new Sequelize(config.url, config) : new Sequelize(config.database, config.username, config.password, config)
    await sequelize.authenticate();
  }
  return sequelize
}
export async function close() {
  if (sequelize) sequelize.close();
}
