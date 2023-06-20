import {CONF_DB} from "../config/db.config"
import { Sequelize, Model, DataTypes } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()


const env = process.env.NODE_ENV || 'development';
const config = CONF_DB[env]
export const prefix_db = process.env.DB_PREFIX || "bello"

const sequelize = config.url? new Sequelize(config.url, config) : new Sequelize(config.database, config.username, config.password, config)

export default sequelize